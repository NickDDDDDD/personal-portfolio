import ShiftLetters from "../components/reuse-components/typography/ShiftLetters.jsx";
import AnimatedLettersContainer from "../components/reuse-components/typography/AnimatedLettersContainer.jsx";
import MyAvatar from "../components/content-components/MyAvatar.jsx";
import ResponsiveTypography from "../components/reuse-components/typography/ResponsiveTypography.jsx";

const IntroSection = () => {
  return (
    <AnimatedLettersContainer className="bg-[#000000]  h-[60vh] md:h-[95vh] rounded-xl ">
      <div className="flex  flex-col items-center justify-center gap-10 h-full">
        <ResponsiveTypography variant="h2">
          Hello, my name is
        </ResponsiveTypography>
        <ShiftLetters
          text="Nick"
          fontVariant="h1"
          className="text-[#ffaf1b] font-bold"
        />
        <MyAvatar />
      </div>
    </AnimatedLettersContainer>
  );
};

export default IntroSection;
