import { TechSectionContent } from "/src/utils/content";
import { useRef } from "react";
import AnimatedLetters from "../typography/AnimatedLetters.jsx";
import AnimatedLettersContainer from "../typography/AnimatedLettersContainer.jsx";
import TiltCard from "../TiltCard";
import DragCard from "../DragCard";
import ShakeOnEnterDiv from "./ShakeOnEnterDiv.jsx";
import { nanoid } from "nanoid";
import { useState, useEffect, useCallback } from "react";
import { useMeasure } from "react-use";
import { motion } from "framer-motion";

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
  const [iconObjs, setIconObjs] = useState([]);

  const setRefs = (node) => {
    containerRef.current = node;
    measureRef(node);
  };

  const calculateIconProperties = useCallback(() => {
    console.log("Calculating icon properties");
    const baseSize = Math.max(width, height) / 15;
    const minDistance = baseSize * 1.5;
    return { baseSize, minDistance };
  }, [width, height]);

  const generateRandomPosition = useCallback(
    (existingPositions, baseSize, minDistance) => {
      let position;
      let isValid = false;
      const maxAttempts = 1000;
      let attempts = 0;

      while (!isValid && attempts < maxAttempts) {
        const top = Math.random() * (height - baseSize);
        const left = Math.random() * (width - baseSize);

        position = { top, left };

        isValid = existingPositions.every(
          (pos) =>
            Math.sqrt((pos.top - top) ** 2 + (pos.left - left) ** 2) >
            minDistance
        );

        attempts++;
      }

      if (!isValid) {
        console.warn("Unable to find a valid position after maxAttempts.");
        position = {
          top: Math.random() * (height - baseSize),
          left: Math.random() * (width - baseSize),
        };
      }

      return position;
    },
    [width, height]
  );

  const generateIcons = useCallback(() => {
    console.log("try generating icons");
    if (width === 0 || height === 0) return [];
    console.log("start generating icons");

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

  const shuffle = useCallback(() => {
    console.log("Shuffling");
    setIconObjs((prevIcons) => {
      const { baseSize, minDistance } = calculateIconProperties();

      const positions = [];
      const updatedIcons = prevIcons.map((icon) => {
        let bestPosition = null;
        let smallestDistance = Infinity;

        for (let i = 0; i < 100; i++) {
          const { top, left } = generateRandomPosition(
            positions,
            baseSize,
            minDistance
          );

          const distance = Math.sqrt(
            Math.pow(parseFloat(icon.top) - top, 2) +
              Math.pow(parseFloat(icon.left) - left, 2)
          );

          if (distance > 0 && distance < smallestDistance) {
            bestPosition = { top, left };
            smallestDistance = distance;
          }
        }

        if (bestPosition) {
          positions.push(bestPosition);
          return {
            ...icon,
            top: `${bestPosition.top}px`,
            left: `${bestPosition.left}px`,
            rotate: Math.random() * 60 - 30,
          };
        }

        const fallbackPosition = generateRandomPosition(
          positions,
          baseSize,
          minDistance
        );
        positions.push(fallbackPosition);
        return {
          ...icon,
          top: `${fallbackPosition.top}px`,
          left: `${fallbackPosition.left}px`,
          rotate: Math.random() * 60 - 30,
        };
      });

      return updatedIcons;
    });
  }, [calculateIconProperties, generateRandomPosition]);

  useEffect(() => {
    console.log("TechSection useEffect");
    setIconObjs((prev) => {
      const newIcons = generateIcons();
      if (JSON.stringify(prev) === JSON.stringify(newIcons)) {
        return prev;
      }
      return newIcons;
    });
  }, [generateIcons]);

  console.log("TechSection render");

  return (
    <AnimatedLettersContainer className="h-[60dvh] md:h-[95dvh] rounded-3xl border bg-stone-100 border-[#2835f8]">
      <section className="flex flex-col h-full items-center justify-center gap-5 p-10">
        <AnimatedLetters
          inputString="What's in my"
          fontVariant="h2"
          xEnd="0vw"
          easing="easeInOut"
          shootFromDirection="right"
          className="text-gray-800"
        />
        <AnimatedLetters
          inputString="toolbox"
          fontVariant="h1"
          xEnd="0vw"
          easing="easeInOut"
          shootFromDirection="right"
          className="text-[#2835f8] font-bold"
        />

        <div className="w-full h-full flex items-center justify-center">
          <ShakeOnEnterDiv
            className="relative w-[80%] h-[80%]  rounded-xl"
            style={{ outline: "1px solid #2835f8", outlineOffset: "3rem" }}
            shakeBehaviour={shuffle}
          >
            <motion.div className="absolute inset-0   " ref={setRefs}>
              {iconObjs.map((iconObj) => (
                <DragCard
                  key={iconObj.id}
                  iconId={iconObj.id}
                  containerRef={containerRef}
                  rotate={iconObj.rotate}
                  top={iconObj.top}
                  left={iconObj.left}
                >
                  <TiltCard>
                    <iconObj.Icon
                      style={{ width: iconObj.size, height: iconObj.size }}
                    />
                  </TiltCard>
                </DragCard>
              ))}
            </motion.div>
          </ShakeOnEnterDiv>
        </div>
      </section>
    </AnimatedLettersContainer>
  );
};

export default TechSection;
