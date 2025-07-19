import Accordion from "../components/projects/Accordion";
const ProjectSection = () => {
  console.log("WorkSection render");

  return (
    <section className="flex h-full w-full items-center justify-center">
      <Accordion />
    </section>
  );
};

export default ProjectSection;
