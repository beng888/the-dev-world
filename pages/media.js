import { SmoothScrollProvider } from "../src/contexts/SmoothScroll.context";
import Media from "../src/pages/media";

export default function MediaPage() {
  return (
    <SmoothScrollProvider direction="vertical">
      <Media />
    </SmoothScrollProvider>
  );
}
