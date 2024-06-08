import { Modal } from 'antd';
import React from 'react';
import { useTranslation } from 'react-i18next';

interface IMasterModalProps {
  openModal: () => void;
  isModalOpen: boolean;
}

const MasterModal: React.FC<IMasterModalProps> = ({ openModal, isModalOpen }) => {
  const { t } = useTranslation();
  return (
    <>
      <Modal
        title={t("Download_pdf")}
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