import { DeleteOutlined, CheckOutlined } from '@ant-design/icons';
import { Modal, Skeleton } from 'antd';
import React, { useState } from 'react';
import axios from 'axios';
import { getFileId, master_gallery_delate } from '../../helpers/api';
import { config } from '../../helpers/token';

interface ProcedureItemProps {
  imgUrl: string;
  status: boolean;
  attachmentId: string;
  onDelete: (attachmentId: string) => void;
  galleryId: string;
  attechmentId: string;
}

const ProcedureItem: React.FC<ProcedureItemProps> = ({
  imgUrl,
  status,
  attachmentId,
  onDelete,
  galleryId,
  attechmentId,
}) => {
  const [loading, setLoading] = useState(true);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleImageLoad = () => {
    setLoading(false);
  };

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleDelete = () => {
    axios
      .delete(`${master_gallery_delate}${galleryId}/${attechmentId}`, config)
      .then(() => {
        onDelete(attachmentId);
        console.log(onDelete);
      })
      .catch((error) => {
        console.error('Error deleting the image', error);
      });
  };

  return (
    <div className="flex flex-col justify-center items-center">
      {/* images */}
      <div
        className="shadow-xl flex items-center justify-center rounded-lg w-full h-50 overflow-hidden object-cover"
        onClick={showModal}
      >
        {loading && <Skeleton.Image />}
        <img
          className={`w-full h-full ${loading ? 'hidden' : ''}`}
          src={getFileId + imgUrl}
          alt=""
          onLoad={handleImageLoad}
        />
      </div>
      <div
        className={`p-2 text-white ${
          status ? 'bg-green-500' : 'bg-red-500'
        } mt-2 w-[50%] flex items-center justify-center rounded-md`}
      >
        {status ? 'Одобрена' : 'Новая'}
      </div>
      {/* Icons that appear depending on the status */}
      <div className="flex flex-col items-center mt-2">
        {status ? (
          <div className="p-1 bg-gray-200 flex items-center justify-center rounded-md">
            <DeleteOutlined onClick={handleDelete} />
          </div>
        ) : (
          <div className="flex space-x-2">
            <div className="p-1 bg-green-200 flex items-center justify-center rounded-full">
              <CheckOutlined className="text-green-600" />
            </div>
            <div className="p-1 bg-red-200 flex items-center justify-center rounded-full">
              <DeleteOutlined className="text-red-600" />
            </div>
          </div>
        )}
      </div>

      {/* Modal for full image view */}
      <Modal visible={isModalVisible} footer={null} onCancel={handleCancel}>
        <img className="w-full h-full" src={getFileId + imgUrl} alt="" />
      </Modal>
    </div>
  );
};

export default ProcedureItem;
