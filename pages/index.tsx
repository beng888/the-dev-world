import Head from "next/head";
import { SmoothScrollProvider } from "../src/contexts/SmoothScroll.context";
import Home from "../src/pages/Home";

export default function IndexPage() {
  return (
    <SmoothScrollProvider
      options={{
        smooth: true,
        direction: "horizontal",
      }}
    >
      <Home />
    </SmoothScrollProvider>
  );
}
