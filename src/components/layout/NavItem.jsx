import { forwardRef } from "react";
import PropTypes from "prop-types";
import ResponsiveTypography from "/src/components/reuse-components/typography/ResponsiveTypography";
import { useMediaQuery } from "react-responsive";
import { useTransform, motion } from "framer-motion";
import { twMerge } from "tailwind-merge";
const NavItem = forwardRef(
  (
    { id, name, bgColor, textColor, isExpanded, onExpand, progressValue },
    ref
  ) => {
    const isLandscape = useMediaQuery({ query: "(orientation: landscape)" });
    const formattedId = id.toString().padStart(2, "0");

    const translateValue = useTransform(progressValue, [0, 1], ["0%", "100%"]);

    const handleClick = () => {
      onExpand(id);
    };
    console.log("navItem render");

    return (
      <button
        ref={ref}
        onClick={handleClick}
        style={{
          backgroundColor: bgColor,
        }}
        className={twMerge(
          "rounded-xl   relative flex flex-col shrink-0 p-2 justify-between items-start min-h-15  overflow-hidden   landscape:min-h-28 md:p-3 landscape:p-4 transition-all duration-300",
          isExpanded
            ? "w-[50vw] landscape:w-auto landscape:h-96"
            : "w-28 landscape:w-auto landscape:h-28"
        )}
      >
        <ResponsiveTypography variant="overline" style={{ color: textColor }}>
          {formattedId}
        </ResponsiveTypography>
        <ResponsiveTypography
          variant="caption"
          className="font-semibold"
          style={{ color: textColor }}
        >
          {name}
        </ResponsiveTypography>

        {/* white dot */}
        {isExpanded && (
          <motion.div
            className="absolute inset-0 w-full h-full"
            style={{
              translateX: !isLandscape ? translateValue : undefined,
              translateY: isLandscape ? translateValue : undefined,
              transition: !isLandscape ? "" : "transform 0.05s linear",
              willChange: "transform",
            }}
          >
            <div
              className="absolute  size-2 md:size-3 rounded-full"
              style={{
                backgroundColor: textColor,
                top: !isLandscape ? "20%" : "5%",
                left: !isLandscape ? "10%" : "auto",
                right: !isLandscape ? "auto" : "8%",
              }}
            />
          </motion.div>
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
  textColor: PropTypes.string.isRequired,
  bgColor: PropTypes.string.isRequired,
  progressValue: PropTypes.object.isRequired,
};
NavItem.displayName = "NavItem";

export default NavItem;
