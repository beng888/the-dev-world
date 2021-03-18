import { useEffect, useLayoutEffect, useRef, useState } from "react";
import tw from "twin.macro";
import Landing from "./Landing";
import { useGQLQuery } from "../../useGQLQuery";
import { wheels } from "./statics";
import { useQuery } from "react-query";

export default function Home() {
  const wheelRef = useRef(null);
  const [wheelHeight, setWheelHeight] = useState<number>(0);

  useLayoutEffect(() => {
    setWheelHeight(wheelRef.current.clientHeight * 0.9);
  }, []);

  useEffect(() => {
    window.addEventListener("resize", () => {
      setWheelHeight(wheelRef.current.clientHeight * 0.9);
    });
  }, []);

  console.log(wheelHeight);

  // const { data, isLoading, error } = useGQLQuery(
  //   "articles",
  //   `query MyQuery {devTo { articles { nodes { title tags socialImage createdAt url user { name } } }}
  // }
  // `
  // );

  // if (isLoading) return <div>Loading...</div>;
  // if (error) return <div>Error: {error.message}</div>;

  //  {JSON.stringify(data)}

  const { isLoading, error, data, isFetching } = useQuery("articles", () =>
    fetch("https://dev.to/api/articles").then((res) => res.json())
  );

  // console.log(data);

  return (
    <div
      data-scroll-section
      id="container"
      tw="flex w-fit h-screen bg-pink-500 "
    >
      <Landing collection={data} />

      <div tw="h-full flex px-20 py-4 background-color[#9EFD9F]">
        <div tw="flex flex-col justify-around">
          <div tw="flex gap-6 items-baseline">
            <div tw="whitespace-nowrap">Machine Economy</div>
            <div tw="w-64 border-t border-black h-1" />
            <div tw="max-width[60ch]">
              Advances in technology represent an unprecedented opportunity for
              humanity. The world is changing and with it, entirely new business
              models for a new generation of machine consumers are emerging.
              This utopian, tech-enabled future is no longer a vision — the
              capabilities are available today and we want to create a world
              where the complex and seemingly impossible are now possible. NBT’s
              Academy aims to educate the big thinkers, the dreamers, and the
              doers to cultivate greater participation in the field of
              technology, making what’s possible more accessible to the
              mainstream. <br />
              <br />
              Anyone can be a visionary in the new world we create —
              <b>be a part of it</b>.
            </div>
          </div>
          <div tw="font-size[5rem] whitespace-nowrap">
            <p tw="color[#67D48D]">A Whole New World.</p>
            <p>A Whole New</p>
            <p>Economic Engine.</p>
          </div>
        </div>
        <div
          tw="h-full aspect-ratio[1/1] text-xs relative flex justify-center items-center"
          className="curved"
          ref={wheelRef}
        >
          {wheels.map((w, i) => (
            <svg
              key={i}
              viewBox="0 0 100 100"
              className={`border-2 border-black rounded-full ${
                i >= 1 && `h-${5 - i}/5`
              }  absolute`}
            >
              <path fill="none" id={w.id} d={w.d} />
              {w.divider?.map((div, l) => (
                <path key={l} stroke="black" strokeWidth={w.sWidth} d={div} />
              ))}
              <text fontSize={w.textSize}>
                {w.textPath?.map((t, i) => (
                  <textPath
                    key={i}
                    xlinkHref={`#${w.id}`}
                    startOffset={t.offset}
                  >
                    {t.text}
                  </textPath>
                ))}
              </text>
              {w.text && (
                <text x="11" y="55" className="heavy" fontSize="17">
                  {w.text}
                </text>
              )}
            </svg>
          ))}
        </div>
      </div>
      {/* <div tw="w-screen h-full">asd</div> */}
    </div>
  );
}
