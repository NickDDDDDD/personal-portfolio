import PropTypes from "prop-types";
import React from "react";

const SelectContext = React.createContext();

const SelectContainer = ({ children, style, className }) => {
  const [currentSelect, setCurrentSelect] = React.useState(null);

  return (
    <SelectContext.Provider value={{ currentSelect, setCurrentSelect }}>
      <div style={style} className={`${className}`}>
        {children}
      </div>
    </SelectContext.Provider>
  );
};

SelectContainer.propTypes = {
  children: PropTypes.node.isRequired,
  style: PropTypes.object,
  className: PropTypes.string,
};

export default SelectContainer;
export { SelectContext };
