import { ReactNode } from "react";
import Modal from "react-modal";

interface PropsInterface {
  isOpen: boolean;
  handleClose: () => {};
  renderProps: () => ReactNode;
}

const BaseModal: any = ({
  isOpen,
  handleClose,
  renderProps,
}: PropsInterface) => {
  return (
    <Modal isOpen={isOpen} onRequestClose={handleClose}>
      {renderProps()}
    </Modal>
  );
};

export default BaseModal;
