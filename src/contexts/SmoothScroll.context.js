import React, { createContext, useEffect, useState } from "react";

export const SmoothScrollContext = createContext({
  scroll: null,
});

export const SmoothScrollProvider = ({ children, direction }) => {
  const [scroll, setScroll] = useState(null);
  const [horizontal, setHorizontal] = useState(null);

  useEffect(() => {
    let ele;
    console.log(horizontal);

    if (!scroll) {
      ele = document.querySelector("[data-scroll-container]");

      (async () => {
        try {
          const LocomotiveScroll = (await import("locomotive-scroll")).default;
          const setLocoScroll = () => {
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
          setLocoScroll();

          window.addEventListener("resize", (e) => {
            const width = window.innerWidth;
            setTimeout(() => {
              if (horizontal && width >= 768) return;
              if (!horizontal && width < 768) return;
              if (horizontal && width < 768) {
                scroll && scroll.destroy();
                setHorizontal(false);
                return setLocoScroll();
              }
              if (!horizontal && width >= 768) {
                scroll && scroll.destroy();
                setHorizontal(true);
                return setLocoScroll();
              }
            }, 250);
          });
        } catch (error) {
          throw Error(`[SmoothScrollProvider]: ${error}`);
        }
      })();
    }

    ele = document.querySelector("[data-scroll-container]");
    ele.addEventListener("scroll", scrollHandler);
    ele.addEventListener("mousedown", mouseDownHandler);
    scroll && scroll.scrollTo(0, { duration: 0 });

    return () => {
      window.scrollTo(0, 0);
      scroll && scroll.scrollTo(0, { duration: 0 });
      scroll && scroll.destroy();
      ele.addEventListener("scroll", scrollHandler);
      ele.removeEventListener("mousedown", mouseDownHandler);
    };
  }, [scroll]);

  const scrollHandler = function () {
    const delta = scroll.scroll.instance.delta;
    horizontal ? (delta.x = delta.x) : (delta.y = delta.y);
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
