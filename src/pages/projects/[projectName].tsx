import { Group } from "@mantine/core";
import { getToken } from "next-auth/jwt";
import Head from "next/head";
import { Sidebar } from "../../components/navigation/Sidebar";
import prisma from "../../lib/prisma";
import { GetServerSidePropsContext } from "next/types";
import CreateTask from "../../components/tasks/CreateTask";
import ShowTasks from "../../components/tasks/ShowTasks";

type Props = {
  project: {
    id: number;
    name: string;
    tasks: {
      id: number;
      title: string;
    }[];
  };
};

function Project({ project }: Props) {
  return (
    <>
      <Head>
        <title>{`${project.name} | Stepi`}</title>
      </Head>
      <Group>
        <Sidebar active="Project" />
        <Group>
          <CreateTask />
          <ShowTasks tasks={project.tasks} />
        </Group>
      </Group>
    </>
  );
}

export async function getServerSideProps({
  req,
  params,
}: GetServerSidePropsContext) {
  const session = await getToken({ req });
  const toHomepage = { destination: "/dashboard", permanent: false };

  if (!session || !params?.projectName) {
    return {
      redirect: toHomepage,
    };
  }

  const project = await prisma.project.findUnique({
    where: {
      userId_name: {
        userId: session.uid as string,
        name: params.projectName as string,
      },
    },
    select: {
      id: true,
      name: true,
      tasks: {
        select: {
          title: true,
          id: true,
        },
      },
    },
  });

  if (!project) {
    return {
      redirect: toHomepage,
    };
  }

  return {
    props: { project },
  };
}

export default Project;
