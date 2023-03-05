import { Group, Paper, Text } from "@mantine/core";

type Props = {
  task: {
    title: string;
    duration: string;
    unit: string;
    id: number;
  };
};

function Task({ task }: Props) {
  return (
    <Paper shadow="lg" p="md">
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
