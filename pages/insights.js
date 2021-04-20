import { SmoothScrollProvider } from "../src/contexts/SmoothScroll.context";
import Insights from "../src/pages/insights";

export default function InsightsPage() {
  return (
    <SmoothScrollProvider direction="vertical">
      <Insights />
    </SmoothScrollProvider>
  );
}
