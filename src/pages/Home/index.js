import Landing from "./Landing";
import Slider from "./Slider";
import WheelSection from "./WheelSection";
import Podcasts from "./Podcasts";
import Videos from "./Videos";
import Dev from "./Dev";
import Profile from "./Profile";

import { useQueries } from "react-query";
import { useEffect, useState } from "react";

const Home = () => {
  const [mobile, setMobile] = useState(false);

  const responsive = () => {
    window.innerWidth < 768 ? setMobile(true) : setMobile(false);
  };

  useEffect(() => {
    responsive();
    window.addEventListener("resize", responsive);

    return () => {
      window.removeEventListener("resize", responsive);
    };
  }, []);

  // const { isLoading, error, data, isFetching } = useQuery("articles", () =>
  //   fetch("https://dev.to/api/articles").then((res) => res.json())
  // );

  const results = useQueries([
    {
      queryKey: ["articles", 1],
      queryFn: () =>
        fetch("https://dev.to/api/articles").then((res) => res.json()),
    },
    {
      queryKey: ["podcast", 2],
      queryFn: () =>
        fetch("https://dev.to/api/podcast_episodes").then((res) => res.json()),
    },
    {
      queryKey: ["videos", 3],
      queryFn: () =>
        fetch("https://dev.to/api/videos").then((res) => res.json()),
    },
    {
      queryKey: ["dev", 4],
      queryFn: () =>
        fetch("  https://dev.to/api/organizations/devteam").then((res) =>
          res.json()
        ),
      select: (x) => ({
        username: x.username,
        profile_image: x.profile_image,
        github_username: x.github_username,
        url: x.url,
        name: x.name,
        summary: x.summary,
        tag_line: x.tag_line,
        tech_stack: x.tech_stack,
      }),
    },
    {
      queryKey: ["videosTest", 5],
      queryFn: () =>
        fetch("https://dev.to/api/videos").then((res) => res.json()),
      select: (x) => x.id,
    },
  ]);

  // console.log(results[4].data);

  return (
    <div
      data-scroll-section
      id="container"
      className="flex flex-col w-screen md:h-screen md:overflow-y-hidden md:flex-row md:w-max"
    >
      <Landing articles={results[0].data} /> <WheelSection />
      <Slider />
      <Podcasts podcasts={results[1].data} />
      <Videos videos={results[2].data} />
      <Dev dev={results[3].data} />
      <Profile profiles={results[0].data} />
    </div>
  );
};

export default Home;
