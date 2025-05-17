import { motion } from "framer-motion";
import PropTypes from "prop-types";
import ResponsiveTypography from "./ResponsiveTypography";
import { useEffect, useRef, useState } from "react";
const generateLetters = (string) => {
  return Array.from(string).map((char) => {
    const isDescender = /[gjpqyQJ,;]/.test(char);

    return {
      char: char === " " ? "\u00A0" : char, // Non-breaking space for spaces
      isDescender: isDescender,
    };
  });
};

const ShiftLetters = ({ text, fontVariant, className }) => {
  return (
    <motion.div
      transition={{
        staggerChildren: 0.035,
      }}
      whileInView="inView"
      whileHover="hover"
      viewport={{
        amount: 1,
        once: true,
      }}
      className="cursor-pointer group "
    >
      {generateLetters(text).map((item, i) => (
        <ShiftLetter
          fontVariant={fontVariant}
          letter={item.char}
          isDescender={item.isDescender}
          key={i}
          className={className}
        />
      ))}
    </motion.div>
  );
};

const ShiftLetter = ({ letter, fontVariant, className, isDescender }) => {
  const [height, setHeight] = useState(36);
  const containerRef = useRef(null);

  useEffect(() => {
    //TODO:NOW ONLY WORKING AFTER REFRESH
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      const measuredHeight = rect.height;

      if (measuredHeight > 0) {
        const adjustedHeight = isDescender
          ? measuredHeight * 1.2
          : measuredHeight * 1;
        setHeight(adjustedHeight);
      }
    }
  }, [fontVariant, className, isDescender]);
  return (
    <div
      className="inline-block overflow-hidden"
      style={{
        height: `${height}px`,
        verticalAlign: "top",
      }}
    >
      <motion.span
        className="flex flex-col"
        style={{
          y: "0%",
          gap: "1em",
        }}
        variants={{
          inView: {
            y: "-33.33%",
          },
          hover: {
            y: "-66.67%",
          },
        }}
        transition={{
          duration: 0.3,
          ease: "easeInOut",
        }}
      >
        <div ref={containerRef}>
          <ResponsiveTypography className={className} variant={fontVariant}>
            {letter}
          </ResponsiveTypography>
        </div>
        <div>
          <ResponsiveTypography className={className} variant={fontVariant}>
            {letter}
          </ResponsiveTypography>
        </div>
        <div>
          <ResponsiveTypography className={className} variant={fontVariant}>
            {letter}
          </ResponsiveTypography>
        </div>
      </motion.span>
    </div>
  );
};
ShiftLetters.propTypes = {
  text: PropTypes.string.isRequired,
  className: PropTypes.string,
  fontVariant: PropTypes.string,
  isDescender: PropTypes.bool,
};
ShiftLetter.propTypes = {
  letter: PropTypes.string.isRequired,
  className: PropTypes.string,
  fontVariant: PropTypes.string,
  isDescender: PropTypes.bool,
};
export default ShiftLetters;
