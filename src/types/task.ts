export type Statuses = "OPEN" | "IN_PROGRESS" | "DONE";

export type TaskModel = {
  status: Statuses;
} & Omit<RawTaskModel, "status">;

export type RawTaskModel = {
  id: string;
  title: string;
  description: string;
  status: string;
  projectId: string;
};

export type CreateTaskBody = Pick<
  RawTaskModel,
  "title" | "description" | "status" | "projectId"
>;

export type TaskView = TaskModel & { timerSpend: number };
