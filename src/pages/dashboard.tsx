import Head from "next/head";
import { Group, Title } from "@mantine/core";
import Sidebar from "../components/navigation/Sidebar";

function Dashboard() {
  return (
    <>
      <Head>
        <title>Dashboard | Stepi</title>
      </Head>
      <Group>
        <Sidebar />
        <Title>Dashboard</Title>
      </Group>
    </>
  );
}

export default Dashboard;
