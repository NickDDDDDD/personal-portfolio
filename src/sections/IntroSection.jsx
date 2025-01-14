import AnimatedLetters from "../components/reuse-components/typography/AnimatedLetters.jsx";
import AnimatedLettersContainer from "../components/reuse-components/typography/AnimatedLettersContainer.jsx";
import MyAvatar from "../components/content-components/MyAvatar.jsx";

const IntroSection = () => {
  return (
    <AnimatedLettersContainer className="h-[60vh] md:h-[95vh]">
      <div className="flex flex-col items-center justify-center gap-10 h-full">
        <AnimatedLetters
          inputString="Hello, my name is"
          fontVariant="h2"
          ease="backInOut"
          shootFromDirection="bottom"
        />
        <AnimatedLetters
          inputString="Nick"
          fontVariant="h1"
          ease="backInOut"
          shootFromDirection="bottom"
          className="text-[#ffaf1b] font-bold"
        />
        <MyAvatar />
      </div>
    </AnimatedLettersContainer>
  );
};

export default IntroSection;
