import AnimatedLetters from "../components/reuse-components/typography/AnimatedLetters.jsx";
import AnimatedLettersContainer from "../components/reuse-components/typography/AnimatedLettersContainer.jsx";
import ResponsiveTypography from "../components/reuse-components/typography/ResponsiveTypography.jsx";
import Watermark from "../components/reuse-components/background/WaterMark.jsx";

const AboutMeSection = () => {
  return (
    <AnimatedLettersContainer className="relative bg-stone-200  h-[60vh] md:h-[95vh] border-2 border-[#5900cc] rounded-xl  ">
      <div className="absolute flex flex-col items-center justify-center h-full gap-10 z-20">
        <AnimatedLetters
          inputString="I'm a"
          fontVariant="h2"
          xEnd="0vw"
          easing="easeInOut"
          shootFromDirection="right"
          className="text-gray-800"
        />
        <AnimatedLetters
          inputString="software developer"
          fontVariant="h1"
          xEnd="0vw"
          easing="easeInOut"
          shootFromDirection="right"
          className="text-[#5900cc] font-bold"
        />
        <div className="w-[90%] sm:w-[80%] md:w-[70%] lg:w-[70%] xl:w-[70%]">
          <ResponsiveTypography variant="body1" className="text-gray-800">
            I like to think of myself as a front-end developer with a
            understanding of back-end technologies. While I enjoy exploring
            back-end tech, working on the front end brings me more passion. I
            love the feeling of presenting my work to the user.
          </ResponsiveTypography>
        </div>
      </div>
      {/* <div className="absolute index-0 bg-stone-50/10 backdrop-blur-sm w-full h-full z-10"></div> */}
      <div className=" absolute text-stone-300 z-5 ">
        <Watermark text="Get motivated" />
        <Watermark text="Live inspired" reverse />
        <Watermark text="Find your passion" />
        <Watermark text="Build an empire" reverse />
        <Watermark text="Get motivated" />
        <Watermark text="Live inspired" reverse />
        <Watermark text="Find your passion" />
        <Watermark text="Build an empire" reverse />
      </div>
    </AnimatedLettersContainer>
  );
};

export default AboutMeSection;
