import React, { createContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useGlobalContext } from "@contexts/GlobalContext";

export const SmoothScrollContext = createContext({
  scroll: null,
});

export const SmoothScrollProvider = ({ children, direction }) => {
  const [scroll, setScroll] = useState(null);
  const [horizontal, setHorizontal] = useState(null);
  const { style, route, nav, loco, globalKey } = useGlobalContext();

  const [styleValue, setstyleValue] = style;
  const [routeValue, setrouteValue] = route;
  const [navValue, setnavValue] = nav;
  const [locoValue, setlocoValue] = loco;
  const [globalKeyValue, setGlobalKeyValue] = globalKey;

  const router = useRouter();

  let prevScroll = 0,
    ele;

  const responsive = () => {
    if (window.innerWidth < 768) {
      setstyleValue({
        ...styleValue,
        mobile: true,
      });
    } else {
      setstyleValue({
        ...styleValue,
        mobile: false,
      });
    }
  };

  const scrollHandler = function () {
    if (!horizontal) {
      const currentScroll = scroll?.scroll.instance.scroll.y;
      if (scroll?.scroll.instance.delta.y >= scroll?.scroll.instance.limit.y) {
        let deltaY = scroll?.scroll.instance.delta.y;
        deltaY = scroll?.scroll.instance.limit.y;
      }
      setstyleValue({ ...styleValue, showNav: prevScroll > currentScroll });

      setnavValue({
        ...navValue,
        navScrollDistance: scroll?.scroll.instance.limit.y,
        navScrollTraveled: scroll?.scroll.instance.delta.y,
      });
      console.log(horizontal);
      prevScroll = currentScroll;
    } else {
      setnavValue({
        ...navValue,
        navScrollDistance: scroll?.scroll.instance.limit.x,

        navScrollTraveled: scroll?.scroll.instance.delta.x,
      });
    }
  };

  useEffect(() => {
    if (routeValue.changingRoute === true) {
      scroll && scroll.scrollTo(0, { duration: 0, disableLerp: true });
      setTimeout(() => {
        router.push(router.asPath);
      }, 50);
    }
  }, [routeValue.changingRoute]);

  useEffect(() => {
    responsive();
    scrollHandler();
    // if (router.pathname !== "/")
    //   setlocoValue({ ...locoValue, resetLocomotive: true });
  }, [router.pathname]);

  const setLocoScroll = async () => {
    ele = document.querySelector("[data-scroll-container]");
    const LocomotiveScroll = (await import("locomotive-scroll")).default;

    if (window.innerWidth >= 768 && direction === "horizontal") {
      setHorizontal(true);
    } else setHorizontal(false);

    setScroll(
      new LocomotiveScroll({
        el: ele ?? undefined,
        smooth: true,
        direction: direction,
        initPosition: { x: 0, y: 0 },
        tablet: {
          smooth: true,
          direction: direction,
          breakpoint: 770,
        },
        smartphone: { smooth: true },
      })
    );
  };

  useEffect(() => {
    responsive();
    if (!scroll) {
      // (async () => {
      try {
        setLocoScroll();
      } catch (error) {
        throw Error(`[SmoothScrollProvider]: ${error}`);
      }
      // })();
    }

    if (locoValue.resetLocomotive) {
      scroll && scroll.destroy();
      setlocoValue({ ...locoValue, resetLocomotive: false });
      setLocoScroll();
    }

    window.addEventListener("resize", resizeHandler);
    ele = document.querySelector("[data-scroll-container]");
    ele.addEventListener("wheel", scrollHandler);
    ele.addEventListener("mousedown", mouseDownHandler);
    // setlocoValue({ ...locoValue, resetLocomotive: false });

    return () => {
      scroll && scroll.destroy();
      ele.removeEventListener("wheel", scrollHandler);
      ele.removeEventListener("mousedown", mouseDownHandler);
      window.removeEventListener("resize", resizeHandler);
    };
  }, [scroll, locoValue.resetLocomotive]);

  // useEffect(() => {
  //   // scroll && scroll.start();
  //   // scroll && console.log(scroll.scroll.instance);
  //   if (locoValue.resetLocomotive) {
  //     scroll && scroll.destroy();
  //     setlocoValue({ ...locoValue, resetLocomotive: false });
  //     setLocoScroll();
  //   }
  // }, [locoValue.resetLocomotive]);

  const resizeHandler = () => {
    const width = window.innerWidth;
    setTimeout(() => {
      if (horizontal && width >= 768) return;
      if (!horizontal && width < 768) return;
      if (horizontal && width < 768) {
        scroll && scroll.destroy();
        // setHorizontal(false);
        // responsive();
        // return setLocoScroll();
      }
      if (!horizontal && width >= 768) {
        scroll && scroll.destroy();
        setHorizontal(true);
        responsive();
        return setLocoScroll();
      }
    }, 250);
  };

  const mouseDownHandler = function (e) {
    const limit = scroll.scroll.instance.limit,
      scroller = scroll.scroll.instance.scroll,
      position = horizontal ? e.clientX : e.clientY,
      delta = scroll.scroll.instance.delta,
      scrollXY = horizontal ? scroller.x : scroller.y,
      limitXY = horizontal ? limit.x : limit.y,
      selected = e.target;

    selected.style.userSelect = "none";

    document.addEventListener("mousemove", mouseMoveHandler);
    document.addEventListener("mouseup", mouseUpHandler);

    function mouseMoveHandler(e) {
      scrollHandler();
      const difference = horizontal ? e.clientX : e.clientY;
      const move = position - difference;

      const newPosition =
        scrollXY + move <= 0
          ? 0
          : scrollXY + move >= limitXY
          ? limitXY
          : scrollXY + move;

      horizontal
        ? (delta.x = Number(newPosition).toFixed(2))
        : (delta.y = Number(newPosition).toFixed(2));
      scroll.scrollTo(newPosition);
    }

    function mouseUpHandler() {
      selected.style.removeProperty("user-select");
      document.removeEventListener("mousemove", mouseMoveHandler);
      document.removeEventListener("mouseup", mouseUpHandler);
    }
  };

  return (
    <SmoothScrollContext.Provider value={{ scroll }}>
      {children}
    </SmoothScrollContext.Provider>
  );
};

SmoothScrollContext.displayName = "SmoothScrollContext";
SmoothScrollProvider.displayName = "SmoothScrollProvider";
