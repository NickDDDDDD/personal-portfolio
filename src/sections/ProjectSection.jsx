import Accordion from "../components/projects/Accordion";
const ProjectSection = () => {
  console.log("WorkSection render");

  return (
    <section className="border-1 h-full w-full rounded-2xl border-stone-800">
      <Accordion />
    </section>
  );
};

export default ProjectSection;
