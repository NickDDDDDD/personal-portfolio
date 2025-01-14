import { useState, useCallback, useRef, useMemo } from "react";
import NavItem from "/src/components/layout/NavItem";
import ContentSection from "/src/components/layout/ContentSection";
import HelloSection from "../sections/HelloSection";
import IntroSection from "../sections/IntroSection";
import AboutMeSection from "../sections/AboutMeSection";
import TechSection from "../sections/TechSection";
import WorkSection from "../sections/WorkSection";
import ContactSection from "../sections/ContactSection";
import FooterSection from "../sections/FooterSection";
import { useMotionValue } from "framer-motion";

const HomePage = () => {
  const navNames = ["Hello", "Intro", "About Me", "Tech", "Work", "Contact"];
  const bgColors = [
    "#ffaf1b",
    "#000000",
    "#5900cc",
    "#2835f8",
    "#ff003d",
    "#ff3d00",
  ];

  const textColors = [
    "#000000",
    "#ffffff",
    "#ffffff",
    "#ffffff",
    "#ffffff",
    "#ffffff",
  ];

  const navItems = navNames.map((name, index) => ({
    id: index,
    name,
    bgColor: bgColors[index],
    textColor: textColors[index],
  }));

  const [expandedId, setExpandedId] = useState(0);
  const navRefs = useRef([]);
  const contentRefs = useRef([]);
  const contentContainerRef = useRef(null);
  const navScrollProgressValue = useMotionValue(0);

  const handleScrollProgress = useCallback(
    (id, scrollYProgressValue) => {
      if (id === expandedId) {
        navScrollProgressValue.set(scrollYProgressValue);
      }
    },
    [expandedId, navScrollProgressValue]
  );

  const handleInViewChange = useCallback((id) => {
    setExpandedId(id);
    if (navRefs.current[id]) {
      navRefs.current[id]?.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  }, []);

  const handleExpand = useCallback(
    (id) => {
      if (expandedId !== id) {
        setExpandedId(id);
        if (contentRefs.current[id]) {
          contentRefs.current[id]?.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
        }
      }
    },
    [expandedId]
  );

  console.log("HomePage render");

  const staticComponents = useMemo(
    () => ({
      Intro: <IntroSection />,
      "About Me": <AboutMeSection />,
      Tech: <TechSection />,
      Work: <WorkSection />,
      Contact: <ContactSection />,
    }),
    []
  );

  const sectionComponents = {
    Hello: <HelloSection scrollYProgressValue={navScrollProgressValue} />,
    ...staticComponents,
  };

  return (
    <div className=" h-dvh overflow-hidden  grid grid-rows-[1fr_auto]  md:grid-cols-[minmax(200px,_1fr)_7fr]">
      {/* Content */}
      <div
        ref={contentContainerRef}
        className="relative overflow-y-auto md:order-1  md:h-dvh  bg-stone-200"
      >
        <div className=" flex flex-col gap-5 p-2 md:p-7">
          {navItems.map((item, index) => (
            <ContentSection
              ref={(el) => {
                contentRefs.current[index] = el;
              }}
              key={item.id}
              id={item.id}
              name={item.name}
              bgColor={item.bgColor}
              textColor={item.textColor}
              displayTitle={item.id !== 0}
              onInViewChange={handleInViewChange}
              contentContainerRef={contentContainerRef}
              onScrollProgress={handleScrollProgress}
            >
              {sectionComponents[item.name]}
            </ContentSection>
          ))}
          <FooterSection></FooterSection>
        </div>
      </div>

      {/* Navigation */}
      <div className="w-screen scrollbar-hide  md:w-auto md:order-0 md:h-dvh md:overflow-y-auto  bg-stone-200 p-2 md:p-7">
        <nav className="scrollbar-hide overflow-x-auto flex gap-1 flex-nowrap  md:flex-col md:gap-4">
          {navItems.map((item, index) => (
            <NavItem
              ref={(el) => {
                navRefs.current[index] = el;
              }}
              key={item.id}
              id={item.id}
              name={item.name}
              bgColor={item.bgColor}
              textColor={item.textColor}
              isExpanded={expandedId === item.id}
              progressValue={navScrollProgressValue}
              onExpand={handleExpand}
            />
          ))}
        </nav>
      </div>
    </div>
  );
};

export default HomePage;
