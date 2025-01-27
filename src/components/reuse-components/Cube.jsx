import { motion } from "framer-motion";
import { useState } from "react";

const Cube = ({ size = 512, depth = 128 }) => {
  // 定义立方体的大小，默认大小为 256px
  const halfSize = size / 2; // translateZ 值为立方体边长的一半
  const halfDepth = depth / 2; // z 轴深度的一半

  const sizePx = `${size}px`; // 转换为 px 单位
  const depthPx = `${depth}px`; // 深度的 px 单位

  const [open, setOpen] = useState(false);

  return (
    <div
      className="relative "
      style={{
        width: sizePx,
        height: sizePx,
        perspective: `${4 * size}px`,
      }}
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <div
        className="absolute w-full h-full"
        style={{
          transformStyle: "preserve-3d",
          transform: `rotateX(-60deg) rotateY(0deg)`,
        }}
      >
        {/* Front */}
        <div
          className="absolute flex items-center justify-center bg-blue-400 text-white font-bold text-xl"
          style={{
            width: `${size}px`,
            height: `${depth}px`,
            transform: `rotateY(0deg) translateZ(${halfSize}px)`,
          }}
        >
          Front
        </div>

        {/* Back */}
        <div
          className="absolute  flex items-center justify-center bg-green-400 text-white font-bold text-xl"
          style={{
            width: `${size}px`,
            height: `${depth}px`,
            transform: `rotateY(180deg) translateZ(${halfSize}px)`,
          }}
        >
          Back
        </div>

        {/* Left */}
        <div
          className="absolute  flex items-center justify-center bg-red-400 text-white font-bold text-xl"
          style={{
            width: `${size}px`,
            height: `${depth}px`,
            transform: `rotateY(-90deg) translateZ(${halfSize}px)`,
          }}
        >
          Left
        </div>

        {/* Right */}
        <div
          className="absolute  flex items-center justify-center bg-yellow-400 text-white font-bold text-xl"
          style={{
            width: `${size}px`,
            height: `${depth}px`,
            transform: `rotateY(90deg) translateZ(${halfSize}px)`,
          }}
        >
          Right
        </div>

        {/* Top */}
        <motion.div
          className="absolute  flex items-center justify-center bg-purple-400 text-white font-bold text-xl"
          style={{
            width: `${size}px`,
            height: `${size}px`,
            transformOrigin: "top",
            rotateX: 90,
            translateZ: -halfSize,
          }}
          animate={{
            rotateX: open ? 135 : 90,
          }}
          transition={{
            duration: 0.5,
            ease: "easeInOut",
          }}
        >
          Top
        </motion.div>

        {/* Bottom */}
        <div
          className="absolute  flex items-center justify-center bg-pink-400 text-white font-bold text-xl"
          style={{
            width: `${size}px`,
            height: `${size}px`,
            transform: `rotateX(90deg) translateZ(${halfSize - depth}px)`,
          }}
        >
          Bottom
        </div>
      </div>
    </div>
  );
};

export default Cube;
