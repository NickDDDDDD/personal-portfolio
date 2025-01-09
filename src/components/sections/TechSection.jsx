import { TechSectionContent } from "/src/utils/content";
import { useRef } from "react";
import AnimatedLetters from "../typography/AnimatedLetters.jsx";
import AnimatedLettersContainer from "../typography/AnimatedLettersContainer.jsx";
import TiltCard from "../TiltCard";
import DragCard from "../DragCard";
import { nanoid } from "nanoid";
import { useState, useEffect, useCallback } from "react";
import { useMeasure } from "react-use";

const {
  ReactIcon,
  HtmlIcon,
  CssIcon,
  JsIcon,
  TailwindIcon,
  MaterialUiIcon,
  PlaywrightIcon,
  ViteIcon,
  WebpackIcon,
  JavaIcon,
  MySqlIcon,
  PostgresqlIcon,
  Burpsuite,
  Postman,
} = TechSectionContent;

const TechSection = () => {
  const containerRef = useRef(null);
  const [measureRef, { width, height }] = useMeasure();

  const setRefs = useCallback(
    (node) => {
      containerRef.current = node;
      measureRef(node);
    },
    [measureRef]
  );

  const [icons, setIcons] = useState([]);

  const calculateIconProperties = useCallback(() => {
    const baseSize = Math.min(width, height) / 8;
    const minDistance = baseSize * 1.5;
    return { baseSize, minDistance };
  }, [width, height]);

  const generateRandomPosition = useCallback(
    (existingPositions, baseSize, minDistance) => {
      let position;
      let isValid = false;

      while (!isValid) {
        const top = Math.random() * (height - baseSize);
        const left = Math.random() * (width - baseSize);

        position = { top, left };

        isValid = existingPositions.every(
          (pos) =>
            Math.sqrt((pos.top - top) ** 2 + (pos.left - left) ** 2) >
            minDistance
        );
      }

      return position;
    },
    [width, height]
  );

  const generateIcons = useCallback(() => {
    if (width === 0 || height === 0) return [];

    const icons = [
      HtmlIcon,
      CssIcon,
      JsIcon,
      ReactIcon,
      MaterialUiIcon,
      TailwindIcon,
      PlaywrightIcon,
      ViteIcon,
      WebpackIcon,
      JavaIcon,
      MySqlIcon,
      PostgresqlIcon,
      Burpsuite,
      Postman,
    ];

    const { baseSize, minDistance } = calculateIconProperties();

    const positions = [];
    const frontEndIcons = icons.map((Icon) => {
      const { top, left } = generateRandomPosition(
        positions,
        baseSize,
        minDistance
      );
      positions.push({ top, left });

      console.log(baseSize);

      return {
        Icon,
        id: nanoid(),
        rotate: Math.random() * 60 - 30,
        top: `${top}px`,
        left: `${left}px`,
        size: `${baseSize}px`,
      };
    });

    return frontEndIcons;
  }, [calculateIconProperties, generateRandomPosition, width, height]);

  useEffect(() => {
    setIcons(generateIcons());
  }, [generateIcons]);

  return (
    <AnimatedLettersContainer className="h-[60vh] md:h-[95vh] rounded-3xl border bg-[#f4e9e1] border-[#2835f8]">
      <section className="flex flex-col h-full items-center justify-center gap-5 p-10">
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

        <div className="w-full h-full">
          <div
            className="relative w-full h-full rounded-xl bg-cover bg-center bg-no-repeat"
            ref={setRefs}
          >
            <div className="absolute inset-0 z-10 rounded-lg">
              {icons.map((icon) => (
                <DragCard
                  key={icon.id}
                  containerRef={containerRef}
                  rotate={icon.rotate}
                  top={icon.top}
                  left={icon.left}
                >
                  <TiltCard>
                    <icon.Icon
                      style={{ width: icon.size, height: icon.size }}
                    />
                  </TiltCard>
                </DragCard>
              ))}
            </div>
          </div>
        </div>
      </section>
    </AnimatedLettersContainer>
  );
};

export default TechSection;
