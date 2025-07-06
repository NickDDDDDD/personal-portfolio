import ShiftLetters from "../components/reuse-components/typography/ShiftLetters.jsx";
import AnimatedLettersContainer from "../components/reuse-components/typography/AnimatedLettersContainer.jsx";
import ResponsiveTypography from "../components/reuse-components/typography/ResponsiveTypography.jsx";
import Watermark from "../components/reuse-components/background/WaterMark.jsx";

const AboutMeSection = () => {
  return (
    <AnimatedLettersContainer className="relative bg-stone-200  h-[60vh] md:h-[95vh] border-2 border-[#5900cc] rounded-xl  ">
      <div className="absolute flex flex-col items-center justify-center h-full gap-10 z-20">
        <ResponsiveTypography variant="h2" className="text-gray-800">
          I&apos;m a
        </ResponsiveTypography>
        <ShiftLetters
          text="full stack developer"
          fontVariant="h1"
          className="text-[#5900cc] font-bold"
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
      <div className="absolute index-0 backdrop-blur-sm w-full h-full z-10"></div>
      <div className=" absolute text-stone-300 z-5 ">
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
