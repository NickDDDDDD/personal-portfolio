import ShiftLetters from "../components/typography/ShiftLetters.jsx";
import AnimatedLettersContainer from "../components/typography/AnimatedLettersContainer.jsx";
import MyAvatar from "../components/MyAvatar.jsx";
import ResponsiveTypography from "../components/typography/ResponsiveTypography.jsx";

const IntroSection = () => {
  return (
    <AnimatedLettersContainer className="h-[60vh] rounded-2xl bg-[#000000] md:h-[95vh]">
      <div className="flex h-full flex-col items-center justify-center gap-10">
        <ResponsiveTypography variant="h2" className="text-[#fafafa]">
          Hello, my name is
        </ResponsiveTypography>
        <ShiftLetters
          text="Nick"
          fontVariant="h1"
          className="font-bold text-[#ffaf1b]"
        />
        <MyAvatar />
      </div>
    </AnimatedLettersContainer>
  );
};

export default IntroSection;
