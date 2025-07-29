import { motion, AnimatePresence } from "motion/react";
import { useState, useRef } from "react";
import PropTypes from "prop-types";
import Project from "./ProjectTemplate";
import ResponsiveTypography from "../typography/ResponsiveTypography";
import { useMediaQuery } from "react-responsive";
import PlaceHolder1 from "./PlaceHolder1";
import PlaceHolder2 from "./PlaceHolder2";
import PlaceHolder3 from "./PlaceHolder3";

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
    content: <PlaceHolder2 />,
  },
  {
    id: 3,
    title: "Project 3",
    discription: {
      text: "This is a project description",
      color: "#d5e000",
    },
    content: <PlaceHolder3 />,
  },
];

const Accordion = () => {
  const [open, setOpen] = useState(null);

  const [hover, setHover] = useState(0);

  const toggleOpen = (id) => {
    if (id === open) {
      setOpen(null);
      return;
    }

    setOpen(id);
  };

  return (
    <div className="flex flex-col gap-3">
      {projects.map((item) => {
        return (
          <Panel
            key={item.id}
            isOpen={open === item.id}
            toggleOpen={() => toggleOpen(item.id)}
            hover={hover}
            setHover={setHover}
            id={item.id}
            title={item.title}
            discription={item.discription}
            content={item.content}
          />
        );
      })}
    </div>
  );
};

const Panel = ({
  isOpen,
  hover,
  setHover,
  id,
  title,
  discription,
  content,
  toggleOpen,
}) => {
  const isHovered = hover === id && !isOpen;
  const isMobile = useMediaQuery({ query: "(max-width: 767px)" });
  const panelRef = useRef(null);

  const rotateVariants = {
    initial: { rotateX: 0 },
    hover: { rotateX: -25 },
  };

  const hoverStyle = {
    transformOrigin: "bottom center",
    perspective: 5000,
  };
  const hoverTransition = { type: "spring", stiffness: 200, damping: 20 };

  return (
    <>
      <div
        className="w-full rounded-2xl bg-black text-white"
        onClick={toggleOpen}
        onMouseEnter={() => setHover(id)}
        onMouseLeave={() => setHover(0)}
        style={{
          perspective: 5000,
          height: isOpen
            ? isMobile
              ? "20vh"
              : "40vh"
            : isMobile
              ? "10vh"
              : "20vh",
          transition: "height 0.3s ease-in-out",
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
      </div>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            key={`content-${id}`}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            style={{ overflowAnchor: "none", overflow: "hidden" }}
            transition={{ duration: 0.4, ease: "linear" }}
          >
            {content}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

Accordion.propTypes = {
  scrollContainerRef: PropTypes.object.isRequired,
};

Panel.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  toggleOpen: PropTypes.func.isRequired,
  hover: PropTypes.number.isRequired,
  setHover: PropTypes.func.isRequired,
  id: PropTypes.number.isRequired,
  content: PropTypes.node,
  title: PropTypes.string.isRequired,
  discription: PropTypes.object.isRequired,
};

export default Accordion;
