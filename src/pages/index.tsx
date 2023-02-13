import Head from 'next/head'
import { Title } from '@mantine/core';
import { getServerSession } from "next-auth/next";
import type { GetServerSidePropsContext } from "next";
import { authOptions } from "../pages/api/auth/[...nextauth]";
import LandingNavbar from "../components/navigation/LandingNavbar";

function Home() {
  return (
    <>
      <Head>
        <title>Stepi</title>
      </Head>
      <LandingNavbar />
    </>
  );
}

// Redirect to /dashboard if user is logged in
export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = await getServerSession(context.req, context.res, authOptions);

  if (session) {
    return {
      redirect: {
        destination: "/dashboard",
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
}

export default Home;
