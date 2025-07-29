import { useRef, useEffect, forwardRef } from "react";
import PropTypes from "prop-types";
import { motion, useInView, useScroll } from "motion/react";
import ShiftLetters from "/src/components/typography/ShiftLetters.jsx";
import ResponsiveTypography from "../typography/ResponsiveTypography";

const ContentSection = forwardRef(
  (
    {
      id,
      index,
      name,
      bgColor,
      displayTitle = true,
      textColor,
      onInViewChange,
      onScrollProgress,
      contentContainerRef,
      children,
    },
    ref,
  ) => {
    const innerRef = useRef(null);

    const isInView = useInView(innerRef, { margin: "-10% 0px -90% 0px" });

    const { scrollYProgress } = useScroll({
      target: innerRef,
      container: contentContainerRef,
      offset: ["start 10%", "end 10%"],
      layoutEffect: false,
    });

    useEffect(() => {
      if (isInView) {
        onInViewChange(id);
      }
    }, [isInView, id, onInViewChange]);

    useEffect(() => {
      if (typeof ref === "function") {
        ref(innerRef.current);
        return () => ref(null);
      } else if (ref) {
        ref.current = innerRef.current;
      }
    }, [ref]);

    useEffect(() => {
      if (!isInView) {
        return;
      }

      const unsubscribe = scrollYProgress.on("change", (value) => {
        onScrollProgress(id, value);
      });

      return () => unsubscribe();
    }, [scrollYProgress, id, onScrollProgress, isInView]);

    const formattedIndex = index.toString().padStart(2, "0");

    return (
      <motion.section
        ref={innerRef}
        id={`section-${id}`}
        className="flex flex-col gap-5"
      >
        {displayTitle && (
          <div
            style={{ backgroundColor: bgColor, color: textColor }}
            className="h-[20dvh] rounded-2xl md:h-[50vh]"
          >
            <div className="flex h-full flex-col items-center justify-evenly">
              <ResponsiveTypography variant="h3">
                {formattedIndex}
              </ResponsiveTypography>
              <ShiftLetters
                text={name}
                fontVariant="h1"
                className="font-bold"
              />
            </div>
          </div>
        )}
        <div>{children}</div>
      </motion.section>
    );
  },
);

ContentSection.displayName = "ContentSection";
ContentSection.propTypes = {
  id: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  bgColor: PropTypes.string.isRequired,
  textColor: PropTypes.string.isRequired,
  onInViewChange: PropTypes.func.isRequired,
  displayTitle: PropTypes.bool.isRequired,
  onScrollProgress: PropTypes.func,
  contentContainerRef: PropTypes.object,

  children: PropTypes.node.isRequired,
};

export default ContentSection;
