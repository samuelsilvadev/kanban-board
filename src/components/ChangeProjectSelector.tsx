import { useProjects } from "../state/hooks/useProjects";
import { useSelectedProject } from "../state/hooks/useSelectedProject";

export function ChangeProjectSelector() {
  const { projects } = useProjects();
  const { selectedProjectId, setProjectId } = useSelectedProject();

  const handleOnChange: React.ChangeEventHandler<HTMLSelectElement> = (
    event
  ) => {
    setProjectId(event.target.value);
  };

  return (
    <div className="w-full">
      <label htmlFor="project" className="text-sm text-gray-500">
        Select project:
      </label>
      <select
        id="project"
        className="w-full p-4 text-lg text-gray-900 border border-slate-700"
        value={selectedProjectId ?? ""}
        onChange={handleOnChange}
      >
        {projects.map((project) => (
          <option key={project.id} value={project.id}>
            {project.title}
          </option>
        ))}
      </select>
    </div>
  );
}
