import PropTypes from "prop-types";

const ResponsiveTypography = ({
  variant = "h1",
  children,
  className = "",
  ...props
}) => {
  const responsiveFontSize = {
    // Add responsive font sizes for h1, h2, h3, body1, and body2

    h1: "text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl ",
    h2: "text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl ",
    h3: "text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl ",
    body1: "text-sm  sm:text-base md:text-lg lg:text-xl xl:text-2xl",
    body2: "text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl",
  };
  const Tag = variant === "body1" || variant === "body2" ? "p" : variant;

  return (
    <Tag
      className={`text-whitesmoke ${responsiveFontSize[variant]} ${className}`}
      {...props}
    >
      {children}
    </Tag>
  );
};

ResponsiveTypography.propTypes = {
  variant: PropTypes.string,
  children: PropTypes.node,
  className: PropTypes.string,
};

export default ResponsiveTypography;
