import { motion, useTransform } from "motion/react";
import PropTypes from "prop-types";

import { HeroSectionContentFirewatch } from "/src/utils/content";

const {
  backgroundImage,
  mountains,
  jungle1,
  jungle2,
  jungle3,
  jungle4,
  jungle5,
  manOnMountain,
} = HeroSectionContentFirewatch;

const HelloSection = ({ scrollYProgressValue }) => {
  console.log("HelloSection render", scrollYProgressValue);
  const backgroundTransform = useTransform(
    scrollYProgressValue,
    [0, 1],
    ["0%", "60%"],
  );
  const mountainsTransform = useTransform(
    scrollYProgressValue,
    [0, 1],
    ["0%", "50%"],
  );
  const jungle1Transform = useTransform(
    scrollYProgressValue,
    [0, 1],
    ["3%", "40%"],
  );
  const jungle2Transform = useTransform(
    scrollYProgressValue,
    [0, 1],
    ["0%", "30%"],
  );
  const jungle3Transform = useTransform(
    scrollYProgressValue,
    [0, 1],
    ["0%", "20%"],
  );
  const jungle4Transform = useTransform(
    scrollYProgressValue,
    [0, 1],
    ["0%", "10%"],
  );
  const jungle5Transform = useTransform(
    scrollYProgressValue,
    [0, 1],
    ["0%", "0%"],
  );
  const manOnMountainTransform = useTransform(
    scrollYProgressValue,
    [0, 1],
    ["10%", "10%"],
  );
  const overlayTransform = useTransform(scrollYProgressValue, [0, 1], [0, 1]);

  return (
    <div className="relative aspect-[4/3] overflow-clip rounded-2xl bg-[#ffaf1b] md:aspect-[16/9]">
      {/* Background Image */}
      <motion.div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url(${backgroundImage})`,
          translateY: backgroundTransform,
          willChange: "transform",
        }}
      />

      {/* Mountains */}
      <motion.div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url(${mountains})`,
          translateY: mountainsTransform,
          willChange: "transform",
        }}
      />

      {/* Jungle Layers */}
      <motion.div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url(${jungle1})`,
          translateY: jungle1Transform,
          willChange: "transform",
        }}
      />
      <motion.div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url(${jungle2})`,
          translateY: jungle2Transform,
          willChange: "transform",
        }}
      />
      <motion.div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url(${jungle3})`,
          translateY: jungle3Transform,
          willChange: "transform",
        }}
      />
      <motion.div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url(${jungle4})`,
          translateY: jungle4Transform,
          willChange: "transform",
        }}
      />
      <motion.div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url(${jungle5})`,
          translateY: jungle5Transform,
          willChange: "transform",
        }}
      />

      {/* Man On Mountain */}
      <motion.div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url(${manOnMountain})`,
          translateY: manOnMountainTransform,
          willChange: "transform",
        }}
      />

      {/* Overlay Mask */}
      <motion.div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to top, rgba(0, 0, 0, 1), rgba(0, 0, 0, 0.5))",
          opacity: overlayTransform,
          willChange: "opacity",
        }}
      />
    </div>
  );
};

HelloSection.propTypes = {
  scrollYProgressValue: PropTypes.object.isRequired,
};

export default HelloSection;
