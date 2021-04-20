import { useEffect, useRef, useState } from "react";
import Button from "src/common/components/Button";
import Carousel from "src/common/components/Carousel";
import useOnScreen from "src/common/hooks/useOnScreen";
import { useStyleContext } from "@contexts/StyleContext";

export const VideoSlide = ({ video, index, props }) => {
  const { slide, dragDiff, isDragging, videos } = props;
  const [containerWidth, setContainerWidth] = useState(0);
  const moveRatio = 4;
  const bgMove = containerWidth / moveRatio;
  const dragMove = dragDiff / moveRatio;
  const bgContainerRef = useRef(null);

  useEffect(() => {
    setContainerWidth(bgContainerRef.current.offsetWidth);
  }, []);

  return (
    <div className="relative h-full min-w-full">
      <div className="w-full h-full overflow-hidden" ref={bgContainerRef}>
        <img
          src={video.cloudinary_video_url}
          alt={video.title}
          className="object-cover w-full h-full md:object-fill"
          style={{
            transform: `translateX(${
              // index > slide && slide !== -1
              //   ? -bgMove + dragMove
              //   : index < slide && slide !== videos.length
              //   ? bgMove + dragMove
              //   : 0 + dragMove
              index === slide + 1
                ? -bgMove + dragMove
                : index === slide - 1
                ? bgMove + dragMove
                : index === slide
                ? 0 + dragMove
                : 0
            }px)`,
            transitionDuration: `${isDragging ? "0s" : "1s"}`,
          }}
        />
        {/* <div className="absolute inset-0 grid text-5xl text-red-400 place-content-center">
          slide: {slide} <br />
          index: {index}
        </div> */}
      </div>
    </div>
  );
};

interface video {
  cloudinary_video_url: string;
  title: string;
  user: { name: string };
  video_duration_in_minutes: string;
}

interface Props {
  videos: video[];
}

const Videos: React.FC<Props> = ({ videos }) => {
  const [slide, setSlide] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [dragDiff, setDragDiff] = useState(0);
  const [isDisabled, setIsDisabled] = useState(false);

  const ref = useRef(null);
  const onScreen = useOnScreen(ref);
  const { style, setStyle } = useStyleContext();

  useEffect(() => {
    if (onScreen) setStyle({ ...style, color: "bg-green-400" });
  }, [onScreen]);

  const props = { slide, dragDiff, isDragging, videos };

  useEffect(() => {
    setIsDisabled(true);
    setTimeout(() => {
      setIsDisabled(false);
    }, 1000);
  }, [slide]);

  return (
    <div
      ref={ref}
      className="relative flex flex-col items-center overflow-hidden md:flex-row md:w-210vh flex-nowrap"
      style={{ textShadow: "2px 2px 5px rgba(0,0,0,0.7)" }}
    >
      <div className="absolute z-10 top-10vw left-6vw text-5vw md:top-2vh md:left-3vh md:text-2.5vh text-white">
        New Ideas for a New World
      </div>
      <div className="absolute z-10 flex flex-col-reverse text-white pointer-events-none mt-30vw md:mt-0 px-6vw gap-10vw md:gap-4vh md:flex-col md:left-12vh md:top-1/4 md:max-w-1/2">
        <div className="text-6vw md:text-2.5vh">
          {slide === -1
            ? videos?.length
            : slide === videos?.length
            ? 1
            : slide + 1}{" "}
          - {videos?.length + 1}
        </div>
        {videos && (
          <div className="text-10vw md:text-6vh">
            {videos.map((v, i) => (
              <p
                key={i}
                className={` transform duration-1000 leading-tight ${
                  slide === i
                    ? "translate-y-0 opacity-100 relative"
                    : "translate-y-full opacity-0 absolute"
                }`}
              >
                {v.title}
              </p>
            ))}
          </div>
        )}
      </div>
      <Carousel
        data={videos}
        slide={slide}
        isDisabled={isDisabled}
        swatches={true}
        swatchesClass="absolute bottom-10vw"
        setSlide={setSlide}
        setIsDragging={setIsDragging}
        setDragDiff={setDragDiff}
        containerClass="h-150vw md:w-full md:h-full relative"
        arrowShadow={true}
        arrow={{
          stroke: `${isDisabled ? "Gainsboro" : "GhostWhite"}`,
          strokeWidth: 3,
          LeftArrowClass: `hidden md:block md:w-15vh absolute bottom-12vh left-12vh duration-300 hover:opacity-50`,
          RightArrowClass: `hidden md:block md:w-15vh absolute bottom-12vh left-12vh duration-300 hover:opacity-50 transform translate-x-full`,
        }}
      >
        {videos && (
          <>
            <VideoSlide
              video={videos[videos.length - 1]}
              index={videos.length - 1}
              props={props}
            />
            {videos?.map((v, i) => (
              <VideoSlide video={v} key={i} index={i} props={props} />
            ))}
            <VideoSlide video={videos[0]} index={0} props={props} />
          </>
        )}
      </Carousel>{" "}
      <div className="flex-col hidden h-full overflow-y-scroll bg-white show-scroll md:w-1/4 md:flex">
        {videos?.map((v, i) => (
          <div
            key={i}
            tabIndex={0}
            className="relative m-0.5vh cursor-pointer focus:ring-4 focus:ring-green-500 "
            onClick={() => setSlide(i)}
          >
            <img src={v.cloudinary_video_url} alt={v.title} />
            <div className="absolute inset-0 z-10 flex flex-col justify-between text-white duration-500 bg-black bg-opacity-0 group hover:bg-opacity-30">
              <div className="text-2vh mt-1vh p-0.5vh opacity-0 group-hover:opacity-100 duration-500 text-center">
                <p> {v.title}</p>
              </div>
              {/* <div className="flex justify-around duration-500 opacity-0 text-2vh group-hover:opacity-100">
                <Button className="duration-500 transform px-0.5vh hover:scale-110">
                  Play Now
                </Button>
                <Button className="duration-500 transform px-0.5vh hover:scale-110">
                  watch@Dev.to
                </Button>
              </div> */}
              <div className="flex justify-between bg-black bg-opacity-30 text-2vh p-0.5vh">
                <p> {v.user.name}</p>
                <p>{v.video_duration_in_minutes}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Videos;
