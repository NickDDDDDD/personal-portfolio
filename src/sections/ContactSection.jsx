import { FiMail } from "react-icons/fi";
import { FaLinkedin } from "react-icons/fa";
import { FaSquareGithub } from "react-icons/fa6";

import ResponsiveTypography from "../components/typography/ResponsiveTypography";
const ContactSection = () => {
  return (
    <section className="flex h-[60vh] flex-col items-center justify-center overflow-hidden rounded-2xl border border-green-500 bg-stone-200 p-6 md:h-[95vh]">
      <div className="flex h-full w-full flex-col justify-center gap-6 md:w-1/2">
        <Card
          title="Email"
          subtitle="click to email me"
          href="#"
          Icon={FiMail}
        />
        <Card
          title="GitHub"
          subtitle="click to view my GitHub"
          href="#"
          Icon={FaSquareGithub}
        />
        <Card
          title="LinkedIn"
          subtitle="click to view my LinkedIn"
          href="#"
          Icon={FaLinkedin}
        />
      </div>
    </section>
  );
};

const Card = ({ title, subtitle, Icon, href }) => {
  return (
    <a
      href={href}
      className="group relative flex flex-1 flex-col justify-evenly overflow-hidden rounded-2xl border-[1px] border-neutral-300 bg-white p-6"
    >
      <div className="absolute inset-0 translate-y-[100%] bg-gradient-to-r from-green-500 to-green-400 transition-transform duration-300 group-hover:translate-y-[0%]" />

      <Icon className="absolute right-0 top-0 z-10 h-full w-auto text-stone-100 transition-transform duration-300 group-hover:rotate-12 group-hover:text-emerald-500" />

      <ResponsiveTypography
        variant="h4"
        className="relative z-10 text-lg font-semibold text-green-500 duration-300 group-hover:text-white"
      >
        {title}
      </ResponsiveTypography>
      <ResponsiveTypography
        variant="body2"
        className="relative z-10 text-neutral-400 duration-300 group-hover:text-neutral-100"
      >
        {subtitle}
      </ResponsiveTypography>
    </a>
  );
};

export default ContactSection;
