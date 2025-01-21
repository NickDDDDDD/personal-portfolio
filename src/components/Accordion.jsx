import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import PropTypes from "prop-types";
const projects = [
  {
    id: 1,
    title: "Project 1",
  },
  {
    id: 2,
    title: "Project 2",
  },
  {
    id: 3,
    title: "Project 3",
  },
];

const Accordion = () => {
  const [open, setOpen] = useState(0);
  const [hover, setHover] = useState(0);

  return (
    <div className="flex flex-col gap-2 p-2 h-full w-full   ">
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
          />
        );
      })}
    </div>
  );
};

const Panel = ({ open, setOpen, hover, setHover, id, title }) => {
  const isOpen = open === id;
  const isHovered = hover === id && !isOpen;

  const rotateVariants = {
    initial: { rotateX: 0 },
    hover: { rotateX: -25 },
  };

  function handleClick() {
    if (isOpen) {
      setOpen(0);
      return;
    }
    setOpen(id);
  }

  return (
    <>
      <button
        className="bg-black h-[20vh] w-full  text-white flex-col justify-center  items-center gap-4  rounded-xl"
        onClick={handleClick}
        onMouseEnter={() => setHover(id)}
        onMouseLeave={() => setHover(null)}
        style={{
          perspective: 5000,
        }}
      >
        <motion.div
          className="bg-amber-300 w-full h-full rounded-xl"
          variants={rotateVariants}
          animate={isHovered ? "hover" : "initial"}
          style={{
            transformOrigin: "bottom center",
            perspective: 5000,
          }}
          transition={{
            type: "spring",
            stiffness: 200,
          }}
        >
          <motion.div
            className="bg-blue-500 w-full h-full rounded-xl"
            variants={rotateVariants}
            animate={isHovered ? "hover" : "initial"}
            style={{
              transformOrigin: "bottom center",
              perspective: 5000,
            }}
            transition={{
              type: "spring",
              stiffness: 200,
            }}
          >
            <motion.div
              className="bg-[#ff003d] w-full h-full flex flex-col items-center justify-center rounded-xl"
              variants={rotateVariants}
              animate={isHovered ? "hover" : "initial"}
              style={{
                transformOrigin: "bottom center",
              }}
              transition={{
                type: "spring",
                stiffness: 200,
              }}
            >
              <span className="block text-xl font-light ">{title}</span>
            </motion.div>
          </motion.div>
        </motion.div>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            key={`panel-${id}`}
            variants={panelVariants}
            initial="closed"
            animate="open"
            exit="closed"
            className="w-full h-full overflow-hidden  "
          ></motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
Panel.propTypes = {
  open: PropTypes.number.isRequired,
  hover: PropTypes.number.isRequired,
  setOpen: PropTypes.func.isRequired,
  setHover: PropTypes.func.isRequired,
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
};

const panelVariants = {
  open: {
    width: "100%",
    height: "50vh",
  },
  closed: {
    width: "100%",
    height: "0px",
  },
};

export default Accordion;
