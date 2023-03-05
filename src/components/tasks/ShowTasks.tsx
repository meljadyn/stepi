import { List, Container } from "@mantine/core";
import CreateTask from "./CreateTask";
import Task from "./Task";

type Props = {
  tasks: {
    title: string;
    duration: string;
    unit: string;
    id: number;
  }[];
};

function ShowTasks(props: Props) {
  const { tasks } = props;

  return (
    <Container w="100%">
      {tasks && (
        <List sx={{ listStyleType: "none" }}>
          {tasks.map((task) => (
            <li key={task.id}>
              <Task task={task} />
            </li>
          ))}
        </List>
      )}
    </Container>
  );
}

export default ShowTasks;
