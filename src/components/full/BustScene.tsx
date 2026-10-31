"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Environment, Lightformer, useGLTF } from "@react-three/drei";
import { Suspense, useCallback, useEffect, useMemo, useRef, useState, type RefObject } from "react";
import type { Group, Mesh } from "three";

// Phones get the 15k-triangle Bust (ARCHITECTURE.md §5). FullPage is client-only, so matchMedia is safe here.
const phone = window.matchMedia("(max-width: 767px)").matches;
const url = phone ? "/models/bust-lite.glb" : "/models/bust.glb";
const draco = "/draco/";
// Start the download and Draco decode as soon as this chunk loads, not after the Canvas has measured itself.
useGLTF.preload(url, draco);

function Bust({ onReady }: { onReady: () => void }) {
  const { scene } = useGLTF(url, draco);
  useEffect(onReady, [onReady]);
  const geometry = useMemo(() => {
    let found: Mesh["geometry"] | undefined;
    scene.traverse((o) => {
      if (!found && (o as Mesh).isMesh) found = (o as Mesh).geometry;
    });
    return found;
  }, [scene]);
  return (
    <mesh geometry={geometry}>
      {/* Mosaic: flat facets, each one a small mirror. */}
      <meshStandardMaterial color="#E9E4DA" metalness={1} roughness={0.18} flatShading />
    </mesh>
  );
}

// ARCHITECTURE.md §4.1: progress is written by the Hero's ScrollTrigger, read here every frame (no React state).
function Rig({ progress, onReady }: { progress: RefObject<number>; onReady: () => void }) {
  const bust = useRef<Group>(null);
  const spin = useRef(0);
  useFrame(({ camera, size }, delta) => {
    const p = progress.current ?? 0;
    // A slow idle turn on top of the scroll turn, so the Bust never stops (owner's call, 31 Oct).
    spin.current += delta * 0.25;
    if (bust.current) bust.current.rotation.y = p * Math.PI + spin.current;
    // Close crop: the head near the top edge, the chest cut by the bottom. Tall phone screens back off a little.
    const fit = Math.max(1, 0.7 / (size.width / size.height));
    camera.position.z = (2.95 - p * 0.75) * fit;
  });
  return (
    <group ref={bust} position={[0, -0.22, 0]}>
      <Bust onReady={onReady} />
    </group>
  );
}

// The closing (owner, 31 Oct): the whole Bust, plinth and all, beside the closing text, turning on its plinth to
// watch the pointer. Phones have no pointer to follow, so it sways slowly instead.
const FACE = -0.61; // the scan's head is turned on the template neck; this turn faces it to the camera

function PeekRig({ onReady }: { onReady: () => void }) {
  const bust = useRef<Group>(null);
  const look = useRef({ x: 0, y: 0 });
  const canvas = useThree((s) => s.gl.domElement);
  useEffect(() => {
    // Measured from the Bust itself, not the middle of the screen, so it looks at where the pointer really is.
    // Full turn at about a third of the screen away (owner wanted it more sensitive, 31 Oct).
    const clamp = (v: number) => Math.max(-1, Math.min(1, v));
    const onMove = (e: PointerEvent) => {
      const r = canvas.getBoundingClientRect();
      look.current = {
        x: clamp((e.clientX - (r.left + r.width / 2)) / (innerWidth * 0.35)),
        y: clamp((e.clientY - (r.top + r.height * 0.3)) / (innerHeight * 0.4)),
      };
    };
    window.addEventListener("pointermove", onMove);
    return () => window.removeEventListener("pointermove", onMove);
  }, [canvas]);
  useFrame(({ clock }, delta) => {
    const g = bust.current;
    if (!g) return;
    const ease = Math.min(1, delta * 5);
    const yaw = FACE + (phone ? Math.sin(clock.elapsedTime * 0.4) * 0.25 : look.current.x * 0.9);
    const pitch = phone ? 0 : look.current.y * 0.16;
    g.rotation.y += (yaw - g.rotation.y) * ease;
    g.rotation.x += (pitch - g.rotation.x) * ease;
    g.position.y += (0 - g.position.y) * Math.min(1, delta * 1.2); // rises into place once
  });
  return (
    <group ref={bust} position={[0, -0.3, 0]} rotation={[0, FACE, 0]}>
      <Bust onReady={onReady} />
    </group>
  );
}

export default function BustScene({ progress, peek }: { progress?: RefObject<number>; peek?: boolean }) {
  // Fade the Bust in once it has loaded, so it never pops in.
  const [ready, setReady] = useState(false);
  const onReady = useCallback(() => setReady(true), []);
  // Off screen, stop drawing: the Hero's canvas would otherwise keep a phone's GPU busy for the whole page.
  const canvas = useRef<HTMLCanvasElement>(null);
  const [seen, setSeen] = useState(true);
  useEffect(() => {
    const io = new IntersectionObserver(([e]) => setSeen(e.isIntersecting));
    if (canvas.current) io.observe(canvas.current);
    return () => io.disconnect();
  }, []);
  return (
    <Canvas
      ref={canvas}
      frameloop={seen ? "always" : "never"}
      // Peek: looking level at the whole Bust, plinth included (a rotation stops R3F aiming the camera at the origin),
      // with room to spare so the tilt toward the pointer never pushes the plinth past the bottom edge.
      camera={peek ? { position: [0, -0.02, 3.9], rotation: [0, 0, 0], fov: 35 } : { position: [0, 0, 6], fov: 35 }}
      // Phones draw at most 1.5 pixels per CSS pixel and a smaller reflection map: far less GPU work, same look.
      dpr={phone ? [1, 1.5] : [1, 2]}
      aria-hidden
      style={{ opacity: ready ? 1 : 0, transition: "opacity 1.2s cubic-bezier(0.22, 1, 0.36, 1)" }}
    >
      <Suspense fallback={null}>
        {/* Metal only shows what it reflects, so the lights are soft panels in a generated environment (no HDR download). */}
        <Environment resolution={phone ? 128 : 256} frames={1}>
          <Lightformer form="rect" intensity={5} color="#FFF1DC" position={[-4, 4, 3]} scale={[6, 5, 1]} onUpdate={(l) => l.lookAt(0, 0, 0)} />
          <Lightformer form="rect" intensity={1.2} color="#E9E4DA" position={[4, 0, 4]} scale={[4, 6, 1]} onUpdate={(l) => l.lookAt(0, 0, 0)} />
          {/* Behind the camera and overhead: without them the face mirrors the black room and turns blotchy. */}
          <Lightformer form="rect" intensity={1.5} color="#E9E4DA" position={[0, 0.5, 7]} scale={[10, 5, 1]} onUpdate={(l) => l.lookAt(0, 0, 0)} />
          <Lightformer form="rect" intensity={2} color="#FFF6EA" position={[0, 6, 0]} scale={[8, 8, 1]} onUpdate={(l) => l.lookAt(0, 0, 0)} />
          <Lightformer form="rect" intensity={4} color="#DCE6FF" position={[3, 2, -5]} scale={[3, 8, 1]} onUpdate={(l) => l.lookAt(0, 0, 0)} />
          <Lightformer form="rect" intensity={4} color="#DCE6FF" position={[-3, 2, -5]} scale={[3, 8, 1]} onUpdate={(l) => l.lookAt(0, 0, 0)} />
        </Environment>
        {peek ? <PeekRig onReady={onReady} /> : <Rig progress={progress!} onReady={onReady} />}
      </Suspense>
    </Canvas>
  );
}
