import { DeleteOutlined } from '@ant-design/icons';
import React, { useState } from 'react';
import { Modal, Button, message } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import { useLocation } from 'react-router-dom';
import { master_delate_service } from '../../helpers/api';

interface ProceduresProps {
   title: string;
  imgUrl: string;
  price: number;
  duration: number;
  description: string;
  serviceStatus: string;
}

const MasterProcedures: React.FC<ProceduresProps> = ({

  title,
  imgUrl,
  price,
  duration,
  description,
  serviceStatus,
}) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [value, setValue] = useState('');
  const location = useLocation();

  const id = location.pathname.substring(8);


  const showModal = () => {
    setIsModalVisible(true);
  };

  const hideModal = () => {
    setIsModalVisible(false);
  };

  const handleDelete = async () => {
    try {
      const response = await fetch(`${master_delate_service}${id}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        message.success('Procedure deleted successfully');
        // Perform any additional state updates or refresh the list
      } else {
        throw new Error('Failed to delete procedure');
      }
    } catch (error) {
      message.error('An error occurred while deleting the procedure');
    }
    hideModal();
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
          <div
            className="p-1 bg-gray rounded-md flex items-center cursor-pointer shadow-3 justify-center"
            onClick={showModal}
          >
            <DeleteOutlined />
          </div>
        </div>
        <div className="flex items-center w-full h-[1px] bg-black"></div>
        <div className="flex items-center justify-between">
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
          <div className="ml-4 flex items-center space-x-2">
            <button className="bg-green-500 text-white py-1 px-2 rounded flex items-center">
              <i className="fas fa-check"></i>
            </button>
            <button className="bg-red-500 text-white py-1 px-2 rounded flex items-center">
              <i className="fas fa-times"></i>
            </button>
          </div>
        </div>
      </div>
      <Modal
        title="Delete Procedure"
        visible={isModalVisible}
        onCancel={hideModal}
        footer={[
          <Button key="cancel" danger onClick={hideModal}>
            Cancel
          </Button>,
          <Button key="delete" type="primary" onClick={handleDelete}>
            Delete
          </Button>,
        ]}
      >
        <TextArea
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Optional comment"
          autoSize={{ minRows: 3, maxRows: 5 }}
        />
      </Modal>
    </div>
  );
};

export default MasterProcedures;
