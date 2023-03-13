import { Group } from "@mantine/core";
import Head from "next/head";
import { Sidebar } from "../../components/navigation/Sidebar";
import CreateProject from "../../components/projects/CreateProject";

function NewProject() {
  return (
    <>
      <Head>
        <title>New Project | Stepi</title>
      </Head>
      <Group>
        {/* <Sidebar active="New Project" /> */}
        <CreateProject />
      </Group>
    </>
  );
}

export default NewProject;
