import { Button, Container, Paper, TextInput, Title } from "@mantine/core";
import { useForm, zodResolver } from "@mantine/form";
import { useState } from "react";
import { projectCreateSchema } from "../../constants/schema/project.schema";

function CreateProject() {
  const [loading, setLoading] = useState(false);
  const form = useForm({
    initialValues: {
      name: "",
    },
    validate: zodResolver(projectCreateSchema),
  });

  const handleSubmit = async (values: typeof form.values) => {
    console.log(values);
  };

  return (
    <Container size={420} my={40}>
      <Title
        align="center"
        sx={(theme) => ({
          fontFamily: `Greycliff CF, ${theme.fontFamily}`,
          fontWeight: 900,
        })}
      >
        Create Project
      </Title>

      <Paper shadow="md" p={30} mt={30} radius="md">
        <form onSubmit={form.onSubmit(handleSubmit, () => form.errors)}>
          <TextInput
            label="name"
            placeholder="Project Name"
            required
            {...form.getInputProps("name")}
          />
          <Button
            color="indigo"
            fullWidth
            mt="xl"
            type="submit"
            loading={loading}
          >
            Create Project
          </Button>
        </form>
      </Paper>
    </Container>
  );
}

export default CreateProject;
