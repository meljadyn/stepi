import { Anchor, Group, Paper, List, filterProps } from "@mantine/core";
import { getToken } from "next-auth/jwt";
import Head from "next/head";
import { Text } from "@mantine/core";
import { Sidebar } from "../../components/navigation/Sidebar";
import prisma from "../../lib/prisma";
import { GetServerSidePropsContext } from "next/types";
import { useRouter } from "next/router";
import CreateTask from "../../components/tasks/CreateTask";
import ShowTasks from "../../components/tasks/ShowTasks";

type Props = {
  tasks: {
    title: string;
    id: number;
  }[];
};

function Project(props: Props) {
  const router = useRouter();
  const { projectName } = router.query;

  return (
    <>
      <Head>
        <title>{`${projectName} | Stepi`}</title>
      </Head>
      <Group>
        <Sidebar active="Projects" />
        <Group>
          <CreateTask />
          <ShowTasks tasks={props.tasks} />
        </Group>
      </Group>
    </>
  );
}

export async function getServerSideProps({ req }: GetServerSidePropsContext) {
  const tasks = await prisma.task.findMany({
    where: {
      projectId: {
        equals: 1,
      },
    },
    select: {
      id: true,
      title: true,
    },
  });

  return {
    props: { tasks },
  };
}

export default Project;
