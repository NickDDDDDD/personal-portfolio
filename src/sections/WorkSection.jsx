import WorkCards from "../components/content-components/WorkCards";

const WorkSection = () => {
  console.log("WorkSection render");

  return (
    <section className="h-[60dvh] md:h-[95dvh] bg-stone-200 ]">
      <WorkCards />
    </section>
  );
};

export default WorkSection;
