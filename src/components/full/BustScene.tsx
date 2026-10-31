"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, Lightformer, useGLTF } from "@react-three/drei";
import { Suspense, useMemo, useRef, type RefObject } from "react";
import type { Group, Mesh } from "three";

// Phones get the 15k-triangle Bust (ARCHITECTURE.md §5). FullPage is client-only, so matchMedia is safe here.
const url = window.matchMedia("(max-width: 767px)").matches ? "/models/bust-lite.glb" : "/models/bust.glb";
const draco = "/draco/";

function Bust() {
  const { scene } = useGLTF(url, draco);
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
function Rig({ progress }: { progress: RefObject<number> }) {
  const bust = useRef<Group>(null);
  useFrame(({ camera, size }) => {
    const p = progress.current ?? 0;
    if (bust.current) bust.current.rotation.y = p * Math.PI;
    // Tall phone screens: back the camera off so the shoulders stay inside the width.
    const fit = Math.max(1, 0.8 / (size.width / size.height));
    camera.position.z = (6 - p * 2.5) * fit;
  });
  return (
    <group ref={bust}>
      <Bust />
    </group>
  );
}

export default function BustScene({ progress }: { progress: RefObject<number> }) {
  return (
    <Canvas camera={{ position: [0, 0, 6], fov: 35 }} dpr={[1, 2]} aria-hidden>
      <Suspense fallback={null}>
        {/* Metal only shows what it reflects, so the lights are soft panels in a generated environment (no HDR download). */}
        <Environment resolution={256} frames={1}>
          <Lightformer form="rect" intensity={5} color="#FFF1DC" position={[-4, 4, 3]} scale={[6, 5, 1]} onUpdate={(l) => l.lookAt(0, 0, 0)} />
          <Lightformer form="rect" intensity={1.2} color="#E9E4DA" position={[4, 0, 4]} scale={[4, 6, 1]} onUpdate={(l) => l.lookAt(0, 0, 0)} />
          {/* Behind the camera and overhead: without them the face mirrors the black room and turns blotchy. */}
          <Lightformer form="rect" intensity={1.5} color="#E9E4DA" position={[0, 0.5, 7]} scale={[10, 5, 1]} onUpdate={(l) => l.lookAt(0, 0, 0)} />
          <Lightformer form="rect" intensity={2} color="#FFF6EA" position={[0, 6, 0]} scale={[8, 8, 1]} onUpdate={(l) => l.lookAt(0, 0, 0)} />
          <Lightformer form="rect" intensity={4} color="#DCE6FF" position={[3, 2, -5]} scale={[3, 8, 1]} onUpdate={(l) => l.lookAt(0, 0, 0)} />
          <Lightformer form="rect" intensity={4} color="#DCE6FF" position={[-3, 2, -5]} scale={[3, 8, 1]} onUpdate={(l) => l.lookAt(0, 0, 0)} />
        </Environment>
        <Rig progress={progress} />
      </Suspense>
    </Canvas>
  );
}
