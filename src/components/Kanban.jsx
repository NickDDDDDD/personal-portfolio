import { nanoid } from "nanoid";
import PlusIcon from "./icons/PlusIcon";
import { useMemo, useState } from "react";
import PropTypes from "prop-types";
import TrashIcon from "./icons/TrashIcon";
import {
  DndContext,
  DragOverlay,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { arrayMove, SortableContext, useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

const Kanban = () => {
  const [columns, setColumns] = useState([]);
  const [activeColumn, setActiveColumn] = useState(null);
  const columnsIds = useMemo(
    () => columns.map((column) => column.id),
    [columns]
  );

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 15 } })
  );

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

  function handleDragStart(event) {
    console.log("drag start", event);
    const column = event.active.data.current?.column;
    if (event.active.data.current?.type === "column" && column) {
      setActiveColumn(column);
    }
  }

  function handleDragEnd(event) {
    console.log("drag end", event);
    const { active, over } = event;
    if (active.id === over.id) {
      return;
    }

    setColumns((prev) => {
      const activeIndex = prev.findIndex((column) => column.id === active.id);
      const overIndex = prev.findIndex((column) => column.id === over.id);
      return arrayMove(prev, activeIndex, overIndex);
    });

    setActiveColumn(null);
  }

  return (
    <div className="h-[60dvh] md:h-[95dvh] w-full bg-slate-950 flex items-center overflow-x-auto text-white">
      <DndContext
        sensors={sensors}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
      >
        <div className="m-auto flex gap-4">
          <div className="flex gap-4">
            <SortableContext items={columnsIds}>
              {columns.map((column) => (
                <Column
                  key={column.id}
                  column={column}
                  deleteColumn={deleteColumn}
                />
              ))}
            </SortableContext>
          </div>
          <button
            className="flex self-start gap-2 cursor-pointer rounded-lg bg-slate-900   px-8 py-4 ring-rose-500 hover:ring-2 focus:ring-2 active:scale-95 transition duration-150"
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
            />
          )}
        </DragOverlay>
      </DndContext>
    </div>
  );
};

const Column = ({ column, deleteColumn }) => {
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

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return isDragging ? (
    <div
      className="flex flex-col h-96 w-64 rounded-md border-2 border-rose-500"
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
    ></div>
  ) : (
    <div
      className="flex flex-col bg-slate-800 h-96 w-64 rounded-md"
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
    >
      <div className="bg-slate-900 text-base cursor-grab rounded-md rounded-b-none font-bold border-slate-800 border-4 flex p-2 justify-between items-center ">
        <div className="flex gap-2">
          <div className="bg-slate-800 p-1 rounded-full text-xs">{0}</div>
          {column.title}
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
      {/* tasks container */}

      <div className="flex-grow flex flex-col"></div>
    </div>
  );
};

Column.propTypes = {
  column: PropTypes.object.isRequired,
  deleteColumn: PropTypes.func.isRequired,
};

export default Kanban;
