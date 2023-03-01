import { List, Container } from "@mantine/core";
import Task from "./Task";

type Props = {
  tasks: {
    title: string;
    id: number;
  }[];
};

function ShowTasks(props: Props) {
  const { tasks } = props;

  return (
    <Container>
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
