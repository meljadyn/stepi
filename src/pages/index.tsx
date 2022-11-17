import Head from 'next/head'

import GoalChart from '../components/goal'
import Sidebar from '../components/navigation/Sidebar'

export default function Home() {
  return (
    <>
    <Head>
      <title>The Writer's Hub</title>
    </Head>
      <Sidebar />
      <GoalChart />
    </>
  )
}
