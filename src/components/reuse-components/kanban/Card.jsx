import { useSortable } from "@dnd-kit/sortable";
import PropTypes from "prop-types";
import { CSS } from "@dnd-kit/utilities";
import { useState, useEffect, useRef } from "react";
import EllipsisIcon from "../../icons/EllipsisIcon";
import { createPortal } from "react-dom";

const Card = ({ card, deleteCard, editCard, containerRef }) => {
  const {
    setNodeRef,
    attributes,
    listeners,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: card.id,
    data: {
      type: "card",
      card,
    },
  });

  const [isMouseOver, setIsMouseOver] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [anchorRect, setAnchorRect] = useState(null);
  const anchorRef = useRef(null);

  useEffect(() => {
    if (isMenuOpen && anchorRef.current && containerRef.current) {
      const anchorRect = anchorRef.current.getBoundingClientRect();
      const containerRect = containerRef.current.getBoundingClientRect();
      setAnchorRect({
        top: anchorRect.top - containerRect.top,
        bottom: anchorRect.bottom - containerRect.top,
        left: anchorRect.left - containerRect.left,
        right: anchorRect.right - containerRect.left,
      });
    }
  }, [isMenuOpen, containerRef]);

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const menuStyle =
    anchorRect && isMenuOpen
      ? {
          top: anchorRect.bottom,
          left: anchorRect.right,
          maxHeight: isMenuOpen ? "400px" : "0px",
        }
      : {};
  return isDragging ? (
    <div
      className="border-rose-500 border-2 flex-shrink-0 h-20  w-full rounded-md p-2"
      ref={setNodeRef}
      style={style}
    />
  ) : (
    <div
      className="bg-slate-900 flex-shrink-0 h-20  w-full rounded-md p-2"
      onMouseOver={() => setIsMouseOver(true)}
      onMouseLeave={() => setIsMouseOver(false)}
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
    >
      <div className="relative " ref={anchorRef}>
        <p>{card.title}</p>
        {isMouseOver && (
          <button
            className="absolute top-0 right-0 stroke-white hover:bg-slate-800 p-1 rounded-md"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <EllipsisIcon />
          </button>
        )}
        {isMenuOpen &&
          anchorRect &&
          createPortal(
            <div
              className="absolute  bg-slate-800 rounded-md shadow-lg z-10 transition-all duration-150 overflow-hidden"
              style={menuStyle}
            >
              <button
                className="w-full text-left px-4 py-2 hover:bg-slate-900"
                onClick={() => {
                  deleteCard(card.id);
                  setIsMenuOpen(false);
                }}
              >
                Delete
              </button>
            </div>,
            containerRef.current
          )}
      </div>
    </div>
  );
};

Card.propTypes = {
  card: PropTypes.object.isRequired,
  deleteCard: PropTypes.func.isRequired,
  editCard: PropTypes.func.isRequired,
  containerRef: PropTypes.object.isRequired,
};

export default Card;
