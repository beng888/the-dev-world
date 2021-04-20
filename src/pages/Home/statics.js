//                           "M0 83.5 100 16.5","M100 83.5 0 16.5"
export const wheels = [
  {
    id: "wheel1",
    d: "M7 50 A1 1 0 0 1 93 50 A1 1 0 0 1 7 50",
    divider: ["M50 0.5 50 9.5", "M91 77.5 83.8 72.7", "M9 77.5 16.2 72.7"],
    sWidth: "0.5",
    textSize: "5",
    textPath: [
      {
        text: "Beginners",
        description: `A journey of a thousand miles begins with a single step." -Chinese Proverb`,
        offset: "1%",
      },
      {
        text: "Tutorial",
        description:
          "Tutorial is a general purpose tag. We welcome all types of tutorial - code related or not! It's all about learning, and using tutorials to teach others!",
        offset: "39.5%",
      },
      {
        text: "CodeNewbie",
        description:
          "The most supportive community of programmers and people learning to code.",
        offset: "69%",
      },
    ],
  },
  {
    id: "wheel2",
    d: "M9 50 A1 1 0 0 1 91 50 A1 1 0 0 1 9 50",
    divider: [
      "M50 1 50 11",
      "M99.5 50 88.5 50",
      "M50 99.5 50 88.5",
      "M0.5 50 11.5 50",
    ],
    sWidth: "0.6",
    textSize: "6",
    textPath: [
      { text: "ComputerScience", offset: "2%" },
      { text: "DataScience", offset: "30.5%" },
      { text: "Algorithms", offset: "57%" },
      { text: "Productivity", offset: "81%" },
    ],
  },
  {
    id: "wheel3",
    d: "M11 50 A1 1 0 0 1 89 50 A1 1 0 0 1 11 50",
    divider: ["M90.7 22.7 78.5 31", "M50 84.5 50 99.5", "M9.3 22.7 21.5 31"],
    sWidth: "0.8",
    textSize: "8",
    textPath: [
      { text: "Cloud", offset: "20%" },
      { text: "Serverless", offset: "51%" },
      { text: "OpenSource", offset: "80%" },
    ],
  },
  {
    id: "wheel4",
    d: "M16 50 A1 1 0 0 1 84 50 A1 1 0 0 1 16 50",
    divider: ["M9.5 77 27.5 65", "M90.5 77 72.5 65", "M50 2 50 23"],
    sWidth: "1.2",
    textSize: "12",
    textPath: [
      { text: "UX", offset: "5%" },
      { text: "UI", offset: "36%" },
      { text: "OOP", offset: "69%" },
    ],
  },
  {
    d: "M14 50 A1 1 0 0 1 86 50 A1 1 0 0 1 14 50",
    text: "WebDev",
  },
];

export const wheelsMenu = [
  {
    id: "05",
    title: "Starting Out",
    tags: [
      {
        text: "Beginners",
        description: `A journey of a thousand miles begins with a single step." -Chinese Proverb`,
      },
      {
        text: "Tutorial",
        description:
          "Tutorial is a general purpose tag. We welcome all types of tutorial - code related or not! It's all about learning, and using tutorials to teach others!",
      },
      {
        text: "CodeNewbie",
        description:
          "The most supportive community of programmers and people learning to code.",
      },
    ],
  },
  {
    id: "04",
    title: "Data Manipulation",
    tags: [
      {
        text: "ComputerScience",
        description:
          "This tag is for sharing and asking questions about anything related to computer science, including data structures, algorithms, research, and white papers! 🤓",
      },
      {
        text: "DataScience",
        description:
          "Data Science allows us to extract meaning from and interpret data. ",
      },
      {
        text: "Algorithms",
        description:
          "Heap, Binary Tree, Data Structure it doesn't matter. This tag should be used for anything Algorithm & Data Structure focused. ",
      },
      {
        text: "Productivity",
        description:
          "Productivity includes tips on how to use tools and software, process optimization, useful references, experience, and mindstate optimization. ",
      },
    ],
  },
  {
    id: "03",
    title: "Innovative Services",
    tags: [
      {
        text: "Cloud",
        description: "There is no cloud, only other peoples computers.",
      },
      { text: "Serverless", description: "All computing — without servers!" },
      {
        text: "OpenSource",
        description:
          "May The Source Be With You! Articles about Open Source and Free Software as a philosophy, and its application to software development and project management.",
      },
    ],
  },
  {
    id: "02",
    title: "Programing",
    tags: [
      {
        text: "UX",
        description: "User Experience tips, tricks, discussions, and more! ",
      },
      {
        text: "UI",
        description:
          "Tag dedicated to posts about user interface. Tips, tricks, techniques, approaches, etc.",
      },
      {
        text: "OOP",
        description:
          "...because thinking inside the box is okay, as long as it's a black box.",
      },
    ],
  },
  {
    id: "01",
    title: "Web Development",
    tags: [
      {
        text: "WebDev",
        description: "This is what you came here for right? 🧐",
      },
    ],
  },
];
