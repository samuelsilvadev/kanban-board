import { Schema } from "normalizr";
import { projectsSchema, taskSchema } from "../schemas";

export type Resources = "projects" | "task";

export const RESOURCE_TO_SCHEMAS = new Map<Resources, Schema>([
  ["projects", [projectsSchema]],
  ["task", taskSchema],
]);
