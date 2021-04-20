import { RouterLink } from "Layout/components/PageTransition";

const Insights = () => {
  return (
    <div className="w-screen min-h-screen bg-white h-200vw pt-8vw pl-8vw">
      <RouterLink to="/media">
        <p className="text-9vw">
          Featured
          <br /> Insights
        </p>
      </RouterLink>
    </div>
  );
};

export default Insights;
