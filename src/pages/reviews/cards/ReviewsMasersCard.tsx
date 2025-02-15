import React, { useState } from 'react';
import { Rate, Button } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import userImg from '../../../images/user.png';
import { ListMasterData } from '../../../types/review';
import { getFileId } from '../../../helpers/api';
import { useTranslation } from 'react-i18next';
import { IoMdCloseCircleOutline } from 'react-icons/io';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { MdDone } from 'react-icons/md';


const ReviewsMasersCard: React.FC<{ data: ListMasterData, openModal: () => void, openConfirmModal: () => void }> = ({ data, openModal, openConfirmModal }) => {
  // I checked
  const {
    clientFirstName,
    clientLastName,
    masterFirstName,
    masterLastName,
    description,
    clientEmail,
    clientPhoneNumber,
    leaveFeedback,
    feedbackCount,
    feedbackDate,
    clientAttachmentId,
    masterAttachmentId
  } = data;
  const { t } = useTranslation();
  const [isImageModal, setIsImageModal] = useState<boolean>(false);
  const [imageID, setImageID] = useState<string>('');
  const openIsImageModal = () => setIsImageModal(!isImageModal);
  return (
    <>
      <div className="w-full p-4 reviews-shadow mt-3 rounded-xl dark:bg-[#60606D] text-black dark:text-white mb-4">
        <div className="flex md:flex-row flex-col md:gap-0 gap-3 justify-between items-start mb-4">

          <div className="flex ">
            <img
              src={clientAttachmentId ? getFileId + clientAttachmentId : userImg}
              className="md:w-20 w-10 h-10 rounded-full object-cover md:h-20"
              alt=""
              onClick={() => {
                openIsImageModal()
                setImageID(clientAttachmentId ? clientAttachmentId : '')
              }}
            />
            <div className="flex-1 ms-3">
              <div className="font-bold text-lg">{masterFirstName} {masterLastName}</div>
              <div className="text-gray-500">{t('Client')}</div>
              {leaveFeedback && <>
                <div className="">
                  {clientPhoneNumber || ''}
                </div>
                <div className="">
                  {clientEmail || ''}
                </div>
              </>}
            </div>
          </div>
          <div className="flex">
            <img src={masterAttachmentId ? getFileId + masterAttachmentId : userImg} className="md:w-20 w-10 rounded-full object-cover h-10 md:h-20"
              alt="" />
            <div className="flex-1 ms-3">
              <div className="font-bold text-lg">{clientFirstName} {clientLastName}</div>
              <div className="text-gray-500">{t('master')}</div>
              {leaveFeedback || <><Rate disabled defaultValue={feedbackCount} value={feedbackCount} className="text-sm" /> ({feedbackCount})</>}
            </div>
          </div>
          <div className="flex flex-col text-gray-700">
            <div className="flex items-center">
            </div>
          </div>
          <div className="text-gray-500 flex items-start">
            <div className="flex flex-col items-center justify-center">
              <div onClick={openConfirmModal}
                className="w-10 h-10 border-[1px] border-green-500 flex items-center justify-center rounded-full">
                <MdDone className="text-green-500 text-xl cursor-pointer" />
              </div>
            </div>
            <div className="flex flex-col items-center justify-center">
              <div onClick={openModal}
                className="w-10 h-10 border-[1px] border-red-500 flex items-center justify-center rounded-full">
                <DeleteOutlined className="text-red-500 text-xl cursor-pointer" />
              </div>
              <p>{feedbackDate}</p>
            </div>
          </div>
        </div>
        <div className="flex md:flex-row flex-col justify-between">
          <div className="text-gray-700 mb-2">
            {description}
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

export default ReviewsMasersCard;
