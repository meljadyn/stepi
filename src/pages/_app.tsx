import { AppProps } from 'next/app';
import Head from 'next/head';
import { MantineProvider } from '@mantine/core';
import { NotificationsProvider } from '@mantine/notifications';
import { SessionProvider } from "next-auth/react";
import React from "react";

export default function App(props: AppProps) {
  const { Component, pageProps } = props;

  return (
    <>
      <Head>
        <title>Page title</title>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
      </Head>

      <MantineProvider
        withGlobalStyles
        withNormalizeCSS
        theme={{
          /** Put your mantine theme override here */
          fontFamily: "Poppins, sans-serif",
          colorScheme: "light",
        }}
      >
        <NotificationsProvider>
          <SessionProvider>
            <Component {...pageProps} />
          </SessionProvider>
        </NotificationsProvider>
      </MantineProvider>
    </>
  );
}
