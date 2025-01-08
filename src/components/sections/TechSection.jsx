import { TechSectionContent } from "/src/utils/content";
import { useRef } from "react";
import AnimatedLetters from "../typography/AnimatedLetters.jsx";
import AnimatedLettersContainer from "../typography/AnimatedLettersContainer.jsx";
import TiltCard from "../TiltCard";
import DragCard from "../DragCard";
import { nanoid } from "nanoid";
import { useState, useEffect, useCallback } from "react";

const {
  ReactIcon,
  HtmlIcon,
  CssIcon,
  JsIcon,
  TailwindIcon,
  MaterialUiIcon,
  PlaywrightIcon,
} = TechSectionContent;

const TechSection = () => {
  const frontEndContainerRef = useRef(null);
  const [frontEndIcons, setFrontEndIcons] = useState([]);

  const generateRandomPosition = (existingPositions, minDistance = 20) => {
    let position;
    let isValid = false;

    while (!isValid) {
      const top = Math.random() * (80 - 10) + 5;
      const left = Math.random() * (80 - 10) + 5;

      position = { top, left };

      isValid = existingPositions.every(
        (pos) =>
          Math.sqrt((pos.top - top) ** 2 + (pos.left - left) ** 2) > minDistance
      );
    }

    return position;
  };

  const generateFrontEndIcons = useCallback(() => {
    const icons = [
      HtmlIcon,
      CssIcon,
      JsIcon,
      ReactIcon,
      MaterialUiIcon,
      TailwindIcon,
      PlaywrightIcon,
    ];

    const positions = [];
    const frontEndIcons = icons.map((Icon) => {
      const { top, left } = generateRandomPosition(positions);
      positions.push({ top, left });

      return {
        Icon,
        id: nanoid(),
        rotate: Math.random() * 60 - 30,
        top: `${top}%`,
        left: `${left}%`,
      };
    });

    return frontEndIcons;
  }, []);

  useEffect(() => {
    setFrontEndIcons(generateFrontEndIcons());
  }, [generateFrontEndIcons]);

  return (
    <AnimatedLettersContainer className="h-[60vh] md:h-[100vh] rounded-3xl border bg-[#f4e9e1] border-[#2835f8]">
      <section className="flex flex-col h-full items-center justify-center gap-10 p-40">
        <AnimatedLetters
          inputString="What's in my"
          fontVariant="h3"
          xEnd="0vw"
          easing="easeInOut"
          shootFromDirection="right"
          className="text-gray-800"
        />
        <AnimatedLetters
          inputString="toolbox"
          fontVariant="h2"
          xEnd="0vw"
          easing="easeInOut"
          shootFromDirection="right"
          className="text-[#2835f8] font-bold"
        />

        <div className="grid w-full h-full grid-cols-1 ">
          {/* front-end */}
          <div
            className="relative rounded-xl bg-cover bg-center bg-no-repeat"
            ref={frontEndContainerRef}
          >
            <div className="absolute inset-0 z-10 rounded-lg">
              {frontEndIcons.map((icon) => (
                <DragCard
                  key={icon.id}
                  containerRef={frontEndContainerRef}
                  rotate={icon.rotate}
                  top={icon.top}
                  left={icon.left}
                >
                  <TiltCard>
                    <icon.Icon className="w-24 h-24" />
                  </TiltCard>
                </DragCard>
              ))}
            </div>
          </div>
          {/* back-end */}
          {/* <div className="relative border border-[#2835f8]"></div> */}
        </div>
      </section>
    </AnimatedLettersContainer>
  );
};

export default TechSection;
