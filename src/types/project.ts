import { RawTaskModel } from "./task";

export type ProjectModel = {
  id: string;
  title: string;
  description: string;
  tasks: RawTaskModel[];
};

export type ProjectView = Omit<ProjectModel, "tasks"> & { tasks: string[] };
