type TaskProps = { title: string; description?: string };

export function Task({ title, description }: TaskProps) {
  return (
    <article className="p-4">
      <header>
        <h1
          data-testid="task-title"
          className="text-2xl font-bold tracking-tight text-gray-900"
        >
          {title}
        </h1>
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
