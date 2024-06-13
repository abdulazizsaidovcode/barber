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
import Modal from '../modals/modal';

interface ProcedureItemProps {
  imgUrl: string;
  status: boolean;
  onDelete: (attachmentId: string) => void;
  galleryId: string;
  attachmentId: string;
}

const ProcedureItem: React.FC<ProcedureItemProps> = ({
  imgUrl,
  status,
  onDelete,
  galleryId,
  attachmentId,
}) => {
  const [loading, setLoading] = useState(true);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modalType, setModalType] = useState<
    'textarea' | 'confirmation' | 'check' | null
  >(null);
  const [deleteReason, setDeleteReason] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleImageLoad = () => {
    setLoading(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setModalType(null);
  };

  const handleDeleteIconClick = () => {
    setModalType('textarea');
    setIsModalVisible(true);
  };

  const handleNextClick = () => {
    if (deleteReason.trim() === '') {
      return;
    }
    setModalType('confirmation');
  };

  const handleDeleteConfirm = () => {
    setIsSubmitting(true);
    axios
      .post(
        `${master_gallery_message}${galleryId}`,
        {
          clientId: null,
          masterId: galleryId,
          adminId: null,
          message: deleteReason,
          messageStatus: 'ADMIN_MASTER_MESSAGE_FOR_DELETE',
          read: true,
        },
        config
      )
      .then(() => {
        return axios.delete(
          `${master_gallery_delate}${galleryId}/${attachmentId}`,
          config
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
        handleCancel();
      });
  };

  const handleCheckConfirm = () => {
    setIsSubmitting(true);
    axios
      .put(`${master_gallery_message_conform}${attachmentId}`, '', config)
      .then((response) => {
        if (response.status === 200) {
          message.success('Image confirmed successfully');
        }
      })
      .catch((error) => {
        console.error('Error confirming the image', error);
        message.error('An error occurred while confirming the image');
      })
      .finally(() => {
        setIsSubmitting(false);
        handleCancel();
      });
  };

  return (
    <div className="flex flex-col justify-center items-center">
      <div
        className="shadow-xl flex items-center justify-center rounded-lg w-full h-50 overflow-hidden object-cover cursor-pointer"
        onClick={() => setIsModalVisible(true)}
      >
        {loading && <Skeleton.Image />}
        <img
          className={`w-full h-full object-cover ${loading ? 'hidden' : ''}`}
          src={getFileId + imgUrl}
          alt=""
          onLoad={handleImageLoad}
        />
      </div>
      <div
        className={`p-2 text-white ${
          status ? 'bg-red-500' : 'bg-green-500'
        } mt-2 w-1/2 flex items-center justify-center rounded-md`}
      >
        {status ? 'Новая' : 'Одобрена'}
      </div>
      <div className="flex flex-col items-center mt-2">
        {status ? (
          <div className="flex space-x-2">
            <div
              className="p-1 bg-green-200 flex items-center justify-center rounded-full cursor-pointer"
              onClick={() => {
                setModalType('check');
                setIsModalVisible(true);
              }}
            >
              <CheckOutlined className="text-green-600" />
            </div>
            <div
              className="p-1 bg-red-200 flex items-center justify-center rounded-full cursor-pointer"
              onClick={handleDeleteIconClick}
            >
              <DeleteOutlined className="text-red-600" />
            </div>
          </div>
        ) : (
          <div className="p-1 bg-gray-200 flex items-center justify-center rounded-md cursor-pointer">
            <DeleteOutlined onClick={handleDeleteIconClick} />
          </div>
        )}
      </div>

      <Modal isOpen={isModalVisible} onClose={handleCancel}>
        {modalType === 'textarea' && (
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
              <Button key="next" onClick={handleNextClick}>
                Next
              </Button>
            </div>
          </div>
        )}
        {modalType === 'confirmation' && (
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
        )}
        {modalType === 'check' && (
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
        )}
      </Modal>
    </div>
  );
};

export default ProcedureItem;
