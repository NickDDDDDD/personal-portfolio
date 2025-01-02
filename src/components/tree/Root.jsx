import PropTypes from "prop-types";

const Root = ({ children }) => {
  return <button className="rounded-full">{children}</button>;
};

Root.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Root;
