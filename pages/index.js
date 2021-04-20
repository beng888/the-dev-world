import Head from "next/head";
import { SmoothScrollProvider } from "@contexts/SmoothScroll.context";
import Home from "@pages/home";

export default function IndexPage() {
  return (
    <SmoothScrollProvider direction="horizontal">
      <Home />
    </SmoothScrollProvider>
  );
}
