import React from "react";
import Modal, { ModalRef } from "@/shared/components/Modal";
import { Button } from "@mantine/core";

interface ConfirmationModalProps {
  modalRef: React.RefObject<ModalRef>;
  title: string;
  content: React.ReactNode;
  boldContent?: React.ReactNode;
  onConfirm: () => void;
  onCancel: () => void;
}

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
  modalRef,
  title,
  content,
  boldContent,
  onConfirm,
  onCancel,
}) => {
  return (
    <Modal ref={modalRef}>
      <div className="flex flex-col gap-4">
        <h1 className="mb-4">{title}</h1>
        <div>
          { !boldContent && <p>{content}</p> }
          { boldContent && <p>{content} <b>{boldContent}</b>?</p> }
        </div>
      </div>
      <div className="flex w-full mt-4 justify-end">
        <Button className="mr-3" onClick={onConfirm}>
          Yes
        </Button>
        <Button variant="outline" onClick={onCancel}>
          Cancel
        </Button>
      </div>
    </Modal>
  );
};

export default ConfirmationModal;