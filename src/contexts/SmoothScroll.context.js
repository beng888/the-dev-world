import React, { createContext, useEffect, useState } from "react";

export const SmoothScrollContext = createContext({
  scroll: null,
});

export const SmoothScrollProvider = ({ children, options }) => {
  const [scroll, setScroll] = useState(null);

  let ele;
  let downX, moveX, newX, scrollX;

  const scrollHandler = function () {
    scroll.scroll.instance.delta.x =
      scroll.scroll.instance.scroll.x <= 0
        ? 0
        : scroll.scroll.instance.scroll.x >= scroll.scroll.instance.limit.x
        ? scroll.scroll.instance.limit.x
        : scroll.scroll.instance.delta.x;

    // document.querySelector("#position").innerHTML =
    //   scroll.scroll.instance.delta.x;
  };

  const mouseDownHandler = function (e) {
    downX = e.clientX;
    scrollX = scroll.scroll.instance.scroll.x;

    console.log(scroll.scroll);

    ele.style.cursor = "grab";
    ele.style.userSelect = "none";

    scroll.scrollTo(scroll.scroll.instance.scroll.x);

    document.addEventListener("mousemove", mouseMoveHandler);
    document.addEventListener("mouseup", mouseUpHandler);
  };

  const mouseMoveHandler = function (e) {
    ele.style.cursor = "grabbing";

    moveX = downX - e.clientX;

    newX =
      scroll.scroll.instance.scroll.x + moveX <= 0
        ? 0
        : scrollX + moveX >= scroll.scroll.instance.limit.x
        ? scroll.scroll.instance.limit.x
        : scrollX + moveX;

    scroll.scroll.instance.delta.x = Number(newX).toFixed(2);
    scroll.scrollTo(newX);

    // const position = `${scroll.scroll.instance.delta.x} <br/>  ${moveX}<br/>  ${scroll.scroll.instance.scroll.x} <br/> ${e.clientX}`;
    // document.querySelector("#position").innerHTML = position;
  };

  const mouseUpHandler = function () {
    ele.style.removeProperty("user-select");
    ele.style.cursor = "grab";
    // scroll.scrollTo(newX);

    document.removeEventListener("mousemove", mouseMoveHandler);
    document.removeEventListener("mouseup", mouseUpHandler);
    // document.querySelector("#position").innerHTML = "mouse UP!!";
  };

  useEffect(() => {
    if (!scroll) {
      ele = document.querySelector("[data-scroll-container]");

      (async () => {
        try {
          const LocomotiveScroll = (await import("locomotive-scroll")).default;

          setScroll(
            new LocomotiveScroll({
              el: ele ?? undefined,
              ...options,
            })
          );
        } catch (error) {
          throw Error(`[SmoothScrollProvider]: ${error}`);
        }
      })();
    } else if (window.innerWidth >= 768) {
      ele = document.querySelector("[data-scroll-container]");

      ele.addEventListener("mousedown", mouseDownHandler);
      ele.addEventListener("scroll", scrollHandler);
    }

    return () => {
      scroll && scroll.destroy();
      ele.removeEventListener("mousedown", mouseDownHandler);
    };
  }, [scroll]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <SmoothScrollContext.Provider value={{ scroll }}>
      {children}
    </SmoothScrollContext.Provider>
  );
};

SmoothScrollContext.displayName = "SmoothScrollContext";
SmoothScrollProvider.displayName = "SmoothScrollProvider";
