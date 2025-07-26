import pic from "../../assets/images/projects-pics/terror_in_tilberg.png";
import ReactMarkdown from "react-markdown";
import Description from "../../docs/terror-in-tilberg-description.md?raw";
import ResponsiveTypography from "../typography/ResponsiveTypography";
const ProjectTemplate = () => {
  return (
    <div className="grid h-full w-full grid-cols-3 gap-4">
      <div className="col-span-1 overflow-hidden rounded-2xl">
        <img src={pic} alt="terror in tilberg" />
      </div>
      <div className="col-span-2 flex flex-col items-center justify-center gap-4">
        <div className="flex w-full flex-1 items-center justify-center rounded-2xl bg-[#292524] text-[#d5e000]">
          <ResponsiveTypography variant="h6" className="font-bold">
            Project Type: Web App
          </ResponsiveTypography>
        </div>
        <div className="flex w-full flex-1 items-center justify-center rounded-2xl bg-[#292524] text-[#d5e000]">
          <ResponsiveTypography variant="h6" className="font-bold">
            Duration: July 2024 - May 2025
          </ResponsiveTypography>
        </div>
        <div className="flex w-full flex-1 items-center justify-center rounded-2xl bg-[#292524] text-[#d5e000]">
          <ResponsiveTypography variant="h6" className="font-bold">
            Team Size: 10 members
          </ResponsiveTypography>
        </div>
        <div className="flex w-full flex-1 items-center justify-center rounded-2xl bg-[#292524] text-[#d5e000]">
          <ResponsiveTypography variant="h6" className="font-bold">
            My Role: Product Owner & Frontend Developer
          </ResponsiveTypography>
        </div>
      </div>
      <div className="relative col-span-3 rounded-xl bg-[#292524]">
        <div className="prose prose-h2:text-[#d5e000] prose-h3:text-[#d5e000] prose-invert prose-2xl max-w-none p-8 marker:text-[#d5e000]">
          <ReactMarkdown>{Description}</ReactMarkdown>
        </div>
      </div>
    </div>
  );
};

export default ProjectTemplate;
