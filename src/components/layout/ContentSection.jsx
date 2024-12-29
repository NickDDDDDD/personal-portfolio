import { useRef, useEffect, forwardRef } from "react";
import PropTypes from "prop-types";
import { useInView, motion, useScroll } from "framer-motion";

const ContentSection = forwardRef(
  (
    {
      id,
      bgColor,
      textColor,
      onInViewChange,
      onScrollProgress,
      contentContainerRef,
      children,
    },
    ref
  ) => {
    const innerRef = useRef(null);

    const isInView = useInView(innerRef, { margin: "-10% 0px -90% 0px" });

    const { scrollYProgress } = useScroll({
      target: innerRef,
      container: contentContainerRef,
      offset:
        id === 0 ? ["start start", "end start"] : ["start 10%", "end 10%"],
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

    return (
      <motion.section
        ref={innerRef}
        id={`section-${id}`}
        style={{ backgroundColor: bgColor, color: textColor }}
        className="min-h-[50vh] bg-black rounded-3xl overflow-hidden"
      >
        {children}
      </motion.section>
    );
  }
);

ContentSection.displayName = "ContentSection";
ContentSection.propTypes = {
  id: PropTypes.number.isRequired,
  bgColor: PropTypes.string.isRequired,
  textColor: PropTypes.string.isRequired,
  onInViewChange: PropTypes.func.isRequired,
  onScrollProgress: PropTypes.func,
  contentContainerRef: PropTypes.object,

  children: PropTypes.node.isRequired,
};

export default ContentSection;
