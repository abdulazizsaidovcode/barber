import { DeleteOutlined, CheckOutlined } from '@ant-design/icons';
import React, { useState } from 'react';
import { Button, message, Input } from 'antd';
import {
  master_delate_service,
  master_confirm_new_service,
  master_delate_new_service,
  post_message_api,
} from '../../helpers/api';
import axios from 'axios';
import { config } from '../../helpers/token';
import Modal from '../modals/modal';
import { Buttons } from '../buttons';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';

const { TextArea } = Input;

interface ProceduresProps {
  title: string;
  imgUrl: string;
  price: number;
  duration: number;
  description: string;
  serviceStatus: string;
  servicesId: string;
}

const MasterProcedures: React.FC<ProceduresProps> = ({
  title,
  imgUrl,
  price,
  duration,
  description,
  serviceStatus,
  servicesId,
}) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isSecondModalVisible, setIsSecondModalVisible] = useState(false);
  const [value, setValue] = useState('');
  const [currentServiceId, setCurrentServiceId] = useState<string>(servicesId);

  console.log(currentServiceId);

  const showModal = () => {
    setIsModalVisible(true);
  };
  const location = useLocation();

  const id = location.pathname.substring(8);
  const hideModal = () => {
    setIsModalVisible(false);
  };

  const showSecondModal = () => {
    setIsSecondModalVisible(true);
  };

  const hideSecondModal = () => {
    setIsSecondModalVisible(false);
  };
  const { t } = useTranslation();

  const handleDelete = async (apiEndpoint: string) => {
    try {
      const response = await axios.delete(
        `${apiEndpoint}${currentServiceId}`,
        config,
      );
      if (response.status === 200) {
        message.success('Procedure deleted successfully');
      } else {
        throw new Error('Failed to delete procedure');
      }
    } catch (error) {
      message.error('An error occurred while deleting the procedure');
    }
  };

  const handleConfirm = async () => {
    try {
      const response = await axios.put(
        `${master_confirm_new_service}${servicesId}`,
        '',
        config,
      );

      if (response.status === 200) {
        message.success('Procedure confirmed successfully');
        const updatedServiceId = response.data.servicesId;
        setCurrentServiceId(updatedServiceId);
      } else {
        throw new Error('Failed to confirm procedure');
      }
    } catch (error) {
      message.error('An error occurred while confirming the procedure');
    }
  };

 

  const handleDeleteAndMessage = async () => {
    try {
      await handleDelete(master_delate_new_service);
      await axios.post(
        post_message_api,
        {
          clientId: null,
          masterId: id,
          adminId: null,
          message: value,
          messageStatus: 'ADMIN_MASTER_MESSAGE_FOR_DELETE',
          read: true,
        },
        config,
      );
      message.success('Procedure deleted and message sent successfully');
    } catch (error) {
      message.error('An error occurred while deleting and sending the message');
    }
    hideSecondModal();
  };

  const handleDeleteWithMessage = async () => {
    hideModal();
    try {
      await axios.post(post_message_api, { message: value }, config);
      showSecondModal();
    } catch (error) {
      message.error('An error occurred while sending the message');
    }
  };

  return (
    <div className="flex w-full lg:w-[100%] bg-white dark:bg-[#ffffffdf] text-black dark:text-black border-gray-300 shadow-lg p-3 rounded-xl mb-4">
      <div className="w-1/3">
        <img
          src={imgUrl}
          alt="Procedure"
          className="w-[50%] ml-6 h-auto rounded"
        />
      </div>
      <div className="w-2/3 pl-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold mb-2 text-black">{title}</h2>
          <div className="flex items-center">
            {serviceStatus !== 'APPROVED' && (
              <div
                className="p-1 bg-gray rounded-md flex items-center cursor-pointer shadow-3 justify-center mr-2"
                onClick={handleConfirm}
              >
                <CheckOutlined />
              </div>
            )}
            {serviceStatus === 'APPROVED' ? (
              <div
                className="p-1 bg-gray rounded-md flex items-center cursor-pointer shadow-3 justify-center"
                onClick={showModal}
              >
                <DeleteOutlined />
              </div>
            ) : (
              <div
                className="p-1 bg-gray rounded-md flex items-center cursor-pointer shadow-3 justify-center"
                onClick={showModal}
              >
                <DeleteOutlined />
              </div>
            )}
          </div>
        </div>
        <div className="flex items-center w-full h-[1px] bg-black"></div>
        <div className="flex items-start mt-4 flex-col">
          <div className="mb-2 flex items-center justify-between gap-8 lg:justify-start">
            <p className="font-bold">Цена:</p>
            <p>{price} сум</p>
          </div>
          <div className="mb-2 flex items-center justify-between gap-6 lg:justify-start">
            <p className="font-bold">Длительность:</p>
            <p>
              {Math.floor(duration / 60)} час {duration % 60} минут
            </p>
          </div>
        </div>
        <div
          className={`p-1 text-white px-4 rounded-xl cursor-pointer ${
            serviceStatus === 'APPROVED' ? 'bg-green-500' : 'bg-red-500'
          }`}
        >
          {serviceStatus}
        </div>
        <div className="mb-2 flex items-center justify-between gap-6 lg:justify-start">
          <p className="font-bold">Описание:</p>
          <p>{description}</p>
        </div>
        <div className="flex items-center mb-2">
          <span
            className={`inline-block px-2 py-1 text-sm font-semibold rounded ${
              serviceStatus === 'APPROVED'
                ? 'bg-green-200 text-green-800'
                : 'bg-red-200 text-red-800'
            }`}
          >
            {serviceStatus === 'APPROVED' ? 'Одобрена' : 'Новая или измененная'}
          </span>
        </div>
      </div>
      <Modal isOpen={isModalVisible} onClose={hideModal}>
        <div className="w-[12rem] sm:w-[18rem] md:w-[25rem] lg:w-[30rem]">
          <p>Are you sure you want to delete this procedure?</p>
          <TextArea
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="Optional comment"
            autoSize={{ minRows: 3, maxRows: 5 }}
          />
          <div className="flex justify-end gap-2">
            <Button key="cancel" onClick={hideModal}>
              Cancel
            </Button>
            <Button key="delete" danger onClick={handleDeleteWithMessage}>
              Send
            </Button>
          </div>
        </div>
      </Modal>
      <Modal isOpen={isSecondModalVisible} onClose={hideSecondModal}>
        <div className={`w-[12rem] sm:w-[18rem] md:w-[25rem] lg:w-[30rem]`}>
          <div className={`flex flex-col justify-center`}>
            <p
              className={`font-bold text-xl text-black dark:text-white opacity-80 text-center`}
            >
              Rostan Ham Masterni uchiraszmi ?
            </p>
          </div>
          <div className={`flex justify-center items-center gap-10 mt-8`}>
            <Buttons bWidth={`w-[200px]`} onClick={handleDeleteAndMessage}>
              Yeah
            </Buttons>
            <Buttons bWidth={`w-[200px]`} onClick={hideSecondModal}>
              {t('Not')}
            </Buttons>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default MasterProcedures;
