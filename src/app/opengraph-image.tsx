import { ImageResponse } from "next/og";
import { cv } from "@/data/cv";

// Open Graph image: name + Headline on black (TODO Block 6).
export const alt = `${cv.name}. ${cv.headline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Satori needs TTF, so ask Google Fonts for the glyphs in this text only (no woff2 UA → TTF).
async function font(family: string, text: string) {
  "use cache";
  const css = await (await fetch(`https://fonts.googleapis.com/css2?family=${family}&text=${encodeURIComponent(text)}`)).text();
  const url = css.match(/src: url\((.+?)\) format\('(opentype|truetype)'\)/)?.[1];
  if (!url) throw new Error(`No TTF for ${family}`);
  return (await fetch(url)).arrayBuffer();
}

export default async function Image() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "center", padding: "0 96px", background: "#0b0b0b" }}>
        <div style={{ fontFamily: "Instrument Serif", fontSize: 150, color: "#e9e4da", letterSpacing: "-0.02em", lineHeight: 1 }}>{cv.name}</div>
        <div style={{ fontFamily: "Geist Mono", fontSize: 28, color: "#a8a39a", marginTop: 40, letterSpacing: "0.04em" }}>{cv.headline}</div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Instrument Serif", data: await font("Instrument+Serif", cv.name), weight: 400 },
        { name: "Geist Mono", data: await font("Geist+Mono", cv.headline), weight: 400 },
      ],
    },
  );
}
