import { motion } from "framer-motion";
import PropTypes from "prop-types";

const TranslateWrapper = ({ children, reverse }) => {
  return (
    <motion.div
      initial={{ translateX: reverse ? "-100%" : "0%" }}
      animate={{ translateX: reverse ? "0%" : "-100%" }}
      transition={{ duration: 75, repeat: Infinity, ease: "linear" }}
      className="flex"
    >
      {children}
    </motion.div>
  );
};
TranslateWrapper.propTypes = {
  children: PropTypes.node.isRequired,
  reverse: PropTypes.bool,
};

export default TranslateWrapper;
