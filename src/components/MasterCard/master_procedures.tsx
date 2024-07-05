import { DeleteOutlined, CheckOutlined } from '@ant-design/icons';
import React, { useState } from 'react';
import { Button, message, Input, Image } from 'antd';
import {
  master_delate_service,
  master_confirm_new_service,
  post_message_api,
} from '../../helpers/api';
import axios from 'axios';
import { config } from '../../helpers/token';
import Modal from '../modals/modal';
import { Buttons } from '../buttons';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';
import DelModal from './../settings/modals/delModal';

const { TextArea } = Input;

interface ProceduresProps {
  title: string;
  imgUrl: string;
  price: number;
  duration: number;
  description: string;
  serviceStatus: string;
  servicesId: string;
  getFunc: () => void;
}

const MasterProcedures: React.FC<ProceduresProps> = ({
  title,
  getFunc,
  imgUrl,
  price,
  duration,
  description,
  serviceStatus,
  servicesId,
}) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isSecondModalVisible, setIsSecondModalVisible] = useState(false);
  const [isDelModalVisible, setIsDelModalVisible] = useState(false);
  const [value, setValue] = useState('');
  const [currentServiceId, setCurrentServiceId] = useState<string>(servicesId);

  const location = useLocation();
  const id = location.pathname.substring(8);
  const { t } = useTranslation();

  const toggleModal = (modalType: string, visible: boolean) => {
    if (modalType === 'first') {
      setIsModalVisible(visible);
    } else if (modalType === 'second') {
      setIsSecondModalVisible(visible);
    } else if (modalType === 'delete') {
      setIsDelModalVisible(visible);
    }
  };

  // const handleDelete = async (apiEndpoint: string) => {
  //   try {
  //     const response = await axios.put(
  //       `${apiEndpoint}${currentServiceId}`,
  //       config,
  //     );
  //     if (response.status === 200) {
  //       message.success('Procedure deleted successfully');
  //     } else {
  //       throw new Error('Failed to delete procedure');
  //     }
  //   } catch (error) {
  //     message.error('An error occurred while deleting the procedure');
  //   }
  // };

  const handleConfirm = async () => {
    try {
      const response = await axios.put(
        `${master_confirm_new_service}${servicesId}`,
        '',
        config,
      );

      if (response.data.success) {
        message.success('Procedure confirmed successfully');
        const updatedServiceId = response.data.id;
        setCurrentServiceId(updatedServiceId);
        getFunc();
      } else {
        throw new Error('Failed to confirm procedure');
      }
    } catch (error) {
      message.error('An error occurred while confirming the procedure');
    }
  };

  const handleDeleteAndMessage = async () => {
    try {
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
      getFunc();
    } catch (error) {
      message.error('An error occurred while deleting and sending the message');
    }
    toggleModal('second', false);
  };

  const handleDeleteWithMessage = async () => {
    toggleModal('first', false);
    try {
      await axios.post(post_message_api, { message: value }, config);
      toggleModal('second', true);
      setTimeout(() => {
        window.location.href = `/master/${id}`;
      }, 2000);
    } catch (error) {
      message.error('An error occurred while sending the message');
    }
  };

  const handleDeleteApprovedService = async () => {
    try {
      await axios.put(
        `${master_delate_service}${currentServiceId}`,
        '',
        config,
      );
      message.success('Approved procedure deleted successfully');

      toggleModal('delete', false);
      getFunc();
    } catch (error) {
      message.error('An error occurred while deleting the approved procedure');
      toggleModal('delete', false);
    }
  };

  return (
    <div className="flex flex-col lg:flex-row w-full bg-white dark:bg-boxdark text-black dark:text-white border-gray-300 shadow-lg p-3 rounded-xl mb-4">
      <div className="w-full lg:w-1/3 mb-4 lg:mb-0 flex justify-center items-center">
        <Image
          width={300}
          height={200}
          className="object-cover rounded"
          src={imgUrl}
        />
      </div>
      <div className="w-full lg:w-2/3 pl-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold mb-2 text-black dark:text-white">
            {title}
          </h2>
          <div className="flex items-center">
            {serviceStatus !== 'APPROVED' && (
              <div
                className="p-1 rounded-md bg-green-500 flex items-center cursor-pointer shadow-3 justify-center mr-2"
                onClick={handleConfirm}
              >
                <CheckOutlined />
              </div>
            )}
            <div
              className="p-1 bg-danger rounded-md flex items-center cursor-pointer shadow-3 justify-center"
              onClick={
                serviceStatus === 'APPROVED'
                  ? () => toggleModal('delete', true)
                  : () => toggleModal('first', true)
              }
            >
              <DeleteOutlined />
            </div>
          </div>
        </div>
        <div className="flex items-center w-full h-[1px] bg-black dark:bg-white"></div>
        <div className="flex items-start mt-4 flex-col">
          <div className="mb-2 flex items-center sm:justify-between lg:gap-8 lg:justify-start">
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
          className={`p-1 text-white text-center w-24 rounded-xl cursor-pointer ${
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
      <Modal
        isOpen={isModalVisible}
        onClose={() => toggleModal('first', false)}
      >
        <div className="w-[12rem] sm:w-[18rem] md:w-[25rem] lg:w-[30rem]">
          <p>Are you sure you want to delete this procedure?</p>
          <TextArea
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="Optional comment"
            autoSize={{ minRows: 3, maxRows: 5 }}
          />
          <div className="flex justify-end gap-2">
            <Button key="cancel" onClick={() => toggleModal('first', false)}>
              Cancel
            </Button>
            <Button key="delete" danger onClick={handleDeleteWithMessage}>
              Send
            </Button>
          </div>
        </div>
      </Modal>
      <Modal
        isOpen={isSecondModalVisible}
        onClose={() => toggleModal('second', false)}
      >
        <div className="w-[12rem] sm:w-[18rem] md:w-[25rem] lg:w-[30rem]">
          <div className="flex flex-col justify-center">
            <p className="font-bold text-xl text-black dark:text-white opacity-80 text-center">
              Rostan Ham Masterni uchiraszmi ?
            </p>
          </div>
          <div className="flex justify-center items-center gap-10 mt-8">
            <Buttons bWidth="w-[200px]" onClick={handleDeleteAndMessage}>
              Yeah
            </Buttons>
            <Buttons
              bWidth="w-[200px]"
              onClick={() => toggleModal('second', false)}
            >
              {t('Not')}
            </Buttons>
          </div>
        </div>
      </Modal>
      <DelModal
        isOpen={isDelModalVisible}
        onDelete={handleDeleteApprovedService}
        onClose={() => toggleModal('delete', false)}
      />
    </div>
  );
};

export default MasterProcedures;
