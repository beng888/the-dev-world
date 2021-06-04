import Nav from "./components/Nav";
import { useRouter } from "next/router";
import { Overlay } from "./components/PageTransition";
import { useGlobalContext } from "@contexts/GlobalContext";
import { useEffect, useRef, useState } from "react";

const TransitionOutWrapper = ({ children }) => {
  const { route } = useGlobalContext();
  const [routeValue, setrouteValue] = route;
  const router = useRouter();

  const containerRef = useRef(null);
  const coverRef = useRef(null);

  const [overlayTransition, setOverlayTransition] = useState(false);

  useEffect(() => {
    const container = containerRef.current.style;
    const cover = coverRef.current.style;
    cover.pointerEvents = "none";

    // if (router.pathname === "/") {
    //   setTimeout(() => {
    //     setrouteValue({ ...route, isPageTransitioning: false });
    //   }, 1);
    // }

    if (routeValue.newRoute) {
      container.transitionDuration = "0s";
      container.transform = "translate(0)";
      cover.transitionDuration = "0s";
      cover.opacity = "0";

      setTimeout(() => {
        setrouteValue({
          ...routeValue,
          isPageTransitioning: false,
          newRoute: null,
        });
        setOverlayTransition(false);
      }, 1);
    } else {
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
    }
  }, [router.pathname]);

  useEffect(() => {
    if (routeValue.newRoute) setOverlayTransition(true);
    console.log(overlayTransition);

    const container = containerRef.current.style;
    const cover = coverRef.current.style;

    if (routeValue.isPageTransitioning) {
      cover.transitionDuration = "1.2s";
      container.transitionDuration = "1.5s";

      if (routeValue.newRoute === "/") {
        container.transform = "translateX(-5%)";
      } else {
        container.transform = "translateY(-5%)";
      }

      coverRef.current.style.opacity = "0.9";
      cover.pointerEvents = "auto";
    } else {
      container.transitionDuration = "0s";
      container.transform = "translate(0)";
    }
  }, [routeValue.isPageTransitioning]);

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

const Layout = ({ children }) => {
  const { route } = useGlobalContext();
  const [routeValue, setrouteValue] = route;

  return (
    <div>
      <Nav />

      <Overlay s={routeValue.isPageTransitioning} />
      <TransitionOutWrapper>{children}</TransitionOutWrapper>
    </div>
  );
};

export default Layout;
