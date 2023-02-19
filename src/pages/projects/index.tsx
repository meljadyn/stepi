import { Anchor, Group, Paper, List } from "@mantine/core";
import { getToken } from "next-auth/jwt";
import Head from "next/head";
import { Text } from "@mantine/core";
import { Sidebar } from "../../components/navigation/Sidebar";
import prisma from "../../lib/prisma";
import { GetServerSidePropsContext } from "next/types";

type Props = {
  projects: {
    name: string;
    id: number;
  }[];
};

function NewProject(props: Props) {
  const { projects } = props;

  return (
    <>
      <Head>
        <title>Projects | Stepi</title>
      </Head>
      <Group>
        <Sidebar active="Projects" />
        {projects.length > 1 ? (
          <List sx={{ listStyleType: "none" }}>
            {projects.map((project) => (
              <li key={project.id}>
                <Anchor href={`/projects/${project.name}`}>
                  <Paper shadow="sm" sx={{ padding: "40px" }}>
                    {project.name}
                  </Paper>
                </Anchor>
              </li>
            ))}
          </List>
        ) : (
          <Paper sx={{ padding: "10px" }}>
            <Text>You don't seem to have any projects!</Text>
            <Anchor href="/projects/new">Create one?</Anchor>
          </Paper>
        )}
      </Group>
    </>
  );
}

export async function getServerSideProps({ req }: GetServerSidePropsContext) {
  const session = await getToken({ req });

  const projects = await prisma.project.findMany({
    where: {
      userId: {
        equals: session?.sub,
      },
    },
    select: {
      name: true,
      id: true,
    },
  });

  return {
    props: { projects },
  };
}

export default NewProject;
