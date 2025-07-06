import PropTypes from "prop-types";
import { useContext, Children, cloneElement } from "react";
import { TreeContext } from "./Tree";

const Node = ({ children, id }) => {
  const { setCurrentNode } = useContext(TreeContext);

  const handleClick = () => {
    setCurrentNode(id);
  };

  const parsedChildren = Children.map(children, (child) => {
    if (child.type.displayName === "NodeContent") {
      return cloneElement(child, { handleClick });
    }
    return child;
  });

  return <div>{parsedChildren}</div>;
};

export default Node;

Node.displayName = "Node";

Node.propTypes = {
  children: PropTypes.node,
  id: PropTypes.string.isRequired,
};
