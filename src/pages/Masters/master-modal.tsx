import { Modal } from 'antd';
import React from 'react';

interface IMasterModalProps {
  openModal: () => void;
  isModalOpen: boolean;
}

const MasterModal: React.FC<IMasterModalProps> = ({ openModal, isModalOpen }) => {
  return (
    <>
      <Modal
        title="Basic Modal"
        open={isModalOpen}
        onCancel={openModal}
        footer={null}
        centered
      >
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Modal>
    </>
  );
};

export default MasterModal;