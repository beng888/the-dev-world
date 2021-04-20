import { RouterLink } from "Layout/components/PageTransition";

const Media = () => {
  return (
    <div className="w-screen min-h-screen bg-white h-200vw pt-8vw pl-8vw">
      <RouterLink to="/">
        <p className="text-9vw">
          Featured
          <br /> Media
        </p>
      </RouterLink>
    </div>
  );
};

export default Media;
