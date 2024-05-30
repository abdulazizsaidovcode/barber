import { Modal } from 'antd';
import React from 'react';

interface IClientModalProps {
  openModal: () => void;
  isModalOpen: boolean;
}

const ClientModal: React.FC<IClientModalProps> = ({ openModal, isModalOpen }) => {
  return (
    <Modal
      title="Download PDF"
      open={isModalOpen}
      onCancel={openModal}
      footer={null}
      centered
    >
      <p>Some contents...</p>
      <p>Some contents...</p>
      <p>Some contents...</p>
    </Modal>
  );
};

export default ClientModal;
