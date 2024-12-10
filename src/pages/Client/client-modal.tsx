import TextArea from 'antd/es/input/TextArea';
import React from 'react';
import { useTranslation } from 'react-i18next';
import Modal from '../../components/modals/modal';
import { handleSendMessage } from '../../helpers/api-function/client/clientFilter';
import { Buttons } from '../../components/buttons';
import clientFilterStore from '../../helpers/state_managment/client/clientFilterStore';

const ClientModal: React.FC = () => {
  const { t } = useTranslation()
  const { isMessageModal, setMessage, message, setIsMessageModal, id } = clientFilterStore()
  const closeModal = () => setIsMessageModal(!isMessageModal)

  return (
    <Modal isOpen={isMessageModal} onClose={closeModal}>
      <div className="w-[45rem]">
        <p className="text-2xl text-black dark:text-white">
          {t('Send_Message')}:
        </p>
        <TextArea
          className="mt-4"
          rows={4}
          placeholder={t('Enter_your_message')}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <div className="flex justify-center mt-2">
          <Buttons
            key="submit"
            onClick={() => {
              handleSendMessage(id, message, closeModal)
              setMessage("")
            }}
          >
            {t('Send')}
          </Buttons>
        </div>
      </div>
    </Modal>
  );
};

export default ClientModal;
