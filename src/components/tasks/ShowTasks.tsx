import { Anchor, Group, Paper, List, Container } from "@mantine/core";
import Head from "next/head";
import { Sidebar } from "../../components/navigation/Sidebar";
import prisma from "../../lib/prisma";
import { GetServerSidePropsContext } from "next/types";
import formatDuration from "date-fns/formatDuration";
import format from "date-fns/format";

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
              <Anchor href={`/projects/${task.title}`}>
                <Paper shadow="sm" sx={{ padding: "40px" }}>
                  {task.title}
                </Paper>
              </Anchor>
            </li>
          ))}
        </List>
      )}
    </Container>
  );
}

export default ShowTasks;
