import PropTypes from "prop-types";

const Node = ({ children }) => {
  return <button className="rounded-full">{children}</button>;
};

export default Node;

Node.propTypes = {
  children: PropTypes.node.isRequired,
};
