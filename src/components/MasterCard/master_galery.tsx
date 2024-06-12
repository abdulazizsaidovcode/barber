import { DeleteOutlined, CheckOutlined } from '@ant-design/icons';
import { Modal, Skeleton, Button, Input, message } from 'antd';
import React, { useState } from 'react';
import axios from 'axios';
import {
  getFileId,
  master_gallery_delate,
  master_gallery_message,
} from '../../helpers/api';
import { config } from '../../helpers/token';
import { useLocation } from 'react-router-dom';

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
  const [isTextAreaModalVisible, setIsTextAreaModalVisible] = useState(false);
  const [isConfirmationModalVisible, setIsConfirmationModalVisible] =
    useState(false);
  const [deleteReason, setDeleteReason] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const location = useLocation();

  const id = location.pathname.substring(8);
  console.log(id);
  const handleImageLoad = () => {
    setLoading(false);
  };

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setIsTextAreaModalVisible(false);
    setIsConfirmationModalVisible(false);
  };

  const handleDeleteIconClick = () => {
    setIsTextAreaModalVisible(true);
  };

  const handleNextClick = () => {
    if (deleteReason.trim() === '') {
      return; // Textarea is required
    }
    setIsTextAreaModalVisible(false);
    setIsConfirmationModalVisible(true);
  };

  const handleDeleteConfirm = () => {
    setIsSubmitting(true);
    axios
      .post(
        `${master_gallery_message}${attechmentId}`,
        {
          clientId: null,
          masterId: id,
          adminId: null,
          message: message,
          messageStatus: 'ADMIN_MASTER_MESSAGE_FOR_WRITE ',
          read: true,
        },
        config,
      )
      .then(() => {
        return axios.delete(
          `${master_gallery_delate}${galleryId}/${attechmentId}`,
          config,
        );
      })
      .then(() => {
        onDelete(attachmentId);
      })
      .catch((error) => {
        console.error('Error deleting the image', error);
      })
      .finally(() => {
        setIsSubmitting(false);
        setIsConfirmationModalVisible(false);
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
            <DeleteOutlined onClick={handleDeleteIconClick} />
          </div>
        ) : (
          <div className="flex space-x-2">
            <div className="p-1 bg-green-200 flex items-center justify-center rounded-full">
              <CheckOutlined className="text-green-600" />
            </div>
            <div className="p-1 bg-red-200 flex items-center justify-center rounded-full">
              <DeleteOutlined
                className="text-red-600"
                onClick={handleDeleteIconClick}
              />
            </div>
          </div>
        )}
      </div>

      {/* Modal for full image view */}
      <Modal visible={isModalVisible} footer={null} onCancel={handleCancel}>
        <img className="w-full h-full" src={getFileId + imgUrl} alt="" />
      </Modal>

      {/* Textarea Modal */}
      <Modal
        visible={isTextAreaModalVisible}
        title="Reason for Deletion"
        onCancel={handleCancel}
        footer={[
          <Button key="cancel" onClick={handleCancel}>
            Cancel
          </Button>,
          <Button key="next" type="primary" onClick={handleNextClick}>
            Next
          </Button>,
        ]}
      >
        <Input.TextArea
          rows={4}
          value={deleteReason}
          onChange={(e) => setDeleteReason(e.target.value)}
          placeholder="Please enter the reason for deletion"
          required
        />
      </Modal>

      {/* Confirmation Modal */}
      <Modal
        visible={isConfirmationModalVisible}
        title="Confirmation"
        onCancel={handleCancel}
        footer={[
          <Button key="cancel" onClick={handleCancel}>
            Cancel
          </Button>,
          <Button
            key="confirm"
            type="primary"
            onClick={handleDeleteConfirm}
            loading={isSubmitting}
          >
            Confirm
          </Button>,
        ]}
      >
        <p>Are you sure you want to delete this image?</p>
      </Modal>
    </div>
  );
};

export default ProcedureItem;
