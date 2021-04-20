import { useContext, useEffect, useRef, useState } from "react";
import { SmoothScrollContext } from "@contexts/SmoothScroll.context";
import { useStyleContext } from "@contexts/StyleContext";
import Magnifier from "src/common/icon/Magnifier";
import Hamburger from "src/common/icon/Hamburger";
import NavMenu from "./NavMenu";
import Cross from "src/common/icon/Cross";

const Nav: React.FC = () => {
  const { scroll } = useContext(SmoothScrollContext);
  const [distance, setDistance] = useState<number>(0);
  const [traveled, setTraveled] = useState<number>(0);
  const { style } = useStyleContext();
  const [reveal, setReveal] = useState(true);
  const [navOpen, setNavOpen] = useState(false);

  let prevScroll;
  function travel() {
    setTraveled(scroll?.scroll.instance.delta.x);
    const currentScroll = scroll?.scroll.instance.scroll.y;
    setReveal(prevScroll > currentScroll);

    // console.log({ prevScroll: prevScroll, currentScroll: currentScroll });
    prevScroll = currentScroll;
  }

  useEffect(() => {
    setDistance(scroll?.scroll.instance.limit.x);
    prevScroll = scroll?.scroll.instance.scroll.y;
    document.addEventListener("wheel", travel);

    return () => {
      document.removeEventListener("wheel", travel);
    };
  }, [scroll]);

  return (
    <>
      <NavMenu navOpen={navOpen} mobile={style.mobile} />
      <div
        className={`glass fixed inset-x-0 md:inset-x-auto md:inset-y-0 z-50 flex flex-row-reverse transform md:flex-col items-center justify-between text-white  ease-out border-white p-5vw md:p-3vh ${
          style.color && !style.mobile && !navOpen
            ? `${style.color} duration-1000`
            : navOpen
            ? "bg-black duration-500"
            : "bg-gray-400 bg-opacity-10"
        } ${style.mobile ? "border-b" : "border-r"} ${
          style.mobile && !reveal && !navOpen
            ? "-translate-y-full duration-500"
            : "translate-y-0 duration-700"
        } `}
        style={{
          backdropFilter: "blur(25px)",
          WebkitBackdropFilter: "blur(25px)",
        }}
      >
        <div
          className="absolute inset-y-0 left-0 h-full duration-300 bg-white w-1vh"
          style={{ height: `${(traveled / distance) * 100}%` }}
        />
        <div className="flex items-center h-full w-20vw md:w-4vh md:flex-col gap-6vw md:gap-4vh">
          <Magnifier stroke="white" strokeWidth={7} />
          <div className="relative cursor-pointer w-20vw md:w-4vh">
            <Hamburger
              onClick={() => setNavOpen(!navOpen)}
              stroke="white"
              strokeWidth={3}
              className={`absolute transform md:rotate-270 duration-300 ${
                navOpen ? "opacity-0" : "opacity-100"
              }`}
            />
            <Cross
              onClick={() => setNavOpen(!navOpen)}
              stroke="white"
              strokeWidth={7}
              className={`duration-300 ${
                navOpen ? "opacity-100" : "opacity-0"
              }`}
            />
          </div>
        </div>
        <div
          className={`origin-center transform text-5vw md:text-2.5vh flex items-center gap-5vw md:gap-2vh ${
            !style.mobile && "rotate-180 vertical-text"
          } duration-200 ${
            style.mobile && navOpen ? "opacity-0" : "opacity-100"
          }`}
        >
          <p>DEV</p>
          <p className="text-transparent border-r-2 md:border-t-2 md:border-r-0">
            |
          </p>
          <div className="md:flex md:gap-1vh">
            <p className="text-3vw md:text-2.5vh">Academy</p>{" "}
            <p
              className={`duration-200 ${
                navOpen ? "opacity-0" : "opacity-100"
              }`}
            >
              Home
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Nav;
