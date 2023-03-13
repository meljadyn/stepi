export interface FrontFacingTask {
  id: number;
  title: string;
  duration: number | null;
  unit: string | null;
  children: FrontFacingTask[];
}

export interface FrontFacingProject {
  id: number;
  name: string;
  tasks: FrontFacingTask[];
}
