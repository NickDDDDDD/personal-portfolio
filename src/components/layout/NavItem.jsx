import { forwardRef } from "react";
import PropTypes from "prop-types";
import ResponsiveTypography from "/src/components/typography/ResponsiveTypography";
import { useMediaQuery } from "react-responsive";
import { useTransform, motion } from "framer-motion";
import { twMerge } from "tailwind-merge";
const NavItem = forwardRef(
  (
    { id, name, bgColor, textColor, isExpanded, onExpand, progressValue },
    ref,
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
          "min-h-15 relative flex shrink-0 flex-col items-start justify-between overflow-clip rounded-xl p-2 transition-all duration-300 md:rounded-2xl landscape:min-h-28 landscape:p-4",
          isExpanded
            ? "w-[50vw] landscape:h-[50vh] landscape:w-full"
            : "w-28 landscape:h-32 landscape:w-full",
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
            className="absolute inset-0 h-full w-full"
            style={{
              translateX: !isLandscape ? translateValue : undefined,
              translateY: isLandscape ? translateValue : undefined,
              transition: !isLandscape ? "" : "transform 0.05s linear",
              willChange: "transform",
            }}
          >
            <div
              className="absolute size-2 rounded-full md:size-3"
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
  },
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
