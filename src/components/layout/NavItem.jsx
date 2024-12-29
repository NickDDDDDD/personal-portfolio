import { forwardRef } from "react";
import PropTypes from "prop-types";
import ResponsiveTypography from "../typography/ResponsiveTypography";
import { useMediaQuery } from "react-responsive";

const NavItem = forwardRef(
  ({ id, name, bgColor, textColor, isExpanded, onExpand, progress }, ref) => {
    const isMd = useMediaQuery({ query: "(min-width: 768px)" });
    const formattedId = id.toString().padStart(2, "0");

    const handleClick = () => {
      onExpand(id);
    };

    // const effectiveProgress = Math.max(progress, 0.1);

    return (
      <button
        ref={ref}
        onClick={handleClick}
        style={{ backgroundColor: bgColor, color: textColor }}
        className={`relative flex flex-col shrink-0 p-2 justify-between items-start min-h-15  rounded-xl md:rounded-3xl md:min-h-28 md:p-4 transition-all duration-300 ${
          isExpanded ? "w-[50vw] md:w-auto md:h-96" : "w-20 md:w-auto md:h-28"
        }`}
      >
        <ResponsiveTypography variant="overline">
          {formattedId}
        </ResponsiveTypography>
        <ResponsiveTypography variant="caption" className="font-semibold">
          {name}
        </ResponsiveTypography>

        {/* white dot */}
        {isExpanded && (
          <div
            className="absolute size-1  md:size-2 bg-[#f4e9e1] rounded-full"
            style={{
              top: isMd ? `calc(${progress * 100}% + 20px)` : "auto",
              right: isMd ? "10px" : "auto",
              left: !isMd ? `calc(${progress * 100}% + 20px)` : "auto",
              transition: "all 0.05s ease-in-out",
            }}
          >
            {/* {console.log(`NavItem ${id} - Progress:`, progress)} */}
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
