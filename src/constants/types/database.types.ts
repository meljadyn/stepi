export interface FrontFacingTask {
  id: number;
  title: string;
  duration: string;
  unit: string;
  children: FrontFacingTask[];
}

export interface FrontFacingProject {
  id: number;
  name: string;
  tasks: FrontFacingTask[];
}
