import Cards from "./Cards";
import "./Style.css"

const TrendingSection = () => {
  return (
    <section className="h-80 bg-slate-500 overflow-y-auto ml-10 section-scrollbar">
      <Cards />
      <Cards />
      <Cards />
    </section>
  );
};

export default TrendingSection;
