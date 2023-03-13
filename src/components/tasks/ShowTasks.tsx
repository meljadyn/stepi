import { List, Container } from "@mantine/core";
import { FrontFacingTask } from "../../constants/types/database.types";
import Task from "./Task";
import {
  DndContext,
  useDroppable,
  closestCenter,
  rectIntersection,
  closestCorners,
} from "@dnd-kit/core";
import {
  SortableContext,
  arrayMove,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { useState } from "react";

type Props = {
  tasks: FrontFacingTask[];
};

function ShowTasks(props: Props) {
  const [tasks, setTasks] = useState(props.tasks);

  const { isOver, setNodeRef } = useDroppable({
    id: "droppable",
  });
  const style = {
    color: isOver ? "green" : undefined,
  };

  return (
    <Container w="100%">
      <DndContext
        onDragEnd={handleDragEnd}
        collisionDetection={closestCenter}
        id={"DragAndDrop"}
      >
        <SortableContext
          id="parent"
          items={tasks}
          strategy={verticalListSortingStrategy}
        >
          <List sx={{ listStyleType: "none" }}>
            <div ref={setNodeRef} style={style}>
              {tasks.length > 0 &&
                tasks.map((task) => <Task task={task} key={task.id} />)}
            </div>
          </List>
        </SortableContext>
      </DndContext>
    </Container>
  );

  function handleDragEnd(event: any) {
    const { active, over } = event;

    if (active.id !== over.id) {
      const taskKeys = tasks.map((task) => task.id);
      setTasks((tasks) => {
        const oldIndex = taskKeys.indexOf(active.id);
        const newIndex = taskKeys.indexOf(over.id);

        return arrayMove(tasks, oldIndex, newIndex);
      });

      fetch("/api/tasks/move_position", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ moved: active.id, reference: over.id }),
      });
    }
  }
}

export default ShowTasks;
