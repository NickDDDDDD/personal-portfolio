import { useState } from "react";
import { motion } from "framer-motion";
import { twMerge } from "tailwind-merge";
import PropTypes from "prop-types";

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

export default DragCard;

DragCard.propTypes = {
  containerRef: PropTypes.object.isRequired,
  top: PropTypes.string.isRequired,
  left: PropTypes.string.isRequired,
  rotate: PropTypes.number.isRequired,
  className: PropTypes.string,
  children: PropTypes.node.isRequired,
};
