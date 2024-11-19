import { useState, useCallback, useRef } from "react";
import NavItem from "/src/components/layout/NavItem";
import ContentSection from "/src/components/layout/ContentSection";
import HelloSection from "../components/sections/HelloSection";
import IntroSection from "../components/sections/IntroSection";
import AboutMeSection from "../components/sections/AboutMeSection";
import TechSection from "../components/sections/TechSection";
import WorkSection from "../components/sections/WorkSection";
import ContactSection from "../components/sections/Contact";

const HomePage = () => {
  const navNames = ["Hello", "Intro", "AboutMe", "Tech", "Work", "Contact"];
  const navItems = navNames.map((name, index) => ({
    id: index,
    name,
  }));

  const [expandedId, setExpandedId] = useState(null);
  const navRefs = useRef([]);
  const contentRefs = useRef([]);
  const contentContainerRef = useRef(null);

  const handleInViewChange = useCallback((id) => {
    console.log(`In view: ${id}`);

    setExpandedId(id);

    if (navRefs.current[id]) {
      console.log(`Scrolling to ${id}`);
      navRefs.current[id]?.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  }, []);

  const handleScrollProgress = (id, progress) => {
    if (id === expandedId) {
      console.log(`Section ${id} scroll progress in HomePage: ${progress}`);
    }
  };

  const handleExpand = (id) => {
    if (expandedId !== id) {
      setExpandedId(id);
      if (contentRefs.current[id]) {
        contentRefs.current[id]?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    }
  };

  const sectionComponents = {
    Hello: <HelloSection />,
    Intro: <IntroSection />,
    AboutMe: <AboutMeSection />,
    Tech: <TechSection />,
    Work: <WorkSection />,
    Contact: <ContactSection />,
  };

  return (
    <div className="h-screen min-h-screen grid grid-cols-[226px_1fr]">
      <div className="h-screen overflow-y-auto scrollbar-hide bg-red-300 p-7">
        <nav className="flex flex-col gap-4">
          {navItems.map((item, index) => (
            <NavItem
              ref={(el) => {
                navRefs.current[index] = el;
              }}
              key={item.id}
              id={item.id}
              name={item.name}
              isExpanded={expandedId === item.id}
              onExpand={handleExpand}
            />
          ))}
        </nav>
      </div>

      <div
        ref={contentContainerRef}
        className="min-h-screen h-screen overflow-y-auto bg-yellow-200"
      >
        <div className=" flex flex-col gap-5 p-7">
          {navItems.map((item, index) => (
            <ContentSection
              ref={(el) => {
                contentRefs.current[index] = el;
              }}
              key={item.id}
              id={item.id}
              onInViewChange={handleInViewChange}
              contentContainerRef={contentContainerRef}
              onScrollProgress={handleScrollProgress}
            >
              {sectionComponents[item.name]}
            </ContentSection>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
