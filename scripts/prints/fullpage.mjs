// Full-page screenshot of a running site with headless Chrome over CDP (no dependencies).
// Usage: node scripts/prints/fullpage.mjs <url> <out.png> [width=1440] [waitMs=2500]
import { spawn } from "node:child_process";
import { mkdtempSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

const [url, out, width = "1440", wait = "2500"] = process.argv.slice(2);
if (!url || !out) {
  console.error("usage: fullpage.mjs <url> <out.png> [width] [waitMs]");
  process.exit(1);
}

const CHROME = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const port = 9300 + Math.floor(Math.random() * 500);
const chrome = spawn(CHROME, [
  "--headless=new",
  `--remote-debugging-port=${port}`,
  `--user-data-dir=${mkdtempSync(join(tmpdir(), "fullpage-"))}`,
  "--hide-scrollbars",
  "about:blank",
]);
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

try {
  let target;
  for (let i = 0; i < 50 && !target; i++) {
    await sleep(200);
    target = await fetch(`http://127.0.0.1:${port}/json/list`)
      .then((r) => r.json())
      .then((ts) => ts.find((t) => t.type === "page"))
      .catch(() => undefined);
  }
  if (!target) throw new Error("Chrome did not start");

  const ws = new WebSocket(target.webSocketDebuggerUrl);
  await new Promise((r) => ws.addEventListener("open", r, { once: true }));
  let id = 0;
  const pending = new Map();
  ws.addEventListener("message", (e) => {
    const msg = JSON.parse(e.data);
    if (msg.id && pending.has(msg.id)) {
      pending.get(msg.id)(msg);
      pending.delete(msg.id);
    }
  });
  const send = (method, params = {}) =>
    new Promise((resolve, reject) => {
      const n = ++id;
      pending.set(n, (m) => (m.error ? reject(new Error(m.error.message)) : resolve(m.result)));
      ws.send(JSON.stringify({ id: n, method, params }));
    });

  const w = Number(width);
  await send("Emulation.setDeviceMetricsOverride", { width: w, height: 900, deviceScaleFactor: 1, mobile: false });
  await send("Page.enable");
  await send("Page.navigate", { url });
  await sleep(Number(wait));
  // Hide the Next.js dev badge, then scroll through once so lazy content and reveal animations run.
  await send("Runtime.evaluate", {
    awaitPromise: true,
    expression: `(async () => {
      const s = document.createElement("style");
      s.textContent = "nextjs-portal{display:none!important}";
      document.head.append(s);
      for (let y = 0; y < document.documentElement.scrollHeight; y += 600) { scrollTo(0, y); await new Promise(r => setTimeout(r, 250)); }
      scrollTo(0, 0); await new Promise(r => setTimeout(r, 800));
    })()`,
  });
  const { result } = await send("Runtime.evaluate", {
    expression: "Math.max(document.documentElement.scrollHeight, document.body.scrollHeight)",
  });
  const height = result.value;
  await send("Emulation.setDeviceMetricsOverride", { width: w, height, deviceScaleFactor: 1, mobile: false });
  await sleep(800);
  const shot = await send("Page.captureScreenshot", { format: "png", captureBeyondViewport: true });
  writeFileSync(out, Buffer.from(shot.data, "base64"));
  console.log(out, `${w}x${height}`);
  ws.close();
} finally {
  chrome.kill();
}
