import { Modal as MantineModal } from "@mantine/core";
import Close from "icons/Close";
import {
  forwardRef,
  ForwardRefRenderFunction,
  ReactNode,
  useImperativeHandle,
  useState,
} from "react";

export interface ModalRef {
  openModal(): void;
  closeModal(): void;
}
const Modal: ForwardRefRenderFunction<ModalRef,
  {
    children: ReactNode;
    classNames?: { body?: string; modal?: string };
    onClose?: () => void;
    largeModal?: boolean
  }
> = ({ children, classNames, onClose = () => { }, largeModal }, ref) => {
  useImperativeHandle(ref, () => ({
    openModal() {
      setOpen(true);
    },
    closeModal() {
      setOpen(false);
    },
  }));
  const [open, setOpen] = useState(false);
  const handleClose = () => {
    setOpen(false);
    onClose();
  };
  return (
    <MantineModal
      opened={open}
      onClose={handleClose}
      withCloseButton={false}
      closeOnClickOutside={true}
      centered={true}
      size={largeModal ? '60%' : undefined}
    >
      <button className="absolute right-4 top-4 z-10" onClick={handleClose}>
        <Close className="w-4" />
      </button>
      {children}
    </MantineModal>
  );
};
export default forwardRef(Modal);
