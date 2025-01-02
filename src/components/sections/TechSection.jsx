import { TechSectionContent } from "/src/utils/content";
import AnimatedLetters from "../typography/AnimatedLetters.jsx";
import AnimatedLettersContainer from "../typography/AnimatedLettersContainer.jsx";

const {
  ReactIcon,
  HtmlIcon,
  CssIcon,
  JsIcon,
  TailwindIcon,
  MaterialUiIcon,
  ViteIcon,
  WebpackIcon,
  PlaywrightIcon,
  JavaIcon,
  MySqlIcon,
  PostgresqlIcon,
} = TechSectionContent;

const TechSection = () => {
  return (
    <AnimatedLettersContainer className="h-[60vh] md:h-[95vh] rounded-3xl border bg-[#f4e9e1] border-[#2835f8]">
      <section className="flex flex-col items-center justify-center gap-20 p-40">
        <div className="w-full flex flex-col items-center justify-center gap-10">
          <AnimatedLetters
            inputString="My current"
            fontVariant="h3"
            xEnd="0vw"
            easing="easeInOut"
            shootFromDirection="right"
            className="text-gray-800"
          />
          <AnimatedLetters
            inputString="tech skill tree"
            fontVariant="h2"
            xEnd="0vw"
            easing="easeInOut"
            shootFromDirection="right"
            className="text-[#2835f8] font-bold"
          />
        </div>
        {/* Tech Arsenal Grid */}
        <div className="grid w-full h-auto grid-cols-2 gap-4">
          {/* Front-end */}
          <div className="grid w-full grid-cols-3  gap-4">
            <a
              href="https://developer.mozilla.org/docs/Web/HTML"
              target="_blank"
              rel="noopener noreferrer"
            >
              <HtmlIcon className="w-full h-full" fill="white" />
            </a>
            <a
              href="https://developer.mozilla.org/docs/Web/CSS"
              target="_blank"
              rel="noopener noreferrer"
            >
              <CssIcon className="w-full h-full" fill="white" />
            </a>
            <a
              href="https://developer.mozilla.org/docs/Web/JavaScript"
              target="_blank"
              rel="noopener noreferrer"
            >
              <JsIcon className="w-full h-full" />
            </a>
            <a
              href="https://react.dev/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <ReactIcon className="w-full h-full" />
            </a>
            <a
              href="https://tailwindcss.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <TailwindIcon className="w-full h-full" />
            </a>
            <a
              href="https://mui.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <MaterialUiIcon className="w-full h-full" />
            </a>

            <a
              href="https://vitejs.dev/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <ViteIcon className="w-full h-full" />
            </a>
            <a
              href="https://webpack.js.org/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <WebpackIcon className="w-full h-full" />
            </a>
            <a
              href="https://playwright.dev/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <PlaywrightIcon className="w-full h-full" />
            </a>
          </div>

          {/* Back-end */}
          <div className="grid w-full grid-cols-3  gap-4">
            <a
              href="https://www.java.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <JavaIcon className="w-full h-full" />
            </a>
            <a
              href="https://www.mysql.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <MySqlIcon className="w-full h-full" />
            </a>
            <a
              href="https://www.postgresql.org/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <PostgresqlIcon className="w-full h-full" />
            </a>
          </div>
        </div>
      </section>
    </AnimatedLettersContainer>
  );
};

export default TechSection;
