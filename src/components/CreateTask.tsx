import { useAppDispatch } from "../state/store";
import { createTask } from "../state/tasks/tasksSlice";
import { TaskForm, TaskFormProps } from "./TaskForm";
import { TaskModal, useModal } from "./TaskModal";

export function CreateTask() {
  const { ref, onClose, onOpen } = useModal();
  const dispatch = useAppDispatch();

  const handleOnSaveTask: TaskFormProps["onSubmit"] = (values) => {
    dispatch(createTask(values));
  };

  return (
    <>
      <button className="border border-slate-700 p-2" onClick={onOpen}>
        Create Task
      </button>
      <TaskModal modalRef={ref} onClose={onClose}>
        <TaskForm onSubmit={handleOnSaveTask} />
      </TaskModal>
    </>
  );
}
