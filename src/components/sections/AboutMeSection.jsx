import AnimatedLetters from "../typography/AnimatedLetters.jsx";
import AnimatedLettersContainer from "../typography/AnimatedLettersContainer.jsx";
import ResponsiveTypography from "../typography/ResponsiveTypography";

const AboutMeSection = () => {
  return (
    <AnimatedLettersContainer className="h-[60vh] md:h-[95vh] bg-[#f4e9e1] rounded-3xl  border border-[#5900cc]">
      <div className="flex flex-col items-center justify-center h-full gap-10">
        <AnimatedLetters
          inputString="I'm a"
          fontVariant="h3"
          xEnd="0vw"
          easing="easeInOut"
          shootFromDirection="right"
          className="text-gray-800"
        />

        <AnimatedLetters
          inputString="software developer"
          fontVariant="h2"
          xEnd="0vw"
          easing="easeInOut"
          shootFromDirection="right"
          className="text-[#5900cc] font-bold"
        />

        <div className="w-[90%] sm:w-[80%] md:w-[70%] lg:w-[70%] xl:w-[70%]">
          <ResponsiveTypography variant="body2" className="text-gray-800">
            I like to think of myself as a front-end developer with a
            understanding of back-end technologies. While I enjoy exploring
            back-end tech, working on the front end brings me more passion. I
            love the feeling of presenting my work to the user.
          </ResponsiveTypography>
        </div>
      </div>
    </AnimatedLettersContainer>
  );
};

export default AboutMeSection;
