import Head from "next/head";
import { AppShell, Group, Title } from "@mantine/core";
import Sidebar from "../components/navigation/Sidebar";
import Navbar from "../components/navigation/Navbar";

function Dashboard() {
  return (
    <>
      <Head>
        <title>Dashboard | Stepi</title>
      </Head>
      <AppShell
        padding="md"
        header={<Navbar />}
        navbar={<Sidebar active="Home" />}
      >
        <Title>Dashboard</Title>
      </AppShell>
    </>
  );
}

export default Dashboard;
