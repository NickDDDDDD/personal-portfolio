import { motion, useInView } from "motion/react";
import { useEffect, useState, useRef } from "react";
import PropTypes from "prop-types";

const LETTER_DELAY = 0.025;
const BOX_FADE_DURATION = 0.125;

const FADE_DELAY = 5;
const MAIN_FADE_DURATION = 0.25;

const SWAP_DELAY_IN_MS = 5500;

const TypeText = ({ textString, className }) => {
  const [textIndex, setTextIndex] = useState(0);
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true });

  useEffect(() => {
    if (!isInView) return;

    setTextIndex((prev) => (prev + 1) % textString.length);
    console.log("setInterval");

    const intervalId = setInterval(() => {
      setTextIndex((prev) => (prev + 1) % textString.length);
    }, SWAP_DELAY_IN_MS);

    return () => clearInterval(intervalId);
  }, [textString.length, isInView]);

  return (
    <p ref={containerRef} className={className}>
      <span className="ml-3">
        {textString[textIndex].split("").map((l, i) => (
          <motion.span
            initial={{
              opacity: 1,
            }}
            animate={{
              opacity: 0,
            }}
            transition={{
              delay: FADE_DELAY,
              duration: MAIN_FADE_DURATION,
              ease: "easeInOut",
            }}
            key={`${textIndex}-${i}`}
            className="relative"
          >
            <motion.span
              initial={{
                opacity: 0,
              }}
              animate={{
                opacity: 1,
              }}
              transition={{
                delay: i * LETTER_DELAY,
                duration: 0,
              }}
            >
              {l}
            </motion.span>
            <motion.span
              initial={{
                opacity: 0,
              }}
              animate={{
                opacity: [0, 1, 0],
              }}
              transition={{
                delay: i * LETTER_DELAY,
                times: [0, 0.1, 1],
                duration: BOX_FADE_DURATION,
                ease: "easeInOut",
              }}
              className="absolute bottom-[3px] left-[1px] right-0 top-[3px] bg-neutral-950"
            />
          </motion.span>
        ))}
      </span>
    </p>
  );
};

export default TypeText;

TypeText.propTypes = {
  textString: PropTypes.arrayOf(PropTypes.string).isRequired,
  className: PropTypes.string,
};
