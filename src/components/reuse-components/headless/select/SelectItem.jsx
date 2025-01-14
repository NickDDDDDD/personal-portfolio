import React from "react";
import PropTypes from "prop-types";
import { SelectContext } from "./SelectContainer";
const SelectItem = ({ id, children, className, style }) => {
  const { currentSelect, setCurrentSelect } = React.useContext(SelectContext);

  const isSelected = currentSelect === id;

  return (
    <div
      id={id}
      className={`${className}`}
      style={style}
      onClick={() => setCurrentSelect(id)}
    >
      {children(isSelected)}
    </div>
  );
};
SelectItem.propTypes = {
  id: PropTypes.string.isRequired,
  children: PropTypes.func.isRequired,
  style: PropTypes.object,
  className: PropTypes.string,
};

export default SelectItem;
