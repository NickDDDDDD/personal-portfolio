import { motion } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import Project from "./ProjectTemplate";
import ResponsiveTypography from "../typography/ResponsiveTypography";
import { useMediaQuery } from "react-responsive";

const projects = [
  {
    id: 1,
    title: "Terror in Tilberg",
    discription: {
      text: "A online version of a matrix game",
      color: "#d5e000",
    },
    content: <Project />,
  },
  {
    id: 2,
    title: "Project 2",
    discription: {
      text: "This is a project description",
      color: "#d5e000",
    },
  },
  {
    id: 3,
    title: "Project 3",
    discription: {
      text: "This is a project description",
      color: "#d5e000",
    },
  },
];

const Accordion = ({ scrollContainerRef }) => {
  const [open, setOpen] = useState(0);
  const [hover, setHover] = useState(0);

  useEffect(() => {
    if (open) {
      document.body.style.backgroundColor = "#1a1a1a";
      console.log("Accordion opened, background changed to dark");
    } else {
      document.body.style.backgroundColor = "#e7e5e4";
      console.log("Accordion closed, background changed to white");
    }

    return () => {
      document.body.style.backgroundColor = "#e7e5e4";
    };
  }, [open]);

  return (
    <div className="flex h-full w-full flex-col gap-3">
      {projects.map((item) => {
        return (
          <Panel
            key={item.id}
            open={open}
            hover={hover}
            setOpen={setOpen}
            setHover={setHover}
            id={item.id}
            title={item.title}
            discription={item.discription}
            content={item.content}
            scrollContainerRef={scrollContainerRef}
          />
        );
      })}
    </div>
  );
};

const Panel = ({
  open,
  setOpen,
  hover,
  setHover,
  id,
  title,
  discription,
  content,
  scrollContainerRef,
}) => {
  const isOpen = open === id;
  const isHovered = hover === id && !isOpen;
  const isMobile = useMediaQuery({ query: "(max-width: 767px)" });
  const prevScrollRef = useRef(0);

  const rotateVariants = {
    initial: { rotateX: 0 },
    hover: { rotateX: -25 },
  };
  const lockScroll = () => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const currentScroll = container.scrollTop;

    container.scrollTop = currentScroll;

    prevScrollRef.current = container.scrollTop;
    console.log("Scroll locked at:", prevScrollRef.current);
  };

  const unlockScroll = () => {
    const container = scrollContainerRef.current;
    if (!container) return;
    console.log("Unlocking scroll to:", prevScrollRef.current);

    container.scrollTo({
      top: prevScrollRef.current,
      behavior: "smooth",
    });
  };

  function handleClick() {
    // 如果当前已经有 panel 打开，且点击的是另一个 panel，则不 lock
    if (open !== 0 && open !== id) {
      // 直接切换，不执行 lockScroll
      setOpen(id);
      return;
    }

    // 其他情况（打开第一个或关闭当前）才 lockScroll
    lockScroll();
    setOpen(isOpen ? 0 : id);
  }
  const hoverStyle = {
    transformOrigin: "bottom center",
    perspective: 5000,
  };
  const hoverTransition = { type: "spring", stiffness: 200, damping: 20 };

  return (
    <>
      <motion.button
        className="w-full rounded-2xl bg-black text-white"
        onClick={handleClick}
        onMouseEnter={() => setHover(id)}
        onMouseLeave={() => setHover(0)}
        animate={{
          height: isOpen
            ? isMobile
              ? "20vh"
              : "40vh"
            : isMobile
              ? "10vh"
              : "20vh",
        }}
        style={{
          perspective: 5000,
        }}
      >
        <motion.div
          className="h-full w-full rounded-xl bg-amber-300"
          variants={rotateVariants}
          animate={isHovered ? "hover" : "initial"}
          style={hoverStyle}
          transition={hoverTransition}
        >
          <motion.div
            className="h-full w-full rounded-xl bg-blue-500"
            variants={rotateVariants}
            animate={isHovered ? "hover" : "initial"}
            style={hoverStyle}
            transition={hoverTransition}
          >
            <motion.div
              className="flex h-full w-full flex-col items-start justify-evenly rounded-xl bg-stone-800 p-4 md:p-12"
              variants={rotateVariants}
              animate={isHovered ? "hover" : "initial"}
              style={hoverStyle}
              transition={hoverTransition}
            >
              <ResponsiveTypography className="font-semibold" variant="h5">
                {title}
              </ResponsiveTypography>
              {isOpen && (
                <ResponsiveTypography
                  variant="h4"
                  className="font-semibold"
                  style={{ color: discription.color }}
                >
                  {discription.text}
                </ResponsiveTypography>
              )}
            </motion.div>
          </motion.div>
        </motion.div>
      </motion.button>

      <motion.div
        key={`panel-${id}`}
        variants={panelVariants}
        animate={isOpen ? "open" : "closed"}
        layout
        className="overflow-hidden"
        onAnimationStart={() => {
          window.scrollTo({
            top: 0,
            behavior: "smooth",
          });
        }}
        onAnimationComplete={unlockScroll}
      >
        {content}
      </motion.div>
    </>
  );
};

Accordion.propTypes = {
  scrollContainerRef: PropTypes.object.isRequired,
};

Panel.propTypes = {
  open: PropTypes.number.isRequired,
  hover: PropTypes.number.isRequired,
  setOpen: PropTypes.func.isRequired,
  setHover: PropTypes.func.isRequired,
  id: PropTypes.number.isRequired,
  content: PropTypes.node,
  title: PropTypes.string.isRequired,
  discription: PropTypes.object.isRequired,
  scrollContainerRef: PropTypes.object.isRequired,
};

const panelVariants = {
  open: {
    height: "auto",
  },
  closed: {
    height: "0px",
  },
};

export default Accordion;
