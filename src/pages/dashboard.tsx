import Head from "next/head";
import { AppShell, filterProps, Group, Title } from "@mantine/core";
import Sidebar from "../components/navigation/Sidebar";
import Navbar from "../components/navigation/Navbar";
import { getToken } from "next-auth/jwt";
import prisma from "../lib/prisma";
import { GetServerSidePropsContext } from "next/types";
import { useEffect, useState } from "react";
import { FrontFacingProject } from "../constants/types/database.types";
import Project from "../components/projects/Project";

type Props = {
  projects: {
    id: number;
    name: string;
  }[];
};

function Dashboard({ projects }: Props) {
  const [projectId, setProjectId] = useState<number | null>(null);
  const [project, setProject] = useState<FrontFacingProject | null>(null);

  useEffect(() => {
    if (projectId) {
      fetch(`/api/projects/${projectId}`)
        .then((res) => res.json())
        .then((data) => setProject(data.project));
    }
  }, [projectId]);

  return (
    <>
      <Head>
        <title>Dashboard | Stepi</title>
      </Head>
      <AppShell
        padding="md"
        header={<Navbar />}
        navbar={
          <Sidebar
            projects={projects}
            active="Home"
            projectId={projectId}
            setProjectId={setProjectId}
          />
        }
      >
        {project && <Project project={project} />}
      </AppShell>
    </>
  );
}

// Retrieves project information
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

export default Dashboard;
