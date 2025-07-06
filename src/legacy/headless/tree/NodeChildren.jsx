import PropTypes from "prop-types";

const NodeChildren = ({ children }) => {
  return <div>{children}</div>;
};

NodeChildren.displayName = "NodeChildren";

NodeChildren.propTypes = {
  children: PropTypes.node,
};

export default NodeChildren;
