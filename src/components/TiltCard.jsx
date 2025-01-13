import { useRef } from "react";
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useSpring,
} from "framer-motion";
import PropTypes from "prop-types";

const ROTATION_RANGE = 32.5;
const HALF_ROTATION_RANGE = 32.5 / 2;

const TiltCard = ({ children }) => {
  const ref = useRef(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const xSpring = useSpring(x);
  const ySpring = useSpring(y);

  const transform = useMotionTemplate`rotateX(${xSpring}deg) rotateY(${ySpring}deg)`;

  const handleMouseMove = (e) => {
    if (!ref.current) return [0, 0];

    const rect = ref.current.getBoundingClientRect();

    const width = rect.width;
    const height = rect.height;

    const mouseX = (e.clientX - rect.left) * ROTATION_RANGE;
    const mouseY = (e.clientY - rect.top) * ROTATION_RANGE;

    const rX = (mouseY / height - HALF_ROTATION_RANGE) * -1;
    const rY = mouseX / width - HALF_ROTATION_RANGE;

    x.set(rX);
    y.set(rY);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transformStyle: "preserve-3d",
        transform,
        display: "inline-block",
      }}
      className="rounded-sm p-1 md:rounded-xl md:p-2 bg-white shadow-lg"
    >
      <motion.div
        whileHover={{
          translateZ: 75,
          scale: 1.1,
          filter: "drop-shadow(0px 6px 6px rgba(0, 0, 0, 0.6))",
        }}
        transition={{
          duration: 0.3,
          ease: "easeInOut",
        }}
        style={{
          transformStyle: "preserve-3d",
          filter: "drop-shadow(0px 3px 3px rgba(0, 0, 0, 0.3))",
        }}
      >
        {children}
      </motion.div>
    </motion.div>
  );
};
TiltCard.propTypes = {
  children: PropTypes.node.isRequired,
};

export default TiltCard;
