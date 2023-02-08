import {
    TextInput, PasswordInput, Anchor, Paper, Title, Text, Container, Button,
} from '@mantine/core';
import { useForm, zodResolver } from '@mantine/form';
import { showNotification } from '@mantine/notifications';
import { userCreateSchema } from '../constants/schema/user.schema';

import Head from "next/head";
import React from 'react';
import { useState } from "react"
import { signIn } from "next-auth/react";

// todo: add a user cookie when account creation is successful
// todo: redirect user to the homepage

function SignUp() {
  const [loading, setLoading] = useState(false);

  const form = useForm({
    initialValues: {
      email: "",
      password: "",
      confirmation: "",
    },

    validate: zodResolver(userCreateSchema),
    validateInputOnBlur: true,
  });

  const handleError = () => {
    showNotification({
      message: "Please fill out all required fields appropriately",
      color: "red",
    });
  };

  const handleSubmit = async (values: typeof form.values) => {
    if (loading) return;
    setLoading(true);

    const res = await fetch("/api/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    });

    if (!res.ok) {
      form.setErrors({ email: "Email is already in use" });
      setLoading(false);
      return;
    }

    signIn("credentials", { email: values.email, password: values.password });
    setLoading(false);
  };

  return (
    <>
      <Head>
        <title>Sign Up | Stepi</title>
      </Head>
      <Container size={420} my={40}>
        <Title
          align="center"
          sx={(theme) => ({ fontFamily: theme.fontFamily, fontWeight: 900 })}
        >
          Welcome to Stepi!
        </Title>
        <Text color="dimmed" size="sm" align="center" mt={5}>
          Already have an account?{" "}
          <Anchor<"a"> href="/sign-in" size="sm">
            Sign in
          </Anchor>
        </Text>

        <Paper withBorder shadow="md" p={30} mt={30} radius="md">
          <form onSubmit={form.onSubmit(handleSubmit, handleError)}>
            <TextInput
              label="Email"
              placeholder="Email"
              required
              {...form.getInputProps("email")}
            />
            <PasswordInput
              label="Password"
              placeholder="Password"
              required
              {...form.getInputProps("password")}
              mt="md"
            />
            <PasswordInput
              label="Confirm Password"
              placeholder="Password"
              required
              {...form.getInputProps("confirmation")}
              mt="md"
            />

            <Button
              color="indigo"
              fullWidth
              mt="xl"
              type="submit"
              loading={loading}
            >
              Sign Up
            </Button>
          </form>
        </Paper>
      </Container>
    </>
  );
}

export default SignUp;
