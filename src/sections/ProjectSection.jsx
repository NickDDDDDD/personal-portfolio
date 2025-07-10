import Accordion from "../components/projects/Accordion";
const ProjectSection = () => {
  console.log("WorkSection render");

  return (
    <section className="h-full w-full rounded-2xl border border-stone-800">
      <Accordion />
    </section>
  );
};

export default ProjectSection;
