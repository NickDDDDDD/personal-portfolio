import { motion, useAnimation } from "motion/react";
import PropTypes from "prop-types";
import { twMerge } from "tailwind-merge";
import { useRef } from "react";

const ShakeOnEnterDiv = ({ children, shakeBehaviour, className, style }) => {
  const controls = useAnimation();
  const hasShaken = useRef(false);

  const handleViewportEnter = () => {
    if (hasShaken.current) {
      return;
    }

    hasShaken.current = true;

    triggerShake();
  };

  const triggerShake = () => {
    console.log("shake ");
    controls.start({
      x: [0, -10, 10, -10, 0],

      transition: {
        duration: 0.6,
        ease: "easeInOut",
        repeat: 0,
      },
    });

    if (typeof shakeBehaviour === "function") {
      shakeBehaviour();
    }
  };

  return (
    <motion.div
      className={twMerge("", className)}
      style={{ willChange: "transform", ...style }}
      onViewportEnter={() => {
        handleViewportEnter();
      }}
      onDoubleClick={triggerShake}
      viewport={{
        amount: 1,
        once: true,
      }}
      animate={controls}
    >
      {children}
    </motion.div>
  );
};
ShakeOnEnterDiv.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  shakeBehaviour: PropTypes.func,
  clickBehaviour: PropTypes.func,
  style: PropTypes.object,
};

export default ShakeOnEnterDiv;
