import { cv } from "@/data/cv";

// Block 0 checkpoint only. Block 1 replaces this with CompactPage.
export default function Home() {
  return (
    <main className="flex flex-1 flex-col justify-center px-4 sm:px-12">
      <h1 className="font-display text-[clamp(64px,14vw,200px)] leading-none tracking-[-0.02em]">
        {cv.name}
      </h1>
      <p className="mt-6 text-stone">{cv.headline}</p>
    </main>
  );
}
