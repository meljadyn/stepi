import {
  Paper,
  TextInput,
  Button,
  Container,
  NativeSelect,
  NumberInput,
  Group,
} from "@mantine/core";
import { useForm, zodResolver } from "@mantine/form";
import { showNotification } from "@mantine/notifications";
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
    <Container>
      <Paper shadow="lg" p="md">
        <form onSubmit={form.onSubmit(handleSubmit, handleError)}>
          <Group>
            <TextInput
              label="Title"
              placeholder="+ Create new task"
              required
              {...form.getInputProps("title")}
            />

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

            <Button color="indigo" mt="xl" type="submit" loading={loading}>
              +
            </Button>
          </Group>
        </form>
      </Paper>
    </Container>
  );
}

export default CreateTask;
