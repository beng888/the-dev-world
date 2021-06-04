import { useState } from "react";
import Carousel from "../../common/components/Carousel";
import useOnScreen from "src/common/hooks/useOnScreen";
import { useGlobalContext } from "@contexts/GlobalContext";
import { useEffect, useRef } from "react";

interface podcast {
  image_url: string;
  title: string;
  podcast: { title: string };
}

interface Props {
  podcasts: podcast[];
}

const Podcasts: React.FC<Props> = ({ podcasts }) => {
  const [slide, setSlide] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const ref = useRef(null);
  const onScreen = useOnScreen(ref);
  const { style } = useGlobalContext();

  const [styleValue, setstyleValue] = style;

  useEffect(() => {
    if (onScreen) setstyleValue({ ...styleValue, color: "bg-red-400" });
  }, [onScreen]);

  const PodcastSlide = ({ podcast }) => {
    return (
      <div className="h-full min-w-full px-2 md:min-w-half">
        <div
          className={`relative items-end flex w-full h-full ${
            !isDragging && "group"
          }`}
        >
          <div className="relative w-full h-full overflow-hidden">
            <div className="absolute inset-0 z-10 duration-500 bg-black bg-opacity-0 group-hover:bg-opacity-50" />
            <img
              src={podcast.image_url}
              alt={podcast.title}
              className="w-full h-full duration-1000 ease-out transform group-hover:scale-110"
            />
          </div>
          <div className="absolute z-20 flex flex-col items-center justify-between w-3/4 duration-500 transform -translate-x-px bg-white md:w-1/2 p-2vh hover:bg-transparent hover:text-white h-1/2">
            <p
              className="break-words text-10vw md:text-5vh"
              style={{ maxWidth: "10ch" }}
            >
              {" "}
              {podcast.podcast.title}
            </p>
            <p className="text-2.5vh"> {podcast.title}</p>
          </div>
        </div>{" "}
      </div>
    );
  };

  return (
    <div
      ref={ref}
      className="flex flex-col bg-white md:h-full p-6vw md:p-0 md:px-20vh md:flex-row md:w-300vh"
    >
      <div className="relative flex items-center w-full h-full md:w-max md:relative md:mt-auto mt-30vw">
        <div className="z-10 grid gap-8vh">
          <p className="text-17vw md:text-8vh">
            Facts &amp; <br /> Figures
            {/* <br /> {mobile ? "true" : "false"} */}
          </p>

          <p className="leading-normal text-4vw whitespace-nowrap md:text-2vh ">
            Explore Developer Insights and Global <br /> Trends with these
            informative Podcasts!
          </p>
        </div>{" "}
        <div className="absolute flex flex-col w-full md:py-10 h-max md:h-full md:pr-1vh md:w-50vh md:relative md:justify-between">
          <img
            src="./images/podcast.png"
            alt="dev"
            className="relative object-contain transform -translate-y-3/4 md:transform-none top-2vw w-35vw -left-16 md:inset-auto"
          />
          <img
            src="./images/arrows.jpg"
            alt="arrow"
            className="relative transform scale-125 -translate-y-3/4 md:translate-y-0 left-1/2 rotate-270 md:scale-150 md:rotate-180 w-65vw md:inset-auto"
          />
        </div>
      </div>
      <Carousel
        data={podcasts}
        slide={slide}
        setSlide={setSlide}
        swatches={true}
        slideAmount={style.mobile === true ? 1 : 2}
        setIsDragging={setIsDragging}
        containerClass="md:mt-auto h-150vw md:h-5/6 w-full my-7vw md:my-0 overflow-y-hidden"
        arrow={{
          stroke: "gray",
          strokeWidth: 5,
          LeftArrowClass:
            "arrow-rounded-border w-10vh mx-2vh h-fit top-1/2 relative hidden md:block",
          RightArrowClass:
            "arrow-rounded-border w-10vh mx-2vh h-fit top-1/2 relative hidden md:block",
        }}
      >
        {podcasts && (
          <>
            <PodcastSlide podcast={podcasts[podcasts.length - 2]} />
            <PodcastSlide podcast={podcasts[podcasts.length - 1]} />
            {podcasts?.map((podcast, i) => (
              <PodcastSlide podcast={podcast} key={i} />
            ))}
            <PodcastSlide podcast={podcasts[0]} />
            <PodcastSlide podcast={podcasts[1]} />
          </>
        )}
      </Carousel>
    </div>
  );
};

export default Podcasts;
