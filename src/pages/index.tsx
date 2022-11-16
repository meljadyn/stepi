// import Head from 'next/head'
// import Image from 'next/image'
// import styles from '../styles/Home.module.css'
// import { Heading } from '@chakra-ui/react'

import GoalChart from '../components/goal'
import Sidebar from '../components/navigation/Sidebar'

export default function Home() {
  return (
    <>
      <Sidebar />
      <GoalChart />
    </>
  )
}
