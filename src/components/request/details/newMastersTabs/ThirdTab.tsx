import React, { useState } from 'react';
import img from '../../../../images/Image.png';
import Modal from '../../../modals/modal';

const ThirdTab: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  return (
    <div>
      <div className="bg-[#cccccc] dark:bg-white h-15 flex justify-between items-center px-5">
        <p className="text-xl font-bold">Альбом 1 - Наращивание ресниц 2D</p>
        <p className="text-xl">25.02.2024</p>
      </div>
      <div className="bg-[#cccccc] dark:bg-white mt-3 h-max py-8 flex gap-4 items-center px-5">
        <div className="bg-white p-1 rounded-md cursor-pointer" onClick={openModal}>
          <img src={img} alt="Image 1" className="rounded-md" />
        </div>
        <div className="bg-white p-1 rounded-md cursor-pointer" onClick={openModal}>
          <img src={img} alt="Image 2" className="rounded-md" />
        </div>
        <div className="bg-white p-1 rounded-md cursor-pointer" onClick={openModal}>
          <img src={img} alt="Image 3" className="rounded-md" />
        </div>
        <div className="bg-white p-1 rounded-md cursor-pointer" onClick={openModal}>
          <img src={img} alt="Image 4" className="rounded-md" />
        </div>
        <div className="bg-white p-1 rounded-md cursor-pointer" onClick={openModal}>
          <img src={img} alt="Image 5" className="rounded-md" />
        </div>
      </div>
      <div className="flex justify-end gap-4 mt-5">
        <button
          className="py-2 px-7 bg-[#c2c2c2] rounded-xl text-[#000] dark:bg-danger dark:text-white"
          onClick={onClose}
        >
          Отклонить
        </button>
        <button className="py-2 px-7 bg-[#c2c2c2] rounded-xl text-[#000] dark:bg-danger dark:text-white">
          Одобрить
        </button>
      </div>
      <Modal isOpen={isOpen} onClose={closeModal}>
        <div className="flex justify-center items-center h-full w-full">
          <img className="max-w-full max-h-full rounded-md" src={img} alt="Modal Image" />
        </div>
      </Modal>
    </div>
  );
};

export default ThirdTab;
