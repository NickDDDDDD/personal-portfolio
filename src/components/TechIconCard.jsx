import { twMerge } from "tailwind-merge";
import PropTypes from "prop-types";
import { useRef, useState } from "react";
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useSpring,
} from "framer-motion";
const TechIconCard = ({
  containerRef,
  top,
  left,
  rotate,
  className,
  children,
}) => {
  return (
    <DragCard
      containerRef={containerRef}
      rotate={rotate}
      top={top}
      left={left}
      className={className}
    >
      <TiltCard>{children}</TiltCard>
    </DragCard>
  );
};

TechIconCard.propTypes = {
  containerRef: PropTypes.object.isRequired,
  top: PropTypes.string.isRequired,
  left: PropTypes.string.isRequired,
  rotate: PropTypes.number.isRequired,
  className: PropTypes.string,
  children: PropTypes.node.isRequired,
};

const DragCard = ({ containerRef, top, left, rotate, className, children }) => {
  const [zIndex, setZIndex] = useState(0);

  const updateZIndex = () => {
    const els = document.querySelectorAll(".drag-elements");

    let maxZIndex = -Infinity;

    els.forEach((el) => {
      let zIndex = parseInt(
        window.getComputedStyle(el).getPropertyValue("z-index")
      );

      if (!isNaN(zIndex) && zIndex > maxZIndex) {
        maxZIndex = zIndex;
      }
    });

    setZIndex(maxZIndex + 1);
  };

  return (
    <motion.div
      onMouseDown={updateZIndex}
      animate={{
        top,
        left,
        rotate,
        zIndex,
      }}
      transition={{ duration: 0.6 }}
      style={{
        top,
        left,
        zIndex,
        willChange: "transform",
        transform: ` rotate(${rotate}deg)`,
      }}
      className={twMerge("drag-elements absolute", className)}
      drag
      dragConstraints={containerRef}
      dragMomentum={false}
      dragElastic={0.65}
    >
      {children}
    </motion.div>
  );
};

DragCard.propTypes = {
  containerRef: PropTypes.object.isRequired,
  top: PropTypes.string.isRequired,
  left: PropTypes.string.isRequired,
  rotate: PropTypes.number.isRequired,
  className: PropTypes.string,
  children: PropTypes.node.isRequired,
};

const TiltCard = ({ children, className, onClick }) => {
  const ROTATION_RANGE = 32.5;
  const HALF_ROTATION_RANGE = 32.5 / 2;

  const ref = useRef(null);
  const [hover, setHover] = useState(false);

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
    setHover(false);
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseEnter={() => setHover(true)}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      style={{
        transformStyle: "preserve-3d",
        transform,
      }}
      className={twMerge(
        "relative rounded-sm p-1 md:rounded-xl md:p-2 bg-stone-50 shadow-md w-full h-full",
        className
      )}
    >
      <motion.div
        transition={{
          duration: 0.3,
          ease: "easeInOut",
        }}
        style={{
          translateZ: 75,
          transformStyle: "preserve-3d",
          perspective: 5000,
        }}
        animate={{
          scale: hover ? 1.1 : 1,
          filter: hover
            ? "drop-shadow(0px 6px 6px rgba(0, 0, 0, 0.6))"
            : "drop-shadow(0px 3px 3px rgba(0, 0, 0, 0.3))",
        }}
        className="w-full h-full"
      >
        {children}
      </motion.div>
    </motion.div>
  );
};
TiltCard.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  onClick: PropTypes.func,
};

export default TechIconCard;
