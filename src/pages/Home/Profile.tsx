import { useState } from "react";
import Carousel from "src/common/components/Carousel";
import useOnScreen from "src/common/hooks/useOnScreen";
import { useGlobalContext } from "@contexts/GlobalContext";
import { useEffect, useRef } from "react";
import { useRouter } from "next/router";

const ProfileSlide = ({ profile }) => {
  return (
    <div
      className="relative min-w-full px-4vh md:min-w-third group"
      title={profile.user.name}
    >
      <img
        src={profile.user.profile_image}
        alt={profile.user.name}
        className="w-full duration-300 group-hover:opacity-80"
      />

      {profile.user.website_url && (
        <div
          onClick={() => window.open(profile.user.website_url)}
          className="absolute inset-0 w-full mt-auto text-center text-white duration-300 opacity-0 cursor-pointer px-4vh h-fit group-hover:opacity-100"
        >
          <p className="duration-500 bg-black bg-opacity-50 py-2vh text-3vh hover:bg-opacity-100">
            Go to Website
          </p>
        </div>
      )}
    </div>
  );
};

interface profile {
  user: { name: string; profile_image: string; website_url: string };
}

interface Props {
  profiles: profile[];
}

const Profile: React.FC<Props> = ({ profiles }) => {
  const [slide, setSlide] = useState(0);
  const [isDragging, setIsDragging] = useState(false);

  const ref = useRef(null);
  const onScreen = useOnScreen(ref, "0px -95% 0px 5%");
  const { style } = useGlobalContext();

  const [styleValue, setstyleValue] = style;

  const router = useRouter();

  useEffect(() => {
    if (onScreen) setstyleValue({ ...styleValue, color: "bg-purple-400" });
  }, [onScreen]);

  return (
    <div
      ref={ref}
      className={`flex flex-col justify-between w-full bg-purple-300 h-200vw md:h-screen pt-24vw md:py-8vh px-6vw md:px-14vh ${
        router.pathname === "/" ? "md:w-200vh" : "md:w-full"
      } `}
    >
      <div className="flex flex-col mt-4 md:flex-row gap-15vh">
        <p
          className="text-15vw md:text-8vh whitespace-nowrap"
          onClick={() =>
            window.open(
              "https://tailwindcss.com/docs/min-width#class-reference"
            )
          }
        >
          # TheWeb
          <br />
          DevWorld
        </p>
        <p className="max-w-prose md:w-1/3 text-4vw md:text-2vh leading-tight md:leading-2.5vh">
          "Together, we want to create an empowering space to learn and inspire
          one another with authenticity, creativity, and knowledge. Follow us to
          ignite the change that changes everything."
        </p>
      </div>
      <Carousel
        data={profiles}
        slide={slide}
        swatches={true}
        swatchesClass="my-8vw"
        setSlide={setSlide}
        slideAmount={style.mobile === true ? 1 : 3}
        setIsDragging={setIsDragging}
        containerClass="w-full h-full mt-auto"
        arrow={{
          stroke: "black",
          strokeWidth: 2,
          LeftArrowClass: "hidden",
          RightArrowClass:
            "absolute w-20vh hidden md:block right-0 bg-white rounded-full p-4vh top-0 hover:shadow-lg duration-300 transform translate-y-1/2 -translate-x-1/2",
        }}
      >
        {profiles && (
          <>
            {profiles
              ?.slice(profiles.length - 3, profiles.length)
              .map((p, i) => (
                <ProfileSlide key={i} profile={p} />
              ))}
            {profiles?.map((p, i) => (
              <ProfileSlide key={i} profile={p} />
            ))}
            {profiles?.slice(0, 3).map((p, i) => (
              <ProfileSlide key={i} profile={p} />
            ))}
          </>
        )}
      </Carousel>
    </div>
  );
};

export default Profile;
