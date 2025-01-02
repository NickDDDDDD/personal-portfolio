import PropTypes from "prop-types";

const NodeContent = ({ children, handleClick, className }) => {
  return (
    <button onClick={handleClick} className={`${className}`}>
      {children}
    </button>
  );
};

NodeContent.displayName = "NodeContent";

NodeContent.propTypes = {
  children: PropTypes.node.isRequired,
  handleClick: PropTypes.func.isRequired,
  className: PropTypes.string,
};

export default NodeContent;
