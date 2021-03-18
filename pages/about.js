import { SmoothScrollProvider } from "../src/contexts/SmoothScroll.context";
import About from "../src/pages/About";

export default function AboutPage() {
  return (
    <SmoothScrollProvider options={{ smooth: true }}>
      <About />
    </SmoothScrollProvider>
  );
}
