import { STATUS_MAPPER } from "../consts/statuses";

type TaskProps = { title: string; description?: string; status?: string };

const noop = () => void 0;

export function Task({ title, description, status }: TaskProps) {
  return (
    <article className="p-4">
      <header className="flex justify-between">
        <h1
          data-testid="task-title"
          className="text-2xl font-bold tracking-tight text-gray-900"
        >
          {title}
        </h1>
        <select value={status} onChange={noop}>
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
