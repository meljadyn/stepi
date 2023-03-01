import {
  Paper,
  TextInput,
  Button,
  Container,
  Title,
  NativeSelect,
  NumberInput,
  Group,
} from "@mantine/core";
import { TimeInput } from "@mantine/dates";
import { useForm, zodResolver } from "@mantine/form";
import { showNotification } from "@mantine/notifications";
import Head from "next/head";
import { useState } from "react";
import { taskCreateSchema } from "../../constants/schema/task.schema";

type Props = {
  projectId: number;
};

function CreateTask({ projectId }: Props) {
  const [loading, setLoading] = useState(false);

  const form = useForm({
    initialValues: {
      title: "",
      duration: 0,
      unit: "h",
    },

    validate: zodResolver(taskCreateSchema),
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

    const res = await fetch("/api/tasks", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...values, projectId }),
    });

    if (!res.ok) {
      form.setErrors({ title: "Something went wrong" });
      setLoading(false);
      return;
    }

    setLoading(false);
  };

  return (
    <Container size={420} my={40}>
      <Title
        align="center"
        sx={(theme) => ({ fontFamily: theme.fontFamily, fontWeight: 900 })}
      >
        Create Task
      </Title>
      <Paper withBorder shadow="md" p={30} mt={30} radius="md">
        <form onSubmit={form.onSubmit(handleSubmit, handleError)}>
          <TextInput
            label="Title"
            placeholder="Your task info"
            required
            {...form.getInputProps("title")}
          />
          <Group>
            <NumberInput
              label="Duration"
              min={0}
              precision={form.values.unit === "h" ? 2 : 0}
              step={form.values.unit === "h" ? 0.25 : 5}
              {...form.getInputProps("duration")}
            />

            <NativeSelect
              data={["h", "min"]}
              description="hours / minutes"
              withAsterisk
              {...form.getInputProps("unit")}
            />
          </Group>

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
  );
}

export default CreateTask;
