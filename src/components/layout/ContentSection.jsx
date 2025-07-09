import { useRef, useEffect, forwardRef } from "react";
import PropTypes from "prop-types";
import { useInView, motion, useScroll } from "framer-motion";
import ShiftLetters from "/src/components/typography/ShiftLetters.jsx";
import ResponsiveTypography from "../typography/ResponsiveTypography";
import AnimatedLettersContainer from "/src/components/typography/AnimatedLettersContainer.jsx";

const ContentSection = forwardRef(
  (
    {
      id,
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

    const formattedId = id.toString().padStart(2, "0");

    return (
      <motion.section
        ref={innerRef}
        id={`section-${id}`}
        className="flex flex-col gap-5"
      >
        {displayTitle && (
          <AnimatedLettersContainer
            style={{ backgroundColor: bgColor, color: textColor }}
            className="h-[20dvh] overflow-hidden rounded-2xl md:h-[50vh]"
          >
            <div className="flex h-full flex-col items-center justify-evenly">
              <ResponsiveTypography text={formattedId} variant="h3">
                {formattedId}
              </ResponsiveTypography>
              <ShiftLetters
                text={name}
                fontVariant="h1"
                className="font-bold"
              />
            </div>
          </AnimatedLettersContainer>
        )}
        <div>{children}</div>
      </motion.section>
    );
  },
);

ContentSection.displayName = "ContentSection";
ContentSection.propTypes = {
  id: PropTypes.number.isRequired,
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
