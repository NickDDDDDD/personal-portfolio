import ResponsiveTypography from "../components/typography/ResponsiveTypography.jsx";
import Watermark from "../components/background/WaterMark.jsx";

const AboutMeSection = () => {
  return (
    <div className="relative h-[60vh] overflow-clip rounded-2xl bg-stone-200 md:h-[95vh]">
      <div className="absolute z-20 flex h-full flex-col items-center justify-center gap-10">
        <ResponsiveTypography variant="h3" className="text-gray-800">
          I&apos;m a
        </ResponsiveTypography>
        <ResponsiveTypography
          variant="h1"
          className="font-bold text-violet-700"
        >
          software engineer
        </ResponsiveTypography>

        <div className="w-[90%] sm:w-[80%] md:w-[70%] lg:w-[70%] xl:w-[70%]">
          <ResponsiveTypography variant="h6" className="text-stone-500">
            Hi, I&apos;m a software engineer who loves creating things that
            solve real problems. I believe there is no single best technology —
            only the one that fits the problem best. This mindset drives me to
            bridge the gap between technology and people, translating complex
            technical concepts into intuitive solutions and working with others
            to bring those ideas to life.
          </ResponsiveTypography>
        </div>
      </div>
      <div className="index-0 absolute z-10 h-full w-full backdrop-blur-sm"></div>
      <div className="z-5 absolute text-stone-300">
        <Watermark text="Full Stack" />
        <Watermark text="Inductive" reverse />
        <Watermark text="Front-end" />
        <Watermark text="Product" reverse />
        <Watermark text="Full Stack" />
        <Watermark text="Deductive" reverse />
        <Watermark text="Back-end" />
        <Watermark text="Technologies" reverse />
      </div>
    </div>
  );
};

export default AboutMeSection;
