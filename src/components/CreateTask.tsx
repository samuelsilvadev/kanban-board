import { useSelectedProject } from "../state/hooks/useSelectedProject";
import { useAppDispatch } from "../state/store";
import { createTask } from "../state/tasks/tasksSlice";
import { TaskForm, TaskFormProps } from "./TaskForm";
import { TaskModal, useModal } from "./TaskModal";

export function CreateTask() {
  const { ref, onClose, onOpen } = useModal();
  const dispatch = useAppDispatch();
  const { selectedProjectId } = useSelectedProject();

  const handleOnSaveTask: TaskFormProps["onSubmit"] = (values) => {
    if (!selectedProjectId) {
      // TODO: show error message
      // when would this happen?
      return;
    }

    dispatch(createTask({ ...values, projectId: selectedProjectId }));
  };

  return (
    <>
      <button
        className="border border-slate-700 px-4 py-2 flex-shrink-0"
        onClick={onOpen}
      >
        Create Task
      </button>
      <TaskModal modalRef={ref} onClose={onClose}>
        <TaskForm onSubmit={handleOnSaveTask} />
      </TaskModal>
    </>
  );
}
