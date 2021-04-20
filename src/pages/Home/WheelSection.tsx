import { useEffect, useRef, useState } from "react";
import useOnScreen from "src/common/hooks/useOnScreen";
import { wheels, wheelsMenu } from "./statics";
import { useStyleContext } from "@contexts/StyleContext";

const WheelSection: React.FC = () => {
  const [selected, setSelected] = useState<number>(4);
  const { style, setStyle } = useStyleContext();

  const ref = useRef(null);
  const onScreen = useOnScreen(ref);

  useEffect(() => {
    if (onScreen) setStyle({ ...style, color: "bg-black" });
  }, [onScreen]);

  return (
    <div
      ref={ref}
      className="flex flex-col h-full px-4 py-20 bg-blue-300 gap-20vh md:gap-30vh md:py-2vh md:px-10vh md:flex-row"
    >
      <div className="flex flex-col justify-around">
        <div className="items-baseline hidden gap-6 text-2vh md:flex">
          <div className="whitespace-nowrap">Machine Economy</div>
          <div className="h-1 border-t border-black w-20vh" />
          <div className="max-w-prose">
            Advances in technology represent an unprecedented opportunity for
            humanity. The world is changing and with it, entirely new business
            models for a new generation of machine consumers are emerging. This
            utopian, tech-enabled future is no longer a vision — the
            capabilities are available today and we want to create a world where
            the complex and seemingly impossible are now possible. NBT’s Academy
            aims to educate the big thinkers, the dreamers, and the doers to
            cultivate greater participation in the field of technology, making
            what’s possible more accessible to the mainstream. <br />
            <br />
            Anyone can be a visionary in the new world we create —
            <b>be a part of it</b>.
          </div>
        </div>
        <div className="text-9vw md:text-10vh whitespace-nowrap">
          <p className="text-green-400">A Whole New World.</p>
          <p>A Whole New</p>
          <p>Economic Engine.</p>
        </div>
      </div>
      <div
        className="relative flex items-center justify-center text-xs rounded-full h-95vw md:h-95vh md:min-w-95vh"
        data-scroll
        data-scroll-class="spin"
        // data-scroll-position="left"
      >
        {wheels.map((w, i) => (
          <svg
            key={i}
            viewBox="0 0 100 100"
            onClick={() => setSelected(i)}
            className={`cursor-pointer border-2 border-black rounded-full absolute ${
              i >= 1 && `h-${5 - i}/5`
            } transform ${
              i === 1 || i === 3
                ? `rotate-90`
                : i === 0 || i === 2
                ? `-rotate-90`
                : ""
            } ${selected === i ? "bg-black" : "bg-blue-300"}`}
            style={{
              transition: `transform 1.5s ease-out ${
                i / 5
              }s, background-color 0.5s, fill 0.5s`,
              fill: `${selected === i ? "white" : "black"}`,
            }}
          >
            <path fill="none" id={w.id} d={w.d} />
            {w.divider?.map((div, l) => (
              <path key={l} stroke="black" strokeWidth={w.sWidth} d={div} />
            ))}
            <text fontSize={w.textSize}>
              {w.textPath?.map((t, i) => (
                <textPath key={i} xlinkHref={`#${w.id}`} startOffset={t.offset}>
                  {t.text}
                </textPath>
              ))}
            </text>
            {w.text && (
              <text x="9" y="55" className="heavy" fontSize="20">
                {w.text}
              </text>
            )}
          </svg>
        ))}
      </div>
      <div className="flex flex-col-reverse my-auto md:pr-12vh">
        {wheelsMenu.map((w, i) => (
          <div
            key={w.id}
            className={`py-1vh md:w-35vh w-4/5 ml-auto cursor-pointer ${
              selected === i ? "opacity-100" : "opacity-50"
            }`}
            onClick={() => setSelected(i)}
          >
            <div
              className={`origin-right border-black transform duration-700 ${
                selected === i
                  ? "scale-x-125 md:scale-x-150 border-b-2"
                  : "border-b md:scale-x-125"
              }`}
            />
            <div
              className={`flex w-full mt-2 md:mt-2vh ml-auto transform duration-700 origin-right text-3vw md:text-2vh ${
                selected === i ? "scale-125 gap-4 mb-4vh" : "justify-between"
              }`}
            >
              <span>{w.id}.</span>
              <span> {w.title}</span>
            </div>

            <div
              className={`overflow-hidden mt-2 md:mt-1vh duration-500 grid gap-1vh transform origin-right ${
                selected === i ? "scale-110 max-h-96 h-auto" : "max-h-0"
              }`}
            >
              {w.tags.map((t, i) => (
                <div key={i} className="my-2 md:my-0 text-2.5vw md:text-1.6vh">
                  <div className="line-clamp-2">
                    <span className="font-bold">{t.text}</span> -{" "}
                    <span>{t.description}</span>
                  </div>
                  <div className="flex items-center italic underline my-1vh hover:opacity-50">
                    Learn More
                    <svg width="30px" height="3vh" viewBox="0 0 100 100">
                      <path
                        stroke="black"
                        strokeWidth="4"
                        fill="none"
                        d="M0 50 H100 L70 30 L100 50 L70 70"
                      />
                    </svg>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WheelSection;
