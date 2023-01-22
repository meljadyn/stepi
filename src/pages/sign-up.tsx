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

function SignUp() {
    return (
        <Container size={420} my={40}>
          <Title
            align="center"
            sx={(theme) => ({ fontFamily: `Greycliff CF, ${theme.fontFamily}`, fontWeight: 900 })}
          >
            Welcome to Stepi!
          </Title>
          <Text color="dimmed" size="sm" align="center" mt={5}>
            Already have an account?{' '}
            <Anchor<'a'> href="#" size="sm" onClick={(event) => event.preventDefault()}>
              Sign in
            </Anchor>
          </Text>

          <Paper withBorder shadow="md" p={30} mt={30} radius="md">
            <TextInput label="Email" placeholder="Email" required />
            <PasswordInput label="Password" placeholder="Password" required mt="md" />
            <PasswordInput label="Confirm Password" placeholder="Password" required mt="md" />

            <Button color="indigo" fullWidth mt="xl">
              Sign Up
            </Button>
          </Paper>
        </Container>
    );
}

export default SignUp;
