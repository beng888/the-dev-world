import useOnScreen from "src/common/hooks/useOnScreen";
import { useGlobalContext } from "@contexts/GlobalContext";
import { useEffect, useRef } from "react";
import { RouterLink } from "Layout/components/PageTransition";

interface article {
  title: string;
  tags: Array<string>;
  social_image: string;
  created_at: string;
  positive_reactions_count: number;
  url: string;
  user: { name: string };
}

interface Props {
  articles: article[];
}

const Landing: React.FC<Props> = ({ articles }) => {
  const ref = useRef(null);
  const onScreen = useOnScreen(ref);
  const { style } = useGlobalContext();

  const [styleValue, setstyleValue] = style;

  useEffect(() => {
    if (onScreen) setstyleValue({ ...styleValue, color: null });
  }, [onScreen]);

  return (
    <div
      ref={ref}
      className="relative flex flex-col overflow-x-hidden md:min-w-max"
    >
      <div className="relative overflow-x-hidden md:static md:overflow-visible">
        <img
          data-scroll
          data-scroll-speed="-2"
          src="./images/home1.jpg"
          alt="home1.jpg"
          className="float-left object-cover w-screen max-w-full pointer-events-none h-fit md:h-screen md:min-w-max -z-10"
        />

        <div
          className="absolute inset-0 w-3/5 m-auto text-white transform h-60vw md:h-50vh text-12vw md:translate-x-full md:w-50vh md:text-12vh md:inset-auto md:top-1/4"
          style={{
            textShadow: "2px 2px 5px rgba(0,0,0,0.5)",
            backgroundImage: "url(./images/home1-1.jpg)",
          }}
        >
          <p className="relative transform -translate-y-1/2 -translate-x-1/4">
            The <br /> world
          </p>
          <p className="relative text-right transform translate-y-1/2 translate-x-1/4">
            we <br /> create.
          </p>
        </div>
      </div>

      <div className="relative flex flex-col bg-white h-150vw md:absolute p-4vw pt-20vw md:h-full md:p-4vh md:pt-4vh md:right-12 md:w-60vh">
        <div className="flex justify-between">
          <p className="text-5vw md:text-4vh">Top Stories </p>
          <RouterLink to="/insights">
            {" "}
            <u className="text-4vw md:text-2vh">View all stories</u>
          </RouterLink>
        </div>
        <div className="flex flex-col divide-y divide-gray-600 md:h-full justify-evenly">
          {/* .sort(() => Math.random() - Math.random()) */}
          {articles
            ?.sort(
              (a, b) => b.positive_reactions_count - a.positive_reactions_count
            )
            .slice(0, 4)
            .map((item, i) => {
              let currentDate = new Date(item.created_at);
              const fd = currentDate.toDateString();
              return (
                <div key={i} className="relative flex py-3vw gap-2vh md:py-2vh">
                  <img
                    src={item.social_image}
                    alt={item.social_image}
                    className="w-1/2 my-auto pointer-events-none"
                  />
                  <div className="flex flex-col justify-around w-1/2">
                    <p className="flex justify-between text-2.5vw md:text-1.5vh gap-4">
                      <span className="whitespace-nowrap">
                        {fd.split(" ").slice(1, 3).join("-")}
                      </span>
                      <span>{item.user.name}</span>
                    </p>
                    <p className="text-3vw md:text-2vh line-clamp-2">
                      {item.title}
                    </p>
                    <p className="text-2.5vw md:text-1.5vh">
                      Topics: {item.tags}
                    </p>
                  </div>
                </div>
              );
            })}
        </div>
        <div className="flex items-center justify-between mt-auto h-fit">
          <p className="hidden md:block text-2vh">
            Scroll or drag <br /> to discover
          </p>
          <div className="md:transform md:translate-x-1/2 ">
            <div className="absolute top-0 right-0 w-1/5 transform scale-90 rotate-90 -translate-y-1/2 md:w-15vh -translate-x-1/3 md:transform-none md:relative md:inset-auto">
              <svg viewBox="0 0 100 100" className="bg-black rounded-full ">
                <path
                  stroke="white"
                  strokeWidth="1"
                  fill="none"
                  d="M15 50 H85 L60 30 L85 50 L60 70"
                />
              </svg>
            </div>
          </div>{" "}
        </div>
      </div>
    </div>
  );
};

export default Landing;
