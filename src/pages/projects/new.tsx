import {
  Button,
  Container,
  Group,
  Paper,
  TextInput,
  Title,
} from "@mantine/core";
import { useForm, zodResolver } from "@mantine/form";
import Head from "next/head";
import { useState } from "react";
import { projectCreateSchema } from "../../constants/schema/project.schema";
import { Sidebar } from "../../components/navigation/Sidebar";
import CreateProject from "../../components/projects/CreateProject";

function NewProject() {
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
    <>
      <Head>
        <title>New Project | Stepi</title>
      </Head>
      <Group>
        <Sidebar active="New Project" />
        <CreateProject />
      </Group>
    </>
  );
}

export default NewProject;
