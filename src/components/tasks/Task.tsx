import { Button, Group, List, Paper, Text } from "@mantine/core";
import { useStyles } from "./styles";
import { FrontFacingTask } from "../../constants/types/database.types";
import { IconTrash, IconGripVertical } from "@tabler/icons";
import React from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

type Props = {
  task: FrontFacingTask;
};

// Render a single task to the frontend
function Task({ task }: Props) {
  const { classes } = useStyles();

  // For drag and drop functionality
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({
      id: task.id,
    });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const deleteTask = () => {
    console.log("calling for the deletion");
    fetch(`/api/tasks/${task.id}`, {
      method: "DELETE",
    });
  };

  return (
    <li ref={setNodeRef} style={style}>
      <Paper withBorder shadow="lg" p="md" className={classes.task}>
        <Group>
          <Button variant="subtle" {...attributes} {...listeners}>
            <IconGripVertical />
          </Button>
          <Text>{task.title}</Text>
          <Text>
            {task.duration || "no duration"}
            {task.duration ? task.unit : null}
          </Text>
          <Button onClick={deleteTask}>
            <IconTrash />
          </Button>
        </Group>
      </Paper>
    </li>
  );
}

export default Task;
