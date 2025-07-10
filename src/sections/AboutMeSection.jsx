import ShiftLetters from "../components/typography/ShiftLetters.jsx";
import AnimatedLettersContainer from "../components/typography/AnimatedLettersContainer.jsx";
import ResponsiveTypography from "../components/typography/ResponsiveTypography.jsx";
import Watermark from "../components/background/WaterMark.jsx";

const AboutMeSection = () => {
  return (
    <AnimatedLettersContainer className="relative h-[60vh] rounded-2xl border border-violet-700 bg-stone-200 md:h-[95vh]">
      <div className="absolute z-20 flex h-full flex-col items-center justify-center gap-10">
        <ResponsiveTypography variant="h3" className="text-gray-800">
          I&apos;m a
        </ResponsiveTypography>
        <ShiftLetters
          text="full stack developer"
          fontVariant="h2"
          className="font-bold text-violet-700"
        />
        <div className="w-[90%] sm:w-[80%] md:w-[70%] lg:w-[70%] xl:w-[70%]">
          <ResponsiveTypography variant="body1" className="text-gray-800">
            I like to think of myself as a front-end developer with an
            understanding of back-end technologies. This allows me to approach
            problems in two ways: starting from the product to find the right
            technology, or starting from the technology to discover what kinds
            of products can be built
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
    </AnimatedLettersContainer>
  );
};

export default AboutMeSection;
