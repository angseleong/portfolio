import { CompactPage } from "@/components/CompactPage";

// shortcut: Full Mode has no page yet, so both modes render CompactPage until Block 2 adds FullPage.
export default function Home() {
  return <CompactPage />;
}
