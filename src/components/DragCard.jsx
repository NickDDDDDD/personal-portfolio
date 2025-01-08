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
      style={{
        top,
        left,
        rotate,
        zIndex,
      }}
      className={twMerge("drag-elements absolute  p-1 ", className)}
      drag
      dragConstraints={containerRef}
      // Uncomment below and remove dragElastic to remove movement after release
      //   dragMomentum={false}
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
  rotate: PropTypes.string.isRequired,
  className: PropTypes.string,
  children: PropTypes.node.isRequired,
};
