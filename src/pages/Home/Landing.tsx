import React from "react";
import tw from "twin.macro";
import { BsArrowRight } from "react-icons/bs";

const items = [
  {
    img: "./images/home1-1.jpg",
    date: "18th Feb",
    author: "Megan Doyle",
    title: "Building A Decentralized Future with dApps",
    tags:
      "Tags: DLT, Blockchain, Smart Business, Models, Disruptive Industries",
  },
  {
    img: "./images/home1-1.jpg",
    date: "18th Feb",
    author: "Megan Doyle",
    title: "Building A Decentralized Future with dApps",
    tags:
      "Tags: DLT, Blockchain, Smart Business, Models, Disruptive Industries",
  },
  {
    img: "./images/home1-1.jpg",
    date: "18th Feb",
    author: "Megan Doyle",
    title: "Building A Decentralized Future with dApps",
    tags:
      "Tags: DLT, Blockchain, Smart Business, Models, Disruptive Industries",
  },
];

interface Articles {
  title: String;
  tags: Array<String>;
  social_image: string;
  created_at: String;
  url: String;
  user: { name: String };
}

export default function Landing({ collection }: { collection: Articles[] }) {
  console.log(collection);
  return (
    <div
      tw="min-width[max-content] overflow-x-hidden relative 
        after:(content['asdasdasd'] absolute inset-0 z-30)"
    >
      <img
        data-scroll
        data-scroll-speed="-2"
        src="./images/home1.jpg"
        alt="home1.jpg"
        tw="float-left min-width[max-content] max-w-full h-screen  w-screen object-cover -z-10"
      />

      {/* <picture tw="inset-0 absolute -z-10" data-scroll data-scroll-speed="-2">
        <source
          srcSet="./smaller-images/home1.jpg"
          media="(max-width: 580px)"
        />
        <img
          src="./images/home1.jpg"
          alt="home1.jpg"
          tw="h-full w-full object-cover"
        />
      </picture> */}

      <div
        tw="h-1/2 text-white absolute top-1/4 
        left[20%] aspect-ratio[1/1] font-size[12vh] 
        text-shadow[2px 2px 5px rgba(0,0,0,0.5)] background-image[url(./images/home1-1.jpg)]"
      >
        <p tw="relative transform[translate(-20%,-55%)]">The world</p>
        <p tw="text-right relative transform[translate(20%,50%)]">we create.</p>
      </div>

      <div tw="h-full bg-white absolute p-6 flex flex-col right[3%] width[28%]">
        <div tw="flex justify-between">
          <p tw="text-3xl">Top Stories</p>
          <u>View all stories</u>
        </div>

        {collection
          ?.sort(() => Math.random() - Math.random())
          .slice(0, 4)
          .map((item, i) => (
            <div
              key={i}
              tw="py-4 gap-5 border-b border-gray-400 grid grid-template-columns[1fr 2fr]"
            >
              <img
                src={item.social_image}
                alt={item.social_image}
                tw="w-full my-auto"
              />
              <div tw="text-xs flex flex-col gap-3">
                <p tw="flex justify-between">
                  <span>{item.created_at.split("T")[0]}</span>
                  <span>{item.user.name}</span>
                </p>
                <p tw="text-lg leading-5 ">{item.title}</p>
                <p>Topics: {item.tags}</p>
              </div>
            </div>
          ))}
        <div tw="my-auto flex justify-between items-center">
          <p>
            Scroll or drag <br /> to discover
          </p>
          <div tw="h-32 w-32">
            <svg viewBox="0 0 100 100" tw="bg-black rounded-full">
              <path
                stroke="gray"
                strokeWidth="1"
                fill="none"
                d="M15 50 H85 L50 30 L85 50 L50 70"
              />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}
