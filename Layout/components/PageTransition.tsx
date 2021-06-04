import { useRouter } from "next/router";
import { useGlobalContext } from "@contexts/GlobalContext";
import React, { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";

export const RouterLink: React.FC<{ to: string }> = ({ children, to }) => {
  const { route } = useGlobalContext();
  const [routeValue, setrouteValue] = route;
  const router = useRouter();

  const handleRouting = () => {
    setrouteValue({
      ...routeValue,
      isPageTransitioning: true,
      newRoute: to,
      changingRoute: false,
    });

    router.asPath = to;
  };

  return <a onClick={handleRouting}>{children}</a>;
};

export const Overlay: React.FC<{ s: any }> = React.memo(({ s }) => {
  const { route } = useGlobalContext();
  const [routeValue, setrouteValue] = route;
  const OverlayRef = useRef(null);
  const router = useRouter();
  const newRoute = routeValue.newRoute;
  const [DynamicComponent, setDynamicComponent] = useState(null);

  const dynamicComponents = {
    default: dynamic(() => import("@pages/home")),
    insights: dynamic(() => import("@pages/insights")),
    about: dynamic(() => import("@pages/About")),
    media: dynamic(() => import("@pages/media")),
  };

  const changeRoute = () => {
    setrouteValue({ ...routeValue, changingRoute: true });
  };

  useEffect(() => {
    OverlayRef.current.style.opacity = "0";

    if (router.pathname === router.asPath) {
      OverlayRef.current.style.transitionDuration = "0s";

      setDynamicComponent(null);
    }

    if (newRoute && !routeValue.changingRoute) {
      OverlayRef.current.style.opacity = "1";

      if (newRoute === "/") {
        OverlayRef.current.style.transform = "translateX(100vw)";
      } else {
        OverlayRef.current.style.transform = "translateY(100vh)";
      }

      setDynamicComponent(
        dynamicComponents[newRoute.substring(1)] || dynamicComponents.default
      );

      setTimeout(() => {
        OverlayRef.current.style.transitionDuration = "1s";
        OverlayRef.current.style.transform = "translate(0)";
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
      {DynamicComponent ? <DynamicComponent /> : null}
    </div>
  );
});
