import { TechSectionContent } from "/src/utils/content";

import TechIconCard from "../components/TechIconCard.jsx";
import ShakeOnEnterDiv from "../components/ShakeOnEnterDiv.jsx";
import { nanoid } from "nanoid";
import { useState, useLayoutEffect, useCallback, useRef } from "react";
import { useMeasure } from "react-use";
import { motion } from "framer-motion";
import ResponsiveTypography from "../components/typography/ResponsiveTypography.jsx";
import ShiftLetters from "../components/typography/ShiftLetters.jsx";
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

  const baseSize = Math.max(width, height) / 15;
  const minDistance = baseSize * 1.5;

  const setRefs = (node) => {
    containerRef.current = node;
    measureRef(node);
  };

  const generateRandomPosition = useCallback(
    (existingPositions) => {
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
            minDistance,
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
    [baseSize, height, minDistance, width],
  );

  const generateIcons = useCallback(() => {
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

    const positions = [];
    const iconObjs = icons.map((Icon) => {
      const { top, left } = generateRandomPosition(positions);
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

    return iconObjs;
  }, [baseSize, generateRandomPosition]);

  const shuffle = useCallback(() => {
    console.log("Shuffling");
    setIconObjs((prevIcons) => {
      const positions = [];
      const updatedIcons = prevIcons.map((icon) => {
        let bestPosition = null;
        let smallestDistance = Infinity;

        for (let i = 0; i < 100; i++) {
          const { top, left } = generateRandomPosition(
            positions,
            baseSize,
            minDistance,
          );

          const distance = Math.sqrt(
            Math.pow(parseFloat(icon.top) - top, 2) +
              Math.pow(parseFloat(icon.left) - left, 2),
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
          minDistance,
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
  }, [baseSize, minDistance, generateRandomPosition]);

  useLayoutEffect(() => {
    if (width > 0 && height > 0) {
      setIconObjs(generateIcons());
    }
  }, [generateIcons, width, height]);

  console.log("TechSection render");

  return (
    <section className="flex h-full w-full flex-col items-center justify-center gap-5 rounded-xl border-2 border-slate-500 p-4 md:p-10">
      <ResponsiveTypography variant="h3" className="text-gray-800">
        What&apos;s in my
      </ResponsiveTypography>
      <ShiftLetters
        text="toolbox"
        fontVariant="h2"
        className="font-bold text-slate-500"
      />
      <div className="flex h-full w-full items-center justify-center">
        <ShakeOnEnterDiv
          className="flex aspect-[4/3] w-[80vw] items-center justify-center rounded-2xl border-4 bg-gradient-to-br from-slate-400 to-slate-500 p-3 md:w-[50vw]"
          shakeBehaviour={shuffle}
        >
          <div className="relative h-[80%] w-[80%]">
            <div>
              <motion.div className="absolute inset-0" ref={setRefs}>
                {iconObjs.map((iconObj) => (
                  <TechIconCard
                    key={iconObj.id}
                    containerRef={containerRef}
                    rotate={iconObj.rotate}
                    top={iconObj.top}
                    left={iconObj.left}
                  >
                    <iconObj.Icon
                      style={{ width: iconObj.size, height: iconObj.size }}
                    />
                  </TechIconCard>
                ))}
              </motion.div>
            </div>
          </div>
        </ShakeOnEnterDiv>
      </div>
    </section>
  );
};

export default TechSection;
