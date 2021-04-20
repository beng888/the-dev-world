import { useRouter } from "next/router";
import { useStyleContext } from "@contexts/StyleContext";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";

export const RouterLink: React.FC<{ to: string }> = ({ children, to }) => {
  const { style, setStyle } = useStyleContext();
  const router = useRouter();

  const handleRouting = () => {
    setStyle({ ...style, isPageTransitioning: true, newRoute: to });
    router.asPath = to;
  };

  return (
    // <Link href={`/?${to}=${to}`} as={`/${to}`}>
    <a onClick={handleRouting}>{children}</a>
    // </Link>
  );
};

export const Overlay: React.FC = () => {
  const { style, setStyle } = useStyleContext();
  const OverlayRef = useRef(null);
  const router = useRouter();
  const newRoute = style.newRoute;
  const [DynamicComponent, setDynamicComponent] = useState(null);

  const dynamicComponents = {
    default: dynamic(() => import("@pages/home")),
    insights: dynamic(() => import("@pages/insights")),
    about: dynamic(() => import("@pages/About")),
    media: dynamic(() => import("@pages/media")),
  };

  const changeRoute = () => {
    if (router.pathname !== router.asPath) {
      router.push(router.asPath);
    }
  };

  useEffect(() => {
    console.log(router);
    OverlayRef.current.style.opacity = "0";

    if (router.pathname === router.asPath) {
      OverlayRef.current.style.transitionDuration = "0s";
      // OverlayRef.current.style.transform = `${
      //   router.pathname === router.asPath
      //     ? "translateY(100vh)"
      //     : "translateX(100vw)"
      // }`;

      setStyle({ ...style, newRoute: null });
      setDynamicComponent(null);
    }

    if (newRoute) {
      OverlayRef.current.style.opacity = "100";
      setDynamicComponent(
        dynamicComponents[newRoute.substring(1)] || dynamicComponents.default
      );

      if (newRoute === "/") {
        OverlayRef.current.style.transform = "translateX(100vw)";
      } else {
        OverlayRef.current.style.transform = "translateY(100vh)";
      }

      setTimeout(() => {
        OverlayRef.current.style.transitionDuration = "1s";
        OverlayRef.current.style.transform = "translate(0)";
        setStyle({ ...style, newRoute: null });
      }, 1);
    }

    OverlayRef.current.addEventListener("transitionend", changeRoute);

    return () => {
      OverlayRef.current.removeEventListener("transitionend", changeRoute);
    };
  }, [router.pathname, router.asPath]);

  return (
    <div
      ref={OverlayRef}
      className={`fixed inset-0 z-40 ease-in-out transform pointer-events-none opacity-0`}
    >
      {/* <p className="text-yellow-300 text-8vw">DYNAMIC OVERLAY</p> */}
      {DynamicComponent ? <DynamicComponent /> : null}
    </div>
  );
};
