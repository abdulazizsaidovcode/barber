import React, { useState } from 'react';
import { Rate } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import userImg from '../../../images/user.png';
import { ListData } from '../../../types/review';
import { getFileId } from '../../../helpers/api';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { IoMdCloseCircleOutline } from 'react-icons/io';

interface ReviewsServiceCardProps {
  data: ListData;
  openModal: () => void;
}

const ReviewsServiceCard: React.FC<ReviewsServiceCardProps> = ({ data, openModal }) => {
  const [isImageModal, setIsImageModal] = useState<boolean>(false);
  const [imageID, setImageID] = useState<string>('');
  const { count, client, text, date, master } = data;
  const clientFirstName = client?.firstName || '';
  const clientLastName = client?.lastName || '';
  const clientAttachmentId = client?.attachmentId || '';

  const masterFirstName = master?.firstName || '';
  const masterLastName = master?.lastName || '';
  const masterAttachmentId = master?.attachmentId || '';

  const openIsImageModal = () => setIsImageModal(!isImageModal);
  return (
    <>
      <div
        className="w-full bg-white p-4 flex md:flex-row flex-col justify-center items-start shadow-lg rounded-xl dark:bg-[#60606D] text-black dark:text-white mb-4">
        <div className="flex items-center flex-col">
          <img
            className="w-20 h-20 rounded-full hover:cursor-pointer"
            src={clientAttachmentId || masterAttachmentId ? getFileId + clientAttachmentId || getFileId + masterAttachmentId : userImg}
            alt="MASTER IMAGE"
            onClick={() => {
              openIsImageModal()
              setImageID((clientAttachmentId || masterAttachmentId) ? clientAttachmentId || masterAttachmentId : '')
            }}
          />
          <div className="text-gray-500">{client ? 'Client' : 'Master'}</div>
        </div>
        <div className="flex-1 md:ms-4">
          <div className="flex md:flex-row flex-col justify-between items-center mb-2">
            <div>
              <div className="font-bold text-lg">{clientFirstName || masterFirstName} {clientLastName || masterLastName}</div>
            </div>
            <Rate disabled defaultValue={count} className="md:ml-4 float-end" />
          </div>
          <div className="text-gray-700 mb-4">{text}</div>
          <div className="flex justify-between items-center text-gray-500">
            <div>
              <span>{date}</span>
            </div>
            <div onClick={openModal}
                 className="w-10 h-10 border-[1px] border-red-900 flex items-center justify-center rounded-full">
              <DeleteOutlined className="text-red-900 text-xl cursor-pointer" />
            </div>
          </div>
        </div>
      </div>

      {isImageModal && (
        <div
          className={`fixed inset-0 z-999 flex items-center justify-center w-full h-full bg-black-2 bg-opacity-50`}
          onClick={openIsImageModal}
        >
          <p className={`absolute top-10 right-10 text-white`}>
            <IoMdCloseCircleOutline
              size={30}
              className="dark:text-white text-black hover:cursor-pointer opacity-80 duration-200"
              onClick={openIsImageModal} />
          </p>
          <div className={`w-[85vw] h-[90vh] flex justify-center items-center`}>
            <LazyLoadImage
              alt="img"
              src={imageID ? `${getFileId}${imageID}` : userImg}
              className={'w-full h-full rounded-full object-cover'}
              effect="blur"
            />
          </div>
        </div>
      )}
    </>
  );
};

export default ReviewsServiceCard;
