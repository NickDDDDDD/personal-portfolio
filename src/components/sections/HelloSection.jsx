import { motion, useTransform, motionValue } from "framer-motion";
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
  const scrollYProgress = motionValue(scrollYProgressValue);

  const backgroundTransform = useTransform(
    scrollYProgress,
    [0, 1],
    ["0%", "60%"]
  );
  const mountainsTransform = useTransform(
    scrollYProgress,
    [0, 1],
    ["0%", "50%"]
  );
  const jungle1Transform = useTransform(scrollYProgress, [0, 1], ["3%", "40%"]);
  const jungle2Transform = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const jungle3Transform = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const jungle4Transform = useTransform(scrollYProgress, [0, 1], ["0%", "10%"]);
  const jungle5Transform = useTransform(scrollYProgress, [0, 1], ["0%", "0%"]);
  const manOnMountainTransform = useTransform(
    scrollYProgress,
    [0, 1],
    ["10%", "10%"]
  );
  const overlayTransform = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <div className="relative aspect-[4/3] md:aspect-[16/9] overflow-hidden">
      {/* Background Image */}
      <motion.div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url(${backgroundImage})`,
          translateY: backgroundTransform,
        }}
      />

      {/* Mountains */}
      <motion.div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url(${mountains})`,
          translateY: mountainsTransform,
        }}
      />

      {/* Jungle Layers */}
      <motion.div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url(${jungle1})`,
          translateY: jungle1Transform,
        }}
      />
      <motion.div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url(${jungle2})`,
          translateY: jungle2Transform,
        }}
      />
      <motion.div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url(${jungle3})`,
          translateY: jungle3Transform,
        }}
      />
      <motion.div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url(${jungle4})`,
          translateY: jungle4Transform,
        }}
      />
      <motion.div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url(${jungle5})`,
          translateY: jungle5Transform,
        }}
      />

      {/* Man On Mountain */}
      <motion.div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url(${manOnMountain})`,
          translateY: manOnMountainTransform,
        }}
      />

      {/* Overlay Mask */}
      <motion.div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to top, rgba(0, 0, 0, 1), rgba(0, 0, 0, 0.5))",
          opacity: overlayTransform,
        }}
      />
    </div>
  );
};
HelloSection.propTypes = {
  scrollYProgressValue: PropTypes.number.isRequired,
};

export default HelloSection;
