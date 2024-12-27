import { forwardRef } from "react";
import PropTypes from "prop-types";

const NavItem = forwardRef(
  ({ id, name, bgColor, textColor, isExpanded, onExpand, progress }, ref) => {
    const formattedId = id.toString().padStart(2, "0");

    const handleClick = () => {
      onExpand(id);
    };

    const effectiveProgress = Math.max(progress, 0.1);

    return (
      <button
        ref={ref}
        onClick={handleClick}
        style={{ backgroundColor: bgColor, color: textColor }}
        className={`relative flex flex-col min-h-28 p-4 justify-between items-start rounded-3xl transition-all duration-300 ${
          isExpanded ? "h-96" : "h-28"
        }`}
      >
        <span className="text-sm font-normal">{formattedId}</span>
        <span className="text-lg font-medium">{name}</span>
        {isExpanded && (
          <div
            className="absolute  right-2 size-2 bg-[#f4e9e1] rounded-full"
            style={{
              top: `${effectiveProgress * 100}%`,
              transition: "top 0.05s ease-in-out",
            }}
          >
            {console.log(`NavItem ${id} - Progress:`, progress)}
          </div>
        )}
      </button>
    );
  }
);

NavItem.propTypes = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  isExpanded: PropTypes.bool.isRequired,
  onExpand: PropTypes.func.isRequired,
  progress: PropTypes.number.isRequired,
  textColor: PropTypes.string.isRequired,
  bgColor: PropTypes.string.isRequired,
};
NavItem.displayName = "NavItem";

export default NavItem;
