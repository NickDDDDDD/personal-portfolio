import PropTypes from "prop-types";

const AnimatedLettersContainer = ({ children, className = "", style = {} }) => (
  <div
    className={`relative overflow-hidden min-h-[30dvh]   w-full ${className}`}
    style={style}
  >
    <div className="absolute inset-0 ">{children}</div>
  </div>
);

AnimatedLettersContainer.propTypes = {
  children: PropTypes.node,
  backgroundColor: PropTypes.string,
  className: PropTypes.string,
  style: PropTypes.object,
};

export default AnimatedLettersContainer;
