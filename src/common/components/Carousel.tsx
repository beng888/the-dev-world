import { useEffect, useRef, useState } from "react";
import Arrow from "../icon/Arrow";

interface ArrowProps {
  LeftArrowClass: string;
  RightArrowClass: string;
  strokeWidth?: number;
  stroke?: string;
}

interface Props {
  data: any;
  slide: number;
  isDisabled?: boolean;
  setSlide: Function;
  setIsDragging?: Function;
  setDragDiff?: Function;
  arrow: ArrowProps;
  arrowShadow?: boolean;
  slideAmount?: number;
  containerClass: string;
  swatches?: boolean;
  swatchesClass?: string;
}

const Carousel: React.FC<Props> = ({
  children,
  data,
  slide,
  setSlide,
  setIsDragging,
  arrow,
  isDisabled,
  arrowShadow = false,
  containerClass,
  setDragDiff,
  swatches = false,
  swatchesClass,
  slideAmount = 1,
}) => {
  const slideContainerRef = useRef(null);
  const slideRef = useRef(0);
  const lengthRef = useRef(0);
  const [difference, setDifference] = useState(0);

  const _setSlide = (current, cycling = false) => {
    if (cycling) {
      slideContainerRef.current.style.transitionDuration = "0s";
    } else if (
      slide <= -slideAmount ||
      slide >= lengthRef.current - (slideAmount - 1)
    )
      return;

    slideRef.current = current;
    if (!cycling) {
      slideContainerRef.current.style.transitionDuration = "1s";
    }
    setSlide(current);
    console.log(cycling);
  };

  function transitionEnd() {
    if (slideRef.current <= -slideAmount) {
      _setSlide(lengthRef.current - slideAmount, true);
    } else if (slideRef.current === lengthRef.current) {
      _setSlide(0, true);
    }
  }

  function dragging(e) {
    setIsDragging(true);
    const downX = e.clientX;
    slideContainerRef.current.style.cursor = "grabbing";
    slideContainerRef.current.style.transitionDuration = "0s";
    let moveX;

    function mouseMove(e) {
      moveX = e.clientX;
      const diff = downX - moveX;
      setDifference(diff / 10);
      setDragDiff && setDragDiff(diff);
    }

    function mouseUp(e) {
      setIsDragging(false);
      const upX = e.clientX;
      setDifference(0);
      setDragDiff && setDragDiff(0);
      if (upX < downX) _setSlide(slide + slideAmount);
      if (upX > downX) _setSlide(slide - slideAmount);
      slideContainerRef.current.style.cursor = "grab";
      slideContainerRef.current.style.transitionDuration = "1s";
      slideContainerRef.current.removeEventListener("mousemove", mouseMove);
      slideContainerRef.current.removeEventListener("mouseup", mouseUp);
      slideContainerRef.current.removeEventListener("mouseleave", mouseUp);
    }

    slideContainerRef.current.addEventListener("mousemove", mouseMove);
    slideContainerRef.current.addEventListener("mouseup", mouseUp);
    slideContainerRef.current.addEventListener("mouseleave", mouseUp);
  }

  useEffect(() => {
    slideContainerRef.current.style.transitionDuration = "1s";
    slideContainerRef.current.style.cursor = "grab";

    if (data) {
      lengthRef.current = data.length;
      slideContainerRef.current.addEventListener(
        "transitionend",
        transitionEnd
      );
    }
    return () => {
      window.removeEventListener("transitionend", transitionEnd);
    };
  }, [data]);

  return (
    <>
      <Arrow
        strokeWidth={arrow.strokeWidth}
        stroke={arrow.stroke}
        shadow={arrowShadow}
        onClick={() => {
          isDisabled ? _setSlide(slide) : _setSlide(slide - slideAmount);
        }}
        className={`transform rotate-180 ${arrow.LeftArrowClass}`}
      />
      {/* <div className="w-20 h-20 text-5xl bg-blue-800 ">{slideAmount}</div> */}
      <div className={`flex items-center overflow-x-hidden ${containerClass}`}>
        <div
          ref={slideContainerRef}
          onMouseDown={(e) => dragging(e)}
          className="flex items-end w-full h-full mt-auto ease-in-out"
          style={{
            transform: `translateX(-${
              slide * (100 / slideAmount) + 100 + difference
            }%)`,
          }}
        >
          {children}
        </div>
      </div>
      <Arrow
        strokeWidth={arrow.strokeWidth}
        stroke={arrow.stroke}
        shadow={arrowShadow}
        onClick={() => {
          isDisabled ? _setSlide(slide) : _setSlide(slide + slideAmount);
        }}
        className={`${arrow.RightArrowClass}`}
      />
      {data && swatches && (
        <div
          className={`flex justify-center gap-x-1vw md:hidden ${swatchesClass}`}
        >
          {data?.map((data, i) => (
            <div
              key={i}
              className={`duration-300 bg-black ring-white rounded-full ${
                slide === i ? "opacity-100 ring-2" : "opacity-50 ring-1"
              } cursor-pointer w-2vw h-2vw hover:opacity-100`}
              onClick={() => setSlide(i)}
            >
              <span className="opacity-0">{i}</span>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default Carousel;
