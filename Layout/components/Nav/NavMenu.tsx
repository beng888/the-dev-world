import { SocialIcon } from "react-social-icons";
import Arrow from "src/common/icon/Arrow";

const socials = [
  "https://twitter.com/thepracticaldev",
  "https://www.facebook.com/thepracticaldev",
  "https://github.com/thepracticaldev",
  "https://www.instagram.com/thepracticaldev/",
  "https://www.twitch.tv/thepracticaldev",
];

const NavMenu: React.FC<{ navOpen: boolean; mobile: boolean }> = ({
  navOpen,
  mobile,
}) => {
  return (
    <div
      className={`fixed z-10 flex flex-col gap-10vw w-screen md:gap-0 bg-black overflow-y-auto md:overflow-y-visible overflow-x-visible duration-500 ease-in-out text-white h-screen md:flex-row transform ${
        navOpen && mobile ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      <div
        className={`h-full md:py-5vh bg-black z-10 duration-700 transform w-full md:w-70% px-6vw md:px-0 pt-24vw ${
          navOpen && !mobile ? "translate-x-100vw delay-200" : "translate-x-0"
        }`}
      >
        <div
          className={`flex flex-col md:h-full md:pl-30vh md:justify-evenly text-9vw gap-y-8vw md:gap-y-0 md:text-10vh md:border-r border-gray-700 ${
            navOpen || mobile
              ? "opacity-100 delay-500 duration-1000"
              : "opacity-0 duration-300"
          }`}
        >
          <p>Home</p>
          <p>Topics</p>
          <p>Insights</p>
          <p>Media</p>
          <p>Initiatives</p>
        </div>
      </div>
      <div
        className={`w-full block md:w-30% md:px-7vh md:py-8vh bg-black transform px-6vw py-20vw ${
          navOpen && !mobile
            ? "translate-x-100vw duration-1000 delay-200"
            : "translate-x-0 duration-700"
        }`}
      >
        <div
          className={`flex flex-col justify-between h-full divide-y divide-gray-700 md:divide-y-0 ${
            navOpen || mobile
              ? "opacity-100 delay-700 duration-1000"
              : "opacity-0 duration-300"
          }`}
        >
          <div className="flex flex-col-reverse md:flex-col gap-10vh">
            <div className="flex justify-between md:my-0 md:gap-2vh md:justify-start my-10vw">
              {socials.map((s, i) => (
                <div
                  key={i}
                  className="duration-500 hover:opacity-50 h-7vw w-7vw md:h-5vh md:w-5vh border-0.3vw md:border-0.3vh rounded-full"
                >
                  <SocialIcon
                    url={s}
                    style={{
                      height: "100%",
                      width: "100%",
                    }}
                    bgColor="#000"
                    fgColor="#fff"
                  />{" "}
                </div>
              ))}
            </div>
            <div className="grid gap-7vw md:gap-5vh text-5vw md:text-2.5vh">
              <p>About Us</p>
              <p>Partnership</p>
              <p>Contact</p>
            </div>
          </div>
          <div className="grid gap-14vw md:gap-12vh py-10vw md:py-0">
            <div className="grid gap-7vw md:gap-3vh text-5vw md:text-3vh">
              <p>Stay in the Know</p>
              <div className="flex justify-between w-full border-b-2 border-white text-4vw md:text-1.6vh h-19vw md:h-7vh">
                <input
                  type="email"
                  placeholder="E-mail Address"
                  className="w-full"
                />
                <Arrow stroke="white" strokeWidth={3} />
              </div>
            </div>
            <div className="text-3vw md:text-1.5vh grid gap-6vw md:gap-2vh">
              <div className="flex gap-2vh">
                <p>Privacy</p>
                <p>Imprint</p>
              </div>
              <p>© 2021 Next Big Thing AG</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavMenu;
