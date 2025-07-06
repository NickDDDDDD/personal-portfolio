import PropTypes from "prop-types";
import { twMerge } from "tailwind-merge";
import { forwardRef } from "react";

const ResponsiveTypography = forwardRef(
  ({ variant = "body1", children, className, ...props }, ref) => {
    const responsiveFontSize = {
      h1: "text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl",
      h2: "text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl",
      h3: "text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl",
      body1: "text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl",
      body2: "text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl",
      caption: "text-[10px] sm:text-xs md:text-sm lg:text-base xl:text-lg",
      overline: "text-[8px] sm:text-[10px] md:text-xs lg:text-sm xl:text-base",
    };

    const Tag =
      variant === "body1" ||
      variant === "body2" ||
      variant === "caption" ||
      variant === "overline"
        ? "p"
        : variant;

    return (
      <Tag
        ref={ref}
        className={twMerge(responsiveFontSize[variant], className)}
        {...props}
      >
        {children}
      </Tag>
    );
  },
);
ResponsiveTypography.displayName = "ResponsiveTypography";

ResponsiveTypography.propTypes = {
  variant: PropTypes.string,
  children: PropTypes.node,
  className: PropTypes.string,
};

export default ResponsiveTypography;
