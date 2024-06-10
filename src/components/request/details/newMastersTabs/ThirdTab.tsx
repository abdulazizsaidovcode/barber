import React from 'react';
import img from '../../../../images/Image.png';
import { Image } from 'antd';

interface ThirdTabProps {
  onClose: () => void;
  openReasonModal: () => void;
  confirmMasters: () => void; // Add confirmMasters prop
}

const ThirdTab: React.FC<ThirdTabProps> = ({ onClose, openReasonModal, confirmMasters }) => {
  return (
    <div>
      <div className="bg-[#cccccc] dark:bg:white h-15 flex justify-between items-center px-5">
        <p className="text-xl font-bold">Альбом 1 - Наращивание ресниц 2D</p>
        <p className="text-xl">25.02.2024</p>
      </div>
      <div className="bg-[#cccccc] dark:bg:white mt-3 h-max py-8 flex gap-4 items-center px-5">
        <div className="bg-white p-1 rounded-md cursor-pointer">
          <Image width={185} height={150} src={img} />
        </div>
        <div className="bg-white p-1 rounded-md cursor-pointer">
          <Image width={185} height={150} src={img} />
        </div>
        <div className="bg-white p-1 rounded-md cursor-pointer">
          <Image width={185} height={150} src={img} />
        </div>
        <div className="bg-white p-1 rounded-md cursor-pointer">
          <Image width={185} height={150} src={img} />
        </div>
        <div className="bg-white p-1 rounded-md cursor-pointer">
          <Image width={185} height={150} src={img} />
        </div>
        <div className="bg-white p-1 rounded-md cursor-pointer">
          <Image width={185} height={150} src={img} />
        </div>
      </div>
      <div className="flex justify-end gap-4 mt-5">
        <button
          className="py-2 px-7 bg-[#c2c2c2] rounded-xl text-[#000] dark:bg-danger dark:text:white"
          onClick={() => {
            onClose();
            openReasonModal();
          }}
        >
          Отклонить
        </button>
        <button
          className="py-2 px-7 bg-[#c2c2c2] rounded-xl text-[#000] dark:bg-danger dark:text:white"
          onClick={() => {
            confirmMasters()
            onClose()
          }} // Call confirmMasters function
        >
          Одобрить
        </button>
      </div>
    </div>
  );
};

export default ThirdTab;