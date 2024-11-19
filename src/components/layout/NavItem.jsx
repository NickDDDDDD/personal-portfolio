import { forwardRef } from "react";
import PropTypes from "prop-types";

const NavItem = forwardRef(({ id, name, isExpanded, onExpand }, ref) => {
  const formattedId = id.toString().padStart(2, "0");

  const handleClick = () => {
    onExpand(id);
  };

  return (
    <button
      ref={ref}
      onClick={handleClick}
      className={`flex flex-col min-h-28 p-4 justify-between items-start rounded-3xl bg-green-400 transition-all duration-300 ${
        isExpanded ? "h-96" : "h-28"
      }`}
    >
      <span>{formattedId}</span>
      <span>{name}</span>
    </button>
  );
});

NavItem.propTypes = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  isExpanded: PropTypes.bool.isRequired,
  onExpand: PropTypes.func.isRequired,
};
NavItem.displayName = "NavItem";

export default NavItem;
