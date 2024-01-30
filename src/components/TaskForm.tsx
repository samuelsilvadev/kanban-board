import { FormEvent } from "react";

type Values = { title: string; description: string };

export type TaskFormProps = {
  values?: Partial<Values>;
  onSubmit: (values: Values) => void;
};

export function TaskForm({ values, onSubmit }: TaskFormProps) {
  const handleOnSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    onSubmit({
      description: formData.get("description")?.toString() ?? "",
      title: formData.get("title")?.toString() ?? "",
    });
  };

  return (
    <form className="flex flex-col gap-2 p-2" onSubmit={handleOnSubmit}>
      <div className="flex flex-col">
        <label htmlFor="title">Task Name</label>
        <input
          type="text"
          id="title"
          name="title"
          className="border border-slate-700"
          defaultValue={values?.title}
        />
      </div>
      <div className="flex flex-col">
        <label htmlFor="description">Task Description</label>
        <input
          type="text"
          id="description"
          name="description"
          className="border border-slate-700"
          defaultValue={values?.description}
        />
      </div>
      <button className="border border-slate-700 p-2">Save</button>
    </form>
  );
}
