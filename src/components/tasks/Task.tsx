import { Group, Paper } from "@mantine/core";

type Props = {
  task: {
    title: String;
  };
};

function Task({ task }: Props) {
  return (
    <Paper shadow="lg" p="md">
      <Group>{task.title}</Group>
    </Paper>
  );
}

export default Task;
