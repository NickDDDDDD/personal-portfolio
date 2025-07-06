import TranslateWrapper from "./TranlateWallpaper";
import PropTypes from "prop-types";
import { twMerge } from "tailwind-merge";

const Watermark = ({ reverse, text, className }) => (
  <div className="flex -translate-y-12 select-none overflow-hidden">
    <TranslateWrapper reverse={reverse}>
      <span
        className={twMerge(
          "w-fit whitespace-nowrap text-[20vmax] font-black uppercase leading-[0.75] ",
          className
        )}
      >
        {text}
      </span>
    </TranslateWrapper>
    <TranslateWrapper reverse={reverse}>
      <span
        className={twMerge(
          "ml-48 w-fit whitespace-nowrap text-[20vmax] font-black uppercase leading-[0.75] ",
          className
        )}
      >
        {text}
      </span>
    </TranslateWrapper>
  </div>
);

export default Watermark;

Watermark.propTypes = {
  reverse: PropTypes.bool,
  text: PropTypes.string.isRequired,
  className: PropTypes.string,
};
