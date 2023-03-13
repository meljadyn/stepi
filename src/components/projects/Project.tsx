import { Stack, Title } from "@mantine/core";
import CreateTask from "../tasks/CreateTask";
import ShowTasks from "../tasks/ShowTasks";
import { FrontFacingProject } from "../../constants/types/database.types";

type Props = {
  project: FrontFacingProject;
};

function Project({ project }: Props) {
  return (
    <Stack>
      <Title>{project.name}</Title>
      <CreateTask projectId={project.id} />
      <ShowTasks key={project.id} tasks={project.tasks} />
    </Stack>
  );
}

export default Project;
