import { motion } from "framer-motion";
import PropTypes from "prop-types";
import { useMediaQuery } from "react-responsive";
import ResponsiveTypography from "../components/typography/ResponsiveTypography";
import { twMerge } from "tailwind-merge";

// Function to generate array of letter objects from a string
const generateLetters = (string) => {
  return Array.from(string).map((char) => ({
    char: char === " " ? "\u00A0" : char, // Non-breaking space for spaces
  }));
};

const AnimatedLetters = ({
  inputString,
  fontVariant = "h2",
  className = "",
  shootFromDirection = "left",
  xEnd = "0vw",
  yEnd = "0vh",
  ease = "easeInOut",
  ...props
}) => {
  const letters = generateLetters(inputString);
  const isMobile = useMediaQuery({ query: "(max-width: 767px)" });

  const getInitialPosition = () => {
    switch (shootFromDirection) {
      case "right":
        return { x: "10vw", y: yEnd };
      case "top":
        return { x: xEnd, y: "-10vh" };
      case "bottom":
        return { x: xEnd, y: "10vh" };
      case "left":
      default:
        return { x: "-10vw", y: yEnd };
    }
  };

  const initialPosition = getInitialPosition();

  const getMotionProps = (index) => {
    if (isMobile) {
      return {
        initial: { opacity: 1, x: xEnd, y: yEnd },
        whileInView: {},
        transition: { duration: 0 },
      };
    } else {
      return {
        initial: { opacity: 0, x: initialPosition.x, y: initialPosition.y },
        whileInView: { opacity: 1, x: xEnd, y: yEnd },
        transition: {
          duration: 0.5,
          ease: ease,
          delay: index * 0.05,
        },
      };
    }
  };

  return (
    <div className={twMerge("flex flex-wrap", className)}>
      {letters.map((letter, index) => {
        const motionProps = getMotionProps(index);
        return (
          <motion.div
            key={index}
            initial={motionProps.initial}
            whileInView={motionProps.whileInView}
            transition={motionProps.transition}
            viewport={{
              amount: 1,
              once: true,
            }}
          >
            <ResponsiveTypography
              variant={fontVariant}
              className={className}
              {...props}
            >
              {letter.char}
            </ResponsiveTypography>
          </motion.div>
        );
      })}
    </div>
  );
};

// Define propTypes for better clarity and type checking
AnimatedLetters.propTypes = {
  inputString: PropTypes.string.isRequired,
  fontVariant: PropTypes.string,
  className: PropTypes.string,
  shootFromDirection: PropTypes.oneOf(["left", "right", "top", "bottom"]),
  xEnd: PropTypes.string,
  yEnd: PropTypes.string,
  ease: PropTypes.string,
};

export default AnimatedLetters;
