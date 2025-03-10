import TrashIcon from "../../icons/TrashIcon";
import { SortableContext, useSortable } from "@dnd-kit/sortable";
import { useMemo, useState } from "react";
import PropTypes from "prop-types";
import Card from "./Card";
import { CSS } from "@dnd-kit/utilities";
import PlusIcon from "../../icons/PlusIcon";
import { nanoid } from "nanoid";
import CloseIcon from "../../icons/CloseIcon";

const Column = ({
  column,
  deleteColumn,
  updateColumn,
  cards,
  setCards,
  containerRef,
}) => {
  const {
    setNodeRef,
    attributes,
    listeners,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: column.id,
    data: {
      type: "column",
      column,
    },
  });

  const cardsIds = useMemo(() => cards.map((card) => card.id), [cards]);
  const [isAddingCard, setIsAddingCard] = useState(false);
  const [cardContent, setCardContent] = useState("");
  const [isEditing, setIsEditing] = useState(false);

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  function createCard(columnId) {
    if (!isAddingCard) {
      setIsAddingCard(true);
    } else {
      const cardToAdd = {
        id: nanoid(),
        columnId,
        title: cardContent,
      };
      setCards([...cards, cardToAdd]);
      setIsAddingCard(false);
      setCardContent("");
    }
  }

  function deleteCard(id) {
    setCards(cards.filter((card) => card.id !== id));
  }

  return isDragging ? (
    <div
      className="self-start flex flex-col  w-64  rounded-md border-2 border-rose-500 max-h-[60dvh]  md:max-h-[90dvh]"
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
    ></div>
  ) : (
    <div
      className="self-start  flex flex-col  w-64  bg-slate-800  rounded-md p-2 gap-2  max-h-[60dvh]  md:max-h-[90dvh] "
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
    >
      {/* header */}
      <div
        className="bg-slate-900 text-base cursor-grab rounded-md rounded-b-none font-bold flex p-2 justify-between items-center "
        onClick={() => setIsEditing(true)}
      >
        <div className="flex gap-2 items-center flex-1">
          {/* chip for cards num in column */}
          <div className="bg-slate-800 p-1 rounded-full text-xs self-center">
            {cards.length}
          </div>
          <div className="flex items-center flex-1 min-w-0 overflow-hidden ">
            {isEditing ? (
              <input
                type="text"
                value={column.title}
                onChange={(e) => updateColumn(column.id, e.target.value)}
                className="bg-slate-900 text-white resize-none outline-none focus:border-2 border-rose-500 rounded-md w-full"
                onBlur={() => setIsEditing(false)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    setIsEditing(false);
                  }
                }}
                wrap="soft"
                autoFocus
              />
            ) : (
              <p>{column.title}</p>
            )}
          </div>
        </div>

        <button
          className="stroke-gray-500 hover:stroke-white transition duration-150 hover:bg-slate-800 p-1 rounded-md"
          onClick={() => {
            deleteColumn(column.id);
          }}
        >
          <TrashIcon className="size-5" />
        </button>
      </div>
      {/* cards container */}

      <div className=" flex flex-col gap-2 overflow-y-auto ">
        <SortableContext items={cardsIds}>
          {cards.map((card) => (
            <Card
              key={card.id}
              card={card}
              deleteCard={deleteCard}
              setCards={setCards}
              containerRef={containerRef}
            />
          ))}
        </SortableContext>
      </div>

      {/* footer */}
      <div
        className="overflow-hidden transition-all duration-150"
        style={{ maxHeight: isAddingCard ? "200px" : "0px" }}
      >
        <textarea
          placeholder="Do something..."
          value={cardContent}
          onChange={(e) => setCardContent(e.target.value)}
          className="w-full p-2 border-none rounded-md bg-slate-900 text-white h-32 resize-none"
          wrap="soft"
        />
      </div>

      <div className="flex gap-2 justify-center items-center">
        <button
          className="flex gap-2 cursor-pointer rounded-lg bg-slate-800  p-1 ring-rose-500 hover:ring-2 focus:ring-2 active:scale-95 transition duration-150 justify-center items-center flex-1"
          onClick={(e) => {
            createCard(column.id);
            e.currentTarget.blur();
          }}
        >
          {!isAddingCard && <PlusIcon />}
          {isAddingCard ? "Confirm" : "Add Card"}
        </button>
        {isAddingCard && (
          <button
            className="flex gap-2 cursor-pointer rounded-lg bg-slate-800  p-1   active:scale-95 transition duration-150 justify-center items-center flex-2 stroke-gray-500 hover:stroke-white hover:bg-slate-900"
            onClick={() => setIsAddingCard(false)}
          >
            <CloseIcon />
          </button>
        )}
      </div>
    </div>
  );
};

Column.propTypes = {
  column: PropTypes.object.isRequired,
  deleteColumn: PropTypes.func.isRequired,
  updateColumn: PropTypes.func.isRequired,
  cards: PropTypes.array.isRequired,
  setCards: PropTypes.func.isRequired,
  containerRef: PropTypes.object.isRequired,
};

export default Column;
