import Accordion from "../components/projects/Accordion";
const ProjectSection = ({ scrollContainerRef }) => {
  console.log("WorkSection render");

  return <Accordion scrollContainerRef={scrollContainerRef} />;
};

export default ProjectSection;
