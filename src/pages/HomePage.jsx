import { useState, useCallback, useRef, useEffect } from "react";
import NavItem from "/src/components/layout/NavItem";
import ContentSection from "/src/components/layout/ContentSection";
import HelloSection from "../sections/HelloSection";
import IntroSection from "../sections/IntroSection";
import AboutMeSection from "../sections/AboutMeSection";
import TechSection from "../sections/TechSection";
import ProjectSection from "../sections/ProjectSection";

import ContactSection from "../sections/ContactSection";
import FooterSection from "../sections/FooterSection";
import { useMotionValue } from "motion/react";

const HomePage = () => {
  const navNames = ["Hello", "Intro", "About Me", "Tech", "Project", "Contact"];
  const bgColors = [
    "#ffaf1b",
    "#000000",
    "#6d28d9",
    "#64748b",
    "#292524",
    "#22c55e",
  ];

  const textColors = [
    "#000000",
    "#fafafa",
    "#fafafa",
    "#fafafa",
    "#fafafa",
    "#fafafa",
  ];

  const navItems = navNames.map((name, index) => ({
    id: name.toLowerCase().replace(/\s+/g, "-"),
    index: index,
    name,
    bgColor: bgColors[index],
    textColor: textColors[index],
  }));

  const [expandedId, setExpandedId] = useState(0);
  const navRefs = useRef([]);
  const contentRefs = useRef([]);
  const contentContainerRef = useRef(null);
  const sectionScrollProgressValue = useMotionValue(0);

  //TODO: debug only, remove later
  useEffect(() => {
    const container = contentContainerRef.current;
    if (!container) return;

    function handleScroll() {
      const scrollTop = container.scrollTop; // 当前滚动位置
      const scrollHeight = container.scrollHeight - container.clientHeight; // 最大滚动高度
      const scrollProgress = scrollTop / scrollHeight; // 0 - 1 进度
      console.log("Global scrollTop:", scrollTop, "Progress:", scrollProgress);
    }

    container.addEventListener("scroll", handleScroll);
    return () => container.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const pathname = window.location.pathname;
    const id = pathname.split("/").pop();

    if (id && id !== "hello" && contentRefs.current[id]) {
      contentRefs.current[id]?.scrollIntoView({
        block: "start",
      });
    }
  }, []);

  const handleScrollProgress = useCallback(
    (id, scrollYProgressValue) => {
      if (id === expandedId) {
        sectionScrollProgressValue.set(scrollYProgressValue);
      }
    },
    [expandedId, sectionScrollProgressValue],
  );

  const handleInViewChange = useCallback((id) => {
    setExpandedId(id);

    window.history.replaceState(null, "", `/${id}`);

    if (navRefs.current[id]) {
      navRefs.current[id]?.scrollIntoView({
        block: "center",
        behavior: "smooth",
      });
    }
  }, []);

  const handleExpand = useCallback(
    (id) => {
      if (expandedId !== id) {
        setExpandedId(id);
        if (contentRefs.current[id]) {
          contentRefs.current[id]?.scrollIntoView({
            block: "start",
          });
        }
      }
    },
    [expandedId],
  );

  console.log("HomePage render");

  const sectionComponents = {
    Hello: <HelloSection scrollYProgressValue={sectionScrollProgressValue} />,
    Intro: <IntroSection />,
    "About Me": <AboutMeSection />,
    Tech: <TechSection />,
    Project: <ProjectSection scrollContainerRef={contentContainerRef} />,
    Contact: <ContactSection />,
  };

  return (
    <div className="grid h-dvh grid-rows-[1fr_auto] landscape:grid-cols-[minmax(200px,_1fr)_7fr]">
      {/* Content */}
      <div
        ref={contentContainerRef}
        className="relative flex scroll-pt-5 flex-col justify-start gap-5 overflow-x-clip overflow-y-scroll p-9 pb-6 pt-6 landscape:order-2 landscape:h-full"
      >
        {navItems.map((item) => (
          <ContentSection
            ref={(el) => {
              contentRefs.current[item.id] = el;
            }}
            key={item.id}
            id={item.id}
            index={item.index}
            name={item.name}
            bgColor={item.bgColor}
            textColor={item.textColor}
            displayTitle={item.index !== 0}
            onInViewChange={handleInViewChange}
            contentContainerRef={contentContainerRef}
            onScrollProgress={handleScrollProgress}
          >
            {sectionComponents[item.name]}
          </ContentSection>
        ))}
        <FooterSection />
      </div>

      {/* Navigation */}
      <div className="scrollbar-hide w-screen pb-6 pl-6 pt-6 landscape:order-1 landscape:h-full landscape:w-auto landscape:overflow-y-auto">
        <nav className="scrollbar-hide flex flex-nowrap gap-1 overflow-x-auto md:gap-4 landscape:flex-col landscape:overflow-x-visible">
          {navItems.map((item) => (
            <NavItem
              ref={(el) => {
                navRefs.current[item.id] = el;
              }}
              key={item.id}
              id={item.id}
              index={item.index}
              name={item.name}
              bgColor={item.bgColor}
              textColor={item.textColor}
              isExpanded={expandedId === item.id}
              progressValue={sectionScrollProgressValue}
              onExpand={handleExpand}
            />
          ))}
        </nav>
      </div>
    </div>
  );
};

export default HomePage;
