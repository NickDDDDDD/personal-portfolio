import { motion } from "framer-motion";
import { useRef } from "react";
import PropTypes from "prop-types";

const ShuffleCard = ({ children, handleShuffle, position }) => {
  const mousePosRef = useRef(0);

  const onDragStart = (e) => {
    mousePosRef.current = e.clientX;
  };

  const onDragEnd = (e) => {
    const diff = mousePosRef.current - e.clientX;

    if (diff > 100) {
      handleShuffle();
    }

    mousePosRef.current = 0;
  };

  const rotateDeg = 6;
  const x = `${position * 33}%`;
  const rotateZ = `${position * rotateDeg}deg`;

  const zIndex = `${5 - position}`;

  const draggable = position === 0;

  return (
    <motion.div
      style={{
        zIndex,
        willChange: "transform",
      }}
      animate={{ rotate: rotateZ, x }}
      drag
      dragElastic={0.35}
      dragListener={draggable}
      dragConstraints={{
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
      }}
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
      transition={{
        duration: 0.35,
      }}
      className={`rounded-xl absolute inset-0  w-full aspect-[7/10] md:aspect-[4/3] select-none  border-2 border-zinc-700/50 bg-zinc-800/90 backdrop-blur-md  p-6 shadow-xl ${
        draggable ? "cursor-grab active:cursor-grabbing" : ""
      }`}
    >
      {children}
    </motion.div>
  );
};
ShuffleCard.propTypes = {
  children: PropTypes.node.isRequired,
  handleShuffle: PropTypes.func.isRequired,
  position: PropTypes.number.isRequired,
};

export default ShuffleCard;
