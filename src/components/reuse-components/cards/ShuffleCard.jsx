import { motion } from "framer-motion";
import { useRef } from "react";
import PropTypes from "prop-types";

const ShuffleCard = ({
  children,
  handleShuffle,
  position,
  totalCardsCount,
}) => {
  const mousePosRef = useRef(0);

  const onDragStart = (e) => {
    mousePosRef.current = e.clientX;
  };

  const onDragEnd = (e) => {
    const diff = mousePosRef.current - e.clientX;

    if (diff > 150) {
      handleShuffle();
    }

    mousePosRef.current = 0;
  };

  const rotateDeg = 6;
  const center = Math.floor(totalCardsCount / 2);
  const x = `${position * 33}%`;
  const rotateZ = `${position * rotateDeg}deg`;

  const zIndex = `${5 - position}`;

  const draggable = position === 0;

  return (
    <motion.div
      style={{
        zIndex,
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
      className={`absolute left-0 top-0 grid w-full aspect-[7/10] select-none place-content-center space-y-6 rounded-2xl border-2 border-slate-700 bg-slate-800/20 p-6 shadow-xl backdrop-blur-md ${
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
  totalCardsCount: PropTypes.number.isRequired,
};

export default ShuffleCard;
