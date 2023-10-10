export type Statuses = "OPEN" | "IN_PROGRESS" | "DONE";

export type TaskModel = {
  id: string;
  title: string;
  description: string;
  status: Statuses;
};
