import Button from "src/common/components/Button";
import useOnScreen from "src/common/hooks/useOnScreen";

import { useGlobalContext } from "@contexts/GlobalContext";
import { useEffect, useRef } from "react";

const Slider: React.FC = () => {
  const ref = useRef(null);
  const onScreen = useOnScreen(ref);
  const { style } = useGlobalContext();

  const [styleValue, setstyleValue] = style;

  useEffect(() => {
    if (onScreen) setstyleValue({ ...styleValue, color: "bg-purple-400" });
  }, [onScreen]);

  return (
    <div
      ref={ref}
      className="flex flex-col items-center justify-between h-full text-white bg-gray-700 md:gap-30vh py-24vw md:py-0 px-7vw md:px-24vh md:w-max md:flex-row"
    >
      <div className="w-full md:w-max">
        <p className="mb-6vh text-2vh">What webDevelopers are working on</p>

        <p className="mb-12vh text-8vw md:text-8vh whitespace-nowrap">
          <span className="text-purple-500">
            Change your <br /> thoughts and
            <br />
          </span>{" "}
          you change <br /> the world{" "}
        </p>

        <Button className="hidden md:block btn-medium">
          {" "}
          Discover Global Shapers
        </Button>
      </div>
      <div className="grid content-center w-85vw h-85vw md:h-80vh md:w-80vh bg-home-slider-bg">
        <div
          // data-scroll
          // data-scroll-speed="1"
          // data-scroll-repeat={true}
          // data-scroll-call="asd"
          className="relative m-auto w-65vw h-65vw md:w-60vh md:h-60vh"
          style={{
            backgroundImage: `url(https://media3.s-nbcnews.com/j/newscms/2019_41/3047866/191010-japan-stalker-mc-1121_06b4c20bbf96a51dc8663f334404a899.fit-760w.JPG)`,
          }}
        >
          <p className="absolute text-2.5vh bottom-0 left-0 transform translate-y-full leading-4vh">
            It starts with you
          </p>
        </div>
      </div>
      <Button className="block mr-auto md:hidden mt-8vw btn-medium">
        Discover Global Shapers
      </Button>
    </div>
  );
};

export default Slider;
