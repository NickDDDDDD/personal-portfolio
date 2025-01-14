import WorkCards from "../components/content-components/WorkCards";

const WorkSection = () => {
  console.log("WorkSection render");

  return (
    <section className="rounded-3xl h-[60dvh] md:h-[95dvh] bg-stone-100 border border-[#ff003d]">
      <WorkCards />
    </section>
  );
};

export default WorkSection;
