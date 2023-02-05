import {
    TextInput,
    PasswordInput,
    Checkbox,
    Anchor,
    Paper,
    Title,
    Text,
    Container,
    Group,
    Button,
  } from '@mantine/core';

import { useForm, zodResolver } from "@mantine/form";
import { showNotification } from "@mantine/notifications";

import Head from "next/head";
import { useState } from "react";

import { sessionCreateSchema } from '../constants/schema/session.schema';

function LogIn() {
  const [loading, setLoading] = useState(false);

  const form = useForm({
    initialValues: {
      email: '',
      password: ''
    },
    validate: zodResolver(sessionCreateSchema),
    validateInputOnBlur: true
  })

  const handleSubmit = async (values: typeof form.values) => {
    if (loading) return;
    setLoading(true);

    const res = await fetch('/api/sessions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(values)
    });

    if (!res.ok) {
      form.setErrors({ email: "Email and password combination not valid" });
      setLoading(false)
      return
    }

    const data = await res.json();

    showNotification({
      message: `User ${data.id} has started a new session`,
      color: "green"
    })

    setLoading(false)
  }

  return (
  <>
    <Head>
        <title>Login | Stepi</title>
    </Head>
    <Container size={420} my={40}>
        <Title
        align="center"
        sx={(theme) => ({ fontFamily: `Greycliff CF, ${theme.fontFamily}`, fontWeight: 900 })}
        >
        Welcome back!
        </Title>
        <Text color="dimmed" size="sm" align="center" mt={5}>
        Do not have an account yet?{' '}
        <Anchor<'a'> href="#" size="sm" onClick={(event) => event.preventDefault()}>
            Create account
        </Anchor>
        </Text>

        <Paper shadow="md" p={30} mt={30} radius="md">
        <form onSubmit={
          form.onSubmit(
            handleSubmit,
            () => form.setErrors({ email: "Please fill out all fields appropriately" })
        )}>
          <TextInput
            label="Email"
            placeholder="Email"
            required
            {...form.getInputProps('email')}
          />
          <PasswordInput
            label="Password"
            placeholder="Password"
            required mt="md"
            {...form.getInputProps('password')}
          />
          <Group position="apart" mt="lg">
              <Checkbox label="Remember me" sx={{ lineHeight: 1 }} />
              <Anchor<'a'> onClick={(event) => event.preventDefault()} href="#" size="sm">
              Forgot password?
              </Anchor>
          </Group>
          <Button color="indigo" fullWidth mt="xl" type="submit" loading={loading}>
            Log In
          </Button>
        </form>
        </Paper>
    </Container>
  </>
)
}

export default LogIn
