import { nanoid } from "nanoid";
import PlusIcon from "../../icons/PlusIcon";
import { useMemo, useState, useRef, useEffect } from "react";
import {
  DndContext,
  DragOverlay,
  PointerSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { arrayMove, SortableContext } from "@dnd-kit/sortable";
import Column from "./Column";
import Card from "./Card";
import { twMerge } from "tailwind-merge";

const Kanban = () => {
  const [columns, setColumns] = useState([]);
  const columnsIds = useMemo(
    () => columns.map((column) => column.id),
    [columns]
  );
  const [cards, setCards] = useState([]);
  const [activeColumn, setActiveColumn] = useState(null);
  const [activeCard, setActiveCard] = useState(null);
  const [isDragging, setIsDragging] = useState(false);

  const containerRef = useRef(null);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 15 } }),
    useSensor(TouchSensor, {
      activationConstraint: {
        delay: 250,
        tolerance: 5,
      },
    })
  );

  useEffect(() => {
    //TODO: FIX THIS LATER
    if (isDragging) {
      console.log("Dragging");
      const originalStyle = window.getComputedStyle(document.body).overflow;

      document.body.style.overflow = "hidden";

      return () => {
        document.body.style.overflow = originalStyle;
      };
    }
  }, [isDragging]);

  function createColumn() {
    const columnToAdd = {
      id: nanoid(),
      title: `Column ${columns.length + 1}`,
    };
    setColumns([...columns, columnToAdd]);
  }

  function deleteColumn(id) {
    setColumns(columns.filter((column) => column.id !== id));
  }

  function updateColumn(id, title) {
    setColumns(
      columns.map((column) =>
        column.id === id ? { ...column, title } : column
      )
    );
  }

  function handleDragStart({ active }) {
    setIsDragging(true);

    const column = active.data.current?.column;
    if (active.data.current?.type === "column" && column) {
      setActiveColumn(column);
    }

    const card = active.data.current?.card;
    if (active.data.current?.type === "card" && card) {
      setActiveCard(card);
    }
  }

  function handleDragOver({ active, over }) {
    if (!active || !over) {
      return;
    }

    if (active.data.current.type === "column") {
      return;
    }

    if (active.id === over.id) {
      return;
    }

    if (over.data.current?.type === "card") {
      setCards((prev) => {
        const activeIndex = prev.findIndex((card) => card.id === active.id);
        const overIndex = prev.findIndex((card) => card.id === over.id);

        if (activeIndex === -1 || overIndex === -1) {
          return prev;
        }
        const newCards = prev.map((card, index) => {
          if (index === activeIndex) {
            return { ...card, columnId: prev[overIndex].columnId };
          }
          return card;
        });

        return arrayMove(newCards, activeIndex, overIndex);
      });
    } else if (over.data.current?.type === "column") {
      // change column id of card
      setCards((prev) => {
        const activeIndex = prev.findIndex((card) => card.id === active.id);
        const newCards = prev.map((card) =>
          card.id === active.id ? { ...card, columnId: over.id } : card
        );
        return arrayMove(newCards, activeIndex, newCards.length - 1);
      });
    }
  }

  function handleDragEnd({ active, over }) {
    setIsDragging(false);

    setActiveColumn(null);
    setActiveCard(null);

    if (active.data.current?.type === "card") {
      return;
    }

    if (active.id === over.id) {
      return;
    }

    setColumns((prev) => {
      const activeIndex = prev.findIndex((column) => column.id === active.id);
      const overIndex = prev.findIndex((column) => column.id === over.id);
      if (activeIndex === -1 || overIndex === -1) {
        return prev;
      }
      return arrayMove(prev, activeIndex, overIndex);
    });
  }

  function handleDragCancel() {
    setIsDragging(false);
    setActiveColumn(null);
    setActiveCard(null);
  }

  return (
    <div className=" h-[65dvh] md:h-[95dvh] w-full bg-slate-950 flex  overflow-x-auto overflow-y-hidden text-white p-12">
      <DndContext
        sensors={sensors}
        onDragStart={handleDragStart}
        onDragOver={handleDragOver}
        onDragEnd={handleDragEnd}
        onDragCancel={handleDragCancel}
      >
        {/* kanban area */}
        <div
          className={twMerge(
            "mx-auto flex h-full justify-start items-start gap-4  relative",
            isDragging ? "touch-none" : ""
          )}
          ref={containerRef}
        >
          {/* columns */}
          <div className="flex h-full justify-start items-start gap-4">
            <SortableContext items={columnsIds}>
              {columns.map((column) => (
                <Column
                  key={column.id}
                  column={column}
                  deleteColumn={deleteColumn}
                  updateColumn={updateColumn}
                  cards={cards.filter((card) => card.columnId === column.id)}
                  setCards={setCards}
                  containerRef={containerRef}
                />
              ))}
            </SortableContext>
          </div>
          <button
            className="flex self-start gap-2 cursor-pointer rounded-lg bg-slate-800   px-8 py-4 ring-rose-500 hover:ring-2 focus:ring-2 active:scale-95 transition duration-150"
            onClick={(e) => {
              createColumn();
              e.currentTarget.blur();
            }}
          >
            <PlusIcon />
            Add Column
          </button>
        </div>
        <DragOverlay>
          {activeColumn && (
            <Column
              key={activeColumn.id}
              column={activeColumn}
              deleteColumn={deleteColumn}
              updateColumn={updateColumn}
              cards={cards.filter((card) => card.columnId === activeColumn.id)}
              setCards={setCards}
              containerRef={containerRef}
            />
          )}
          {activeCard && <Card key={activeCard.id} card={activeCard} />}
        </DragOverlay>
      </DndContext>
    </div>
  );
};

export default Kanban;
