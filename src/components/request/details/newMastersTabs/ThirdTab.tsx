import React from 'react';
import { Image } from 'antd';
import { getFileId } from '../../../../helpers/api';
import { useTranslation } from 'react-i18next';
import userImage from '../../../../images/default.png'

interface ThirdTabProps {
  galleryData: {
    id: number;
    albumName: string;
    resGalleryAttachments: [
      { attachmentId: string; main: boolean; newStatus: boolean }
    ];
    date: string
  }[];
  onClose: () => void;
  openReasonModal: () => void;
  confirmMasters: () => void; // Add confirmMasters prop
}



const ThirdTab: React.FC<ThirdTabProps> = ({ galleryData, onClose, openReasonModal, confirmMasters }) => {
  const { t } = useTranslation();
console.log(galleryData);

  return (
    <div>
      <div className='flex flex-col gap-3'>
        {galleryData.length === 0 ?
          <div className='h-[200px]'>
            <p className='text-xl dark:text-white'>{t("Master_gallery_not_found")}</p>
          </div>
          : galleryData.map((album) => (
            <div key={album.id}>
              <div className="bg-[#cccccc] dark:bg-[#60606d] h-15 flex justify-between items-center px-5">
                <p className="text-xl dark:text-white font-bold">{album.albumName}</p>
                <p className="text-xl dark:text-white">{album.date}</p>
              </div>
              <div className="bg-[#cccccc] dark:bg-[#60606d] mt-3 h-max py-8 flex flex-wrap gap-4 items-center px-5">
                {album.resGalleryAttachments.map((attachment, index) => (
                  <div key={index} className="bg-white p-1 rounded-md cursor-pointer">
                    <Image className='object-cover' width={185} height={150} src={attachment.attachmentId ? getFileId + attachment.attachmentId : userImage} />
                  </div>
                ))}
              </div>
            </div>
          ))}
      </div>
      <div className="flex justify-end gap-4 mt-5">
        <button
          className="py-2 px-7 bg-[#c2c2c2] rounded-xl text-[#000] dark:bg-danger dark:text-white"
          onClick={() => {
            onClose();
            openReasonModal();
          }}
        >
          {t("Reject")}
        </button>
        <button
          className="py-2 px-7 bg-[#c2c2c2] rounded-xl text-[#000] dark:bg-danger dark:text-white"
          onClick={() => {
            confirmMasters();
            onClose();
          }} // Call confirmMasters function
        >
          {t("Approve")}
        </button>
      </div>
    </div>
  );
};

export default ThirdTab;
