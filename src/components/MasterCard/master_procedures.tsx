import { DeleteOutlined, CheckOutlined } from '@ant-design/icons';
import React, { useState } from 'react';
import { Button, message, Modal, Input } from 'antd';
import { useLocation } from 'react-router-dom';
import {
  master_delate_service,
  master_confirm_new_service,
  master_delate_new_service,
} from '../../helpers/api';
import axios from 'axios';
import { config } from '../../helpers/token';

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
  const location = useLocation();

  const showModal = () => {
    setIsModalVisible(true);
  };

  const hideModal = () => {
    setIsModalVisible(false);
  };

  const showSecondModal = () => {
    setIsSecondModalVisible(true);
  };

  const hideSecondModal = () => {
    setIsSecondModalVisible(false);
  };

  const handleDelete = async () => {
    const apiEndpoint =
      serviceStatus === 'APPROVED'
        ? master_delate_service
        : master_delate_new_service;
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
    hideSecondModal();
  };

  const handleConfirm = async () => {
    try {
      const response = await axios.put(
        `${master_confirm_new_service}${servicesId}`,
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

  const handleFirstModalDeleteClick = () => {
    hideModal();
    showSecondModal();
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
            <div
              className="p-1 bg-gray rounded-md flex items-center cursor-pointer shadow-3 justify-center"
              onClick={showModal}
            >
              <DeleteOutlined />
            </div>
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
      <Modal
        visible={isModalVisible}
        title="Delete Procedure"
        onCancel={hideModal}
        footer={[
          <Button key="cancel" onClick={hideModal}>
            Cancel
          </Button>,
          <Button
            key="delete"
            type="primary"
            onClick={handleFirstModalDeleteClick}
          >
            Delete
          </Button>,
        ]}
      >
        <div className="flex flex-col gap-4">
          <p>Are you sure you want to delete this procedure?</p>
          <TextArea
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="Optional comment"
            autoSize={{ minRows: 3, maxRows: 5 }}
          />
        </div>
      </Modal>
      <Modal
        visible={isSecondModalVisible}
        title="Confirm Deletion"
        onCancel={hideSecondModal}
        footer={[
          <Button key="cancel" onClick={hideSecondModal}>
            Cancel
          </Button>,
          <Button key="delete" type="primary" onClick={handleDelete}>
            Confirm
          </Button>,
        ]}
      >
        <div className="flex flex-col gap-4">
          <p>Are you sure you want to delete this procedure?</p>
        </div>
      </Modal>
    </div>
  );
};

export default MasterProcedures;
