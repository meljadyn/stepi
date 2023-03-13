import { Group, List, Paper, Text } from "@mantine/core";
import { useStyles } from "./styles";
import { FrontFacingTask } from "../../constants/types/database.types";

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

  return (
    <li ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <Paper withBorder shadow="lg" p="md" className={classes.task}>
        <Group>
          <Text>{task.title}</Text>
          <Text>
            {task.duration || "no duration"}
            {task.duration ? task.unit : null}
          </Text>
        </Group>
      </Paper>
    </li>
  );
}

export default Task;
