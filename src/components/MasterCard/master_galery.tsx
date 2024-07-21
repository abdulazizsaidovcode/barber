import { DeleteOutlined, CheckOutlined } from '@ant-design/icons';
import { Skeleton, Button, Input, message, Image } from 'antd';
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
import { Buttons } from '../buttons';
import { useParams } from 'react-router-dom';
import { t } from 'i18next';

interface ProcedureItemProps {
  imgUrl: string;
  status: boolean;
  onDelete: (attachmentId: string) => void;
  galleryId: string;
  attachmentId: string;
  getFunc: () => void;
}

const ProcedureItem: React.FC<ProcedureItemProps> = ({
  imgUrl,
  status,
  getFunc,
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
  const { id } = useParams();

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
        `${master_gallery_message}`,
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
          `${master_gallery_delate}${galleryId}/${attachmentId}`,
          config,
        );
      })
      .then(() => {
        onDelete(attachmentId);
        getFunc();
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
        if (response.data.status) {
          getFunc();
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
    <div className="flex flex-col items-center">
      <Image width={200} height={200} src={getFileId + imgUrl} />
      <div
        className={`p-2 text-white ${
          status ? 'bg-red-500' : 'bg-green-500'
        } mt-2 w-1/2 flex items-center justify-center rounded-md`}
      >
        {status ? `${t('new')}` : `${t('odobrone')}`}
      </div>
      <div className="flex flex-col items-center mt-2">
        {status ? (
          <div className="flex space-x-2">
            <div
              className="p-1 bg-green-200 dark:bg-green-700 flex items-center justify-center rounded-full cursor-pointer"
              onClick={() => {
                setModalType('check');
                setIsModalVisible(true);
              }}
            >
              <CheckOutlined className="text-green-600 dark:text-green-300" />
            </div>
            <div
              className="p-1 bg-red-200 dark:bg-red-700 flex items-center justify-center rounded-full cursor-pointer"
              onClick={handleDeleteIconClick}
            >
              <DeleteOutlined className="text-red-600 dark:text-red-300" />
            </div>
          </div>
        ) : (
          <div className="p-1 bg-gray-200 dark:bg-gray-700 flex items-center justify-center rounded-md cursor-pointer">
            <DeleteOutlined
              className="text-gray-600 dark:text-gray-300"
              onClick={handleDeleteIconClick}
            />
          </div>
        )}
      </div>

      <Modal isOpen={isModalVisible} onClose={handleCancel}>
        {modalType === 'textarea' && (
          <div className="w-[12rem] sm:w-[18rem] md:w-[25rem] lg:w-[30rem]">
            <h2 className="dark:text-white text-lg">{t('delete_info')}</h2>
            {/* <Input.TextArea
              className="bg-transparent hover:bg-transparent text-white"
              rows={4}
              value={deleteReason}
              onChange={(e) => setDeleteReason(e.target.value)}
              placeholder="Please enter the reason for deletion"
              required
            /> */}
            <textarea
              rows={5}
              className="block p-2.5 w-full mt-3 text-gray-900 dark:text-white dark:bg-[#30303d] rounded-lg border focus:ring-blue-500 focus:border-blue-500 dark:text:white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              value={deleteReason}
              onChange={(e) => setDeleteReason(e.target.value)}
            />
            <div className="flex justify-end gap-2 mt-4">
              <Buttons key="cancel" onClick={handleCancel} >
                {t('cancel')}
              </Buttons>
              <Buttons key="next" onClick={handleNextClick}>
                {t('next')}
              </Buttons>
            </div>
          </div>
        )}
        {modalType === 'confirmation' && (
          <div className="w-[12rem] sm:w-[18rem] md:w-[25rem] lg:w-[30rem]">
            <h2 className="dark:text-white">Confirmation</h2>
            <p className="dark:text-white">
              Are you sure you want to delete this image?
            </p>
            <div className="flex justify-end gap-2 mt-4">
              <Buttons key="cancel" onClick={handleCancel}>
                {t('cancel')}
              </Buttons>
              <Buttons key="confirm" onClick={handleDeleteConfirm}>
                Confirm
              </Buttons>
            </div>
          </div>
        )}
        {modalType === 'check' && (
          <div className="w-[12rem] sm:w-[18rem] md:w-[25rem] lg:w-[30rem]">
            <h2 className="dark:text-white">Confirmation</h2>
            <p className="dark:text-white">
              Are you sure you want to confirm this image?
            </p>
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
