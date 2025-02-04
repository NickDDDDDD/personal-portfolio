import { useRef, useState } from "react";
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useSpring,
} from "framer-motion";
import PropTypes from "prop-types";
import { twMerge } from "tailwind-merge";

const Toolbox = () => {
  const [isRotated, setIsRotated] = useState(false);
  const springTransition = { type: "spring", stiffness: 100, damping: 10 };
  function onClick() {
    setIsRotated(!isRotated);
  }

  return (
    <div
      className="flex items-center justify-center h-[60vh] md:h-[95vh] "
      style={{ perspective: 5000 }}
    >
      <TiltCard className="w-[50%] h-[50%] flex" onClick={onClick}>
        <div
          className=" relative w-full h-full rounded-xl bg-red-300"
          style={{ transformStyle: "preserve-3d" }}
        >
          <div
            className=" w-full h-full rounded-xl z-0 "
            style={{
              transform: "translateZ(150px)",
              transformStyle: "preserve-3d",
            }}
          >
            <div className="absolute inset-0 flex flex-col justify-between z-20 ">
              <motion.div
                className="w-full h-[50%] bg-gray-400 rounded-xl "
                animate={{ rotateX: isRotated ? 160 : 0 }}
                transition={springTransition}
                style={{
                  transformStyle: "preserve-3d",
                  transformOrigin: "top",
                }}
              />
              <motion.div
                className="w-full h-[50%] bg-gray-400  rounded-xl"
                animate={{ rotateX: isRotated ? -160 : 0 }}
                transition={springTransition}
                style={{
                  transformStyle: "preserve-3d",
                  transformOrigin: "bottom",
                }}
              />
            </div>
            <div className="absolute inset-0 flex flex-row justify-between z-10 ">
              <motion.div
                className="w-[30%] h-full bg-gray-500 rounded-xl"
                animate={{ rotateY: isRotated ? -160 : 0 }}
                transition={springTransition}
                style={{
                  transformStyle: "preserve-3d",
                  transformOrigin: "left",
                }}
              />
              <motion.div
                className="w-[30%] h-full bg-gray-500 rounded-xl"
                animate={{ rotateY: isRotated ? 160 : 0 }}
                transition={springTransition}
                style={{
                  transformStyle: "preserve-3d",
                  transformOrigin: "right",
                }}
              />
            </div>
          </div>
        </div>
      </TiltCard>
    </div>
  );
};

const TiltCard = ({ children, className, onClick }) => {
  const ROTATION_RANGE = 32.5;
  const HALF_ROTATION_RANGE = 32.5 / 2;

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
      onClick={onClick}
      style={{
        transformStyle: "preserve-3d",
        transform,
      }}
      className={twMerge(
        "relative rounded-lg w-full h-full bg-gray-400",
        className
      )}
    >
      {children}
    </motion.div>
  );
};
TiltCard.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  onClick: PropTypes.func,
};

export default Toolbox;
