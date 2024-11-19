import { useRef, useEffect, forwardRef } from "react";
import PropTypes from "prop-types";
import { useInView, motion, useScroll } from "framer-motion";

const ContentSection = forwardRef(
  (
    { id, onInViewChange, onScrollProgress, contentContainerRef, children },
    ref
  ) => {
    const innerRef = useRef(null);

    const isInView = useInView(innerRef, { margin: "-40% 0px -60% 0px" });

    useEffect(() => {
      if (isInView) {
        onInViewChange(id);
      }
    }, [isInView, id, onInViewChange]);

    useEffect(() => {
      if (typeof ref === "function") {
        ref(innerRef.current);
      } else if (ref) {
        ref.current = innerRef.current;
      }
    }, [ref]);

    const { scrollYProgress } = useScroll({
      target: innerRef,
      container: contentContainerRef,
      offset: ["start end", "end start"],
      layoutEffect: false,
    });

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
        className="min-h-[300vh] bg-blue-300 rounded-3xl p-5"
      >
        {children}
      </motion.section>
    );
  }
);

ContentSection.displayName = "ContentSection";
ContentSection.propTypes = {
  id: PropTypes.number.isRequired,
  onInViewChange: PropTypes.func.isRequired,
  onScrollProgress: PropTypes.func,
  contentContainerRef: PropTypes.object,

  children: PropTypes.node.isRequired,
};

export default ContentSection;
