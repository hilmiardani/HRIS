import { Modal } from '@mantine/core';

interface FilterProps {
  opened: boolean;
  title: React.ReactNode;
  setOpened?: any;
  children: any;
  classNames?: any
  className?: any
  onClose: () => void
  largeModal?: boolean
}

function ModalGlobal({ children, opened, setOpened, onClose, title, classNames, className, largeModal }: FilterProps) {
  return (
    <Modal
      opened={opened}
      onClose={onClose}
      centered
      title={title}
      classNames={classNames}
      styles={{ header: { borderTopLeftRadius: '8px', borderTopRightRadius: '8px' } }}
      className={className}
      size={largeModal ? '60%' : undefined}
    >
      {children}
    </Modal>
  );
}

export default ModalGlobal;
