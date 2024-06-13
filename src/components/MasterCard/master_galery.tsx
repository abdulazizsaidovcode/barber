import { DeleteOutlined, CheckOutlined } from '@ant-design/icons';
import { Skeleton, Button, Input, message } from 'antd';
import React, { useState } from 'react';
import axios from 'axios';
import {
  getFileId,
  master_gallery_delate,
  master_gallery_message,
  master_gallery_message_conform,
} from '../../helpers/api';
import { config } from '../../helpers/token';
import { useLocation } from 'react-router-dom';
import Modal from '../modals/modal';

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
  const [isCheckModalVisible, setIsCheckModalVisible] = useState(false);
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
    setIsCheckModalVisible(false);
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
        `${master_gallery_message}${id}`,
        {
          clientId: null,
          masterId: id,
          adminId: null,
          message: deleteReason,
          messageStatus: 'ADMIN_MASTER_MESSAGE_FOR_DELETE',
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
        message.success('Procedure deleted successfully');
      })
      .catch((error) => {
        console.error('Error deleting the image', error);
        message.error('An error occurred while deleting the procedure');
      })
      .finally(() => {
        setIsSubmitting(false);
        setIsConfirmationModalVisible(false);
      });
  };

  const handleCheckConfirm = () => {
    setIsSubmitting(true);
    axios
      .put(`${master_gallery_message_conform}${attechmentId}`, '', config)
      .then((response) => {
        if (response.status === 200) {
          message.success('Image confirmed successfully');
        }
        return handleDeleteConfirm();
      })
      .catch((error) => {
        console.error('Error confirming the image', error);
        message.error('An error occurred while confirming the image');
      })
      .finally(() => {
        setIsSubmitting(false);
        setIsCheckModalVisible(false);
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
            <div
              onClick={() => setIsCheckModalVisible(true)}
              className="p-1 bg-green-200 flex items-center justify-center rounded-full"
            >
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
      <Modal isOpen={isModalVisible} onClose={handleCancel}>
        <img className="w-full h-full" src={getFileId + imgUrl} alt="" />
      </Modal>

      {/* Textarea Modal */}
      <Modal isOpen={isTextAreaModalVisible} onClose={handleCancel}>
        <div className="w-[12rem] sm:w-[18rem] md:w-[25rem] lg:w-[30rem]">
          <h2>Reason for Deletion</h2>
          <Input.TextArea
            rows={4}
            value={deleteReason}
            onChange={(e) => setDeleteReason(e.target.value)}
            placeholder="Please enter the reason for deletion"
            required
          />
          <div className="flex justify-end gap-2 mt-4">
            <Button key="cancel" onClick={handleCancel}>
              Cancel
            </Button>
            <Button key="next" type="primary" onClick={handleNextClick}>
              Next
            </Button>
          </div>
        </div>
      </Modal>

      {/* Confirmation Modal */}
      <Modal isOpen={isConfirmationModalVisible} onClose={handleCancel}>
        <div className="w-[12rem] sm:w-[18rem] md:w-[25rem] lg:w-[30rem]">
          <h2>Confirmation</h2>
          <p>Are you sure you want to delete this image?</p>
          <div className="flex justify-end gap-2 mt-4">
            <Button key="cancel" onClick={handleCancel}>
              Cancel
            </Button>
            <Button
              key="confirm"
              type="primary"
              onClick={handleDeleteConfirm}
              loading={isSubmitting}
            >
              Confirm
            </Button>
          </div>
        </div>
      </Modal>

      {/* Check Modal */}
      <Modal isOpen={isCheckModalVisible} onClose={handleCancel}>
        <div className="w-[12rem] sm:w-[18rem] md:w-[25rem] lg:w-[30rem]">
          <h2>Confirmation</h2>
          <p>Are you sure you want to confirm this image?</p>
          <div className="flex justify-end gap-2 mt-4">
            <Button key="cancel" onClick={handleCancel}>
              Cancel
            </Button>
            <Button
              key="confirm"
              onClick={handleCheckConfirm}
              loading={isSubmitting}
            >
              Confirm
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default ProcedureItem;
