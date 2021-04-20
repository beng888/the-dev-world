import Nav from "./components/Nav";
import { useRouter } from "next/router";
import { Overlay } from "./components/PageTransition";
import { useStyleContext } from "@contexts/StyleContext";
import { useEffect, useRef } from "react";

const TransitionOutWrapper = ({ children }) => {
  const { style, setStyle } = useStyleContext();
  const router = useRouter();

  const containerRef = useRef(null);
  const coverRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current.style;
    const cover = coverRef.current.style;

    if (router.pathname === "/") {
      setTimeout(() => {
        setStyle({ ...style, isPageTransitioning: false });
      }, 1);
    }

    if (!style.isPageTransitioning) {
      container.opacity = "0";
      container.transitionDuration = "0s";
      container.transform = "translateY(100vh)";
      cover.transitionDuration = "1.2s";
      cover.opacity = "0";

      setTimeout(() => {
        container.opacity = "1";
        container.transitionDuration = "1s";
        container.transform = "translate(0)";
      }, 1);
    } else {
      container.transitionDuration = "0s";
      container.transform = "translate(0)";
      cover.transitionDuration = "0s";
      cover.opacity = "0";

      setTimeout(() => {
        setStyle({ ...style, isPageTransitioning: false });
      }, 1);
    }
  }, [router.pathname]);

  useEffect(() => {
    const container = containerRef.current.style;
    const cover = coverRef.current.style;

    if (style.isPageTransitioning) {
      cover.transitionDuration = "1.2s";
      container.transitionDuration = "1.5s";

      if (style.newRoute === "/") {
        container.transform = "translateX(-5%)";
      } else {
        container.transform = "translateY(-5%)";
      }

      coverRef.current.style.opacity = "0.9";
      cover.pointerEvents = "auto";
    } else {
      container.transitionDuration = "0s";
      container.transform = "translate(0)";
      cover.pointerEvents = "none";
    }
  }, [style.isPageTransitioning]);

  return (
    <div ref={containerRef}>
      <div
        ref={coverRef}
        className={`fixed inset-0 bg-black z-30 pointer-events-none`}
      />
      {children}
    </div>
  );
};

const Layout: React.FC = ({ children }) => {
  return (
    <div>
      <Nav />
      <TransitionOutWrapper>{children}</TransitionOutWrapper>
      <Overlay />
    </div>
  );
};

export default Layout;
