import AnimatedLetters from "../typography/AnimatedLetters.jsx";
import AnimatedLettersContainer from "../typography/AnimatedLettersContainer.jsx";
import MyAvatar from "../MyAvatar";

const IntroSection = () => {
  return (
    <AnimatedLettersContainer className="h-[60vh] md:h-[95vh]">
      <div className="flex flex-col items-center justify-center gap-5 h-full">
        <AnimatedLetters
          inputString="Hello, my name is"
          fontVariant="h2"
          ease="backInOut"
          shootFromDirection="top"
        />
        <AnimatedLetters
          inputString="Nick"
          fontVariant="h1"
          ease="backInOut"
          shootFromDirection="top"
          className="text-[#ffaf1b] font-bold"
        />
        <MyAvatar />
      </div>
    </AnimatedLettersContainer>
  );
};

export default IntroSection;
