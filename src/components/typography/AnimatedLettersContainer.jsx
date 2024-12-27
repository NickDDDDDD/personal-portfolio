import PropTypes from "prop-types";

const AnimatedLettersContainer = ({ children, className = "" }) => (
  <div className={`relative overflow-hidden h-screen  w-full ${className}`}>
    <div className="flex flex-col justify-center items-center absolute inset-0 gap-[10em]">
      {children}
    </div>
  </div>
);

AnimatedLettersContainer.propTypes = {
  children: PropTypes.node,
  backgroundColor: PropTypes.string,
  className: PropTypes.string,
};

export default AnimatedLettersContainer;
