import pic from "../../assets/images/projects-pics/terror_in_tilberg.png";

const ProjectTemplate = () => {
  return (
    <div className="grid h-full w-full grid-cols-3 gap-2">
      <div className="col-span-1 overflow-hidden rounded-xl">
        <img src={pic} alt="terror in tilberg" className="" />
      </div>
      <div className="col-span-2 rounded-xl bg-stone-300">
        detail discription
      </div>
      <div className="col-span-3 h-[50vh] rounded-xl bg-stone-300">
        workflow
      </div>

      <div className="col-span-3 h-[50vh] rounded-xl bg-stone-300">
        links to github
      </div>
    </div>
  );
};

export default ProjectTemplate;
