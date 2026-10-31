import { Nav } from "@/components/Nav";
import { Page } from "@/components/Page";

// The Nav lives here, not in the layout, so the CV Page stays plain.
export default function Home() {
  return (
    <>
      <Nav />
      <Page />
    </>
  );
}
