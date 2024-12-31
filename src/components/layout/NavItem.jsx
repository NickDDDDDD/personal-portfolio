import { forwardRef } from "react";
import PropTypes from "prop-types";
import ResponsiveTypography from "../typography/ResponsiveTypography";
import { useMediaQuery } from "react-responsive";

const NavItem = forwardRef(
  ({ id, name, bgColor, textColor, isExpanded, onExpand, progress }, ref) => {
    const isMobile = useMediaQuery({ query: "(max-width: 767px)" });
    const formattedId = id.toString().padStart(2, "0");

    const handleClick = () => {
      onExpand(id);
    };
    console.log("navItem render");


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
            className="absolute inset-0 w-full h-full"
            style={{
              transform: isMobile
                ? `translateX(${progress * 100}%)`
                : `translateY(${progress * 100}%)`,
              willChange: "transform",
              transition: isMobile ? "" : "transform 0.05s linear",
            }}
          >
            <div
              className="absolute bg-[#f4e9e1] size-2 md:size-3 rounded-full"
              style={{
                top: isMobile ? "20%" : "5%",
                left: isMobile ? "10%" : "auto",
                right: isMobile ? "auto" : "8%",
              }}
            />
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
