import { Group, Paper, Text } from "@mantine/core";
import { useStyles } from "./styles";

type Props = {
  task: {
    title: string;
    duration: string;
    unit: string;
    id: number;
  };
};

function Task({ task }: Props) {
  const { classes } = useStyles();

  return (
    <Paper withBorder shadow="lg" p="md" className={classes.task}>
      <Group>
        <Text>{task.title}</Text>
        <Text>
          {task.duration || "no duration"}
          {task.unit}
        </Text>
      </Group>
    </Paper>
  );
}

export default Task;
