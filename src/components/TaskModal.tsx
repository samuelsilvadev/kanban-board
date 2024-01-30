import { MutableRefObject, ReactNode, useRef } from "react";

type TaskModalProps = {
  modalRef: MutableRefObject<HTMLDialogElement | null>;
  onClose: () => void;
  children: ReactNode;
};

export function TaskModal({ modalRef, children, onClose }: TaskModalProps) {
  return (
    <dialog
      className="py-2 px-6 pr-10 min-w-[320px] min-h-[100px] relative"
      ref={modalRef}
    >
      <button
        className="border border-slate-700 p-1 absolute right-2 top-2 w-8 h-8"
        onClick={onClose}
      >
        X
      </button>
      <div>{children}</div>
    </dialog>
  );
}

export function useModal() {
  const ref = useRef<HTMLDialogElement>(null);

  const handleOnClose = () => {
    ref.current?.close();
  };

  const handleOnOpen = () => {
    ref.current?.showModal();
  };

  return { ref, onClose: handleOnClose, onOpen: handleOnOpen };
}
