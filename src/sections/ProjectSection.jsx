import Accordion from "../components/projects/Accordion";
const ProjectSection = ({ scrollContainerRef }) => {
  console.log("WorkSection render");

  return (
    <section className="flex h-full w-full items-center justify-center">
      <Accordion scrollContainerRef={scrollContainerRef} />
    </section>
  );
};

export default ProjectSection;
