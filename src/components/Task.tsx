import type { ChangeEvent } from "react";
import { STATUS_MAPPER } from "../consts/statuses";
import type { Statuses } from "../types/task";
import { isValidStatus } from "../validators/isValidStatus";

type TaskProps = {
  id: string;
  title: string;
  description?: string;
  status?: string;
  onUpdateStatus?: (id: string, status: Statuses) => void;
};

export function Task({
  id,
  title,
  description,
  status,
  onUpdateStatus,
}: TaskProps) {
  const handleOnUpdateStatus = (event: ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;

    if (isValidStatus(value)) {
      onUpdateStatus?.(id, value);
    }
  };

  return (
    <article className="p-4">
      <header className="flex justify-between">
        <h1
          data-testid="task-title"
          className="text-2xl font-bold tracking-tight text-gray-900"
        >
          {title}
        </h1>
        <label htmlFor="task-status" className="sr-only">
          Update task status
        </label>
        <select id="task-status" value={status} onChange={handleOnUpdateStatus}>
          {Array.from(STATUS_MAPPER.entries()).map(([value, key]) => (
            <option key={key} value={key}>
              {value}
            </option>
          ))}
        </select>
      </header>
      <hr />
      {description && (
        <p
          data-testid="task-description"
          className="mt-2 text-lg leading-8 text-gray-600"
        >
          {description}
        </p>
      )}
    </article>
  );
}
