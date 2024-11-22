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

  const backgroundTransform = useTransform(scrollYProgress, [0, 1], [0, 280]);
  const mountainsTransform = useTransform(scrollYProgress, [0, 1], [0, 240]);
  const jungle1Transform = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const jungle2Transform = useTransform(scrollYProgress, [0, 1], [0, 160]);
  const jungle3Transform = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const jungle4Transform = useTransform(scrollYProgress, [0, 1], [0, 80]);
  const jungle5Transform = useTransform(scrollYProgress, [0, 1], [0, 40]);
  const manOnMountainTransform = useTransform(
    scrollYProgress,
    [0, 1],
    [80, 80]
  );

  return (
    <div className="relative h-[80vh] overflow-hidden">
      {console.log("HelloSection scrollYProgressValue:", scrollYProgressValue)}
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
    </div>
  );
};
HelloSection.propTypes = {
  scrollYProgressValue: PropTypes.number.isRequired,
};

export default HelloSection;
