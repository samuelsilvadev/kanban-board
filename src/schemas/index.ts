import { schema } from "normalizr";
import { ProjectModel } from "../types/project";
import { TaskModel } from "../types/task";

export const taskSchema = new schema.Entity<TaskModel>("tasks");

export const projectsSchema = new schema.Entity<ProjectModel[]>("projects", {
  tasks: [taskSchema],
});
