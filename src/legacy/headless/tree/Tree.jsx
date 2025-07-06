import PropTypes from "prop-types";
import { createContext, useState, Children } from "react";

const TreeContext = createContext();

const Tree = ({ children }) => {
  const [currentNode, setCurrentNode] = useState(null);

  function parseTreeData(children, parentId = null) {
    const treeData = [];

    if (!children) return treeData;

    Children.forEach(children, (child) => {
      if (child?.type?.displayName === "Node") {
        const { id } = child.props;

        const childNodes = Children.toArray(child.props.children).find(
          (c) => c.type?.displayName === "NodeChildren"
        );

        treeData.push({
          id,
          parent: parentId,
          children: parseTreeData(childNodes?.props?.children, id),
        });
      }
    });

    return treeData;
  }

  const treeData = parseTreeData(children);

  function getNodeData(nodeId) {
    function findNode(tree, nodeId) {
      for (const node of tree) {
        if (node.id === nodeId) return node;
        const found = findNode(node.children, nodeId);
        if (found) return found;
      }
      return null;
    }

    const currentNodeData = findNode(treeData, nodeId);
    const parentNode = treeData.find(
      (node) => node.id === currentNodeData?.parent
    );
    const childrenNodes = currentNodeData ? currentNodeData.children : [];

    return {
      currentNodeId: nodeId,
      parentNode,
      childrenNodes,
    };
  }

  console.log(treeData);
  console.log(currentNode ? getNodeData(currentNode) : "No node selected");

  return (
    <TreeContext.Provider
      value={{ currentNode, treeData, setCurrentNode, getNodeData }}
    >
      <div>{children}</div>
    </TreeContext.Provider>
  );
};

Tree.propTypes = {
  children: PropTypes.node,
};

export default Tree;
export { TreeContext };
