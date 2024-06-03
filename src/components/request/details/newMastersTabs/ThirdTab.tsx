import React, { useState } from 'react'
import img from "../../../../images/Image.png"
import Modal from '../../../modals/modal';

const ThirdTab: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  return (
    <div>
      <div className='bg-[#cccccc] h-15 flex justify-between items-center px-5'>
        <p className='text-xl font-bold'>Альбом 1 - Наращивание ресниц 2D</p>
        <p className='text-xl'>25.02.2024</p>
      </div>
      <div className='bg-[#cccccc] mt-3 h-max py-8 flex gap-4 items-center px-5'>
        <div className='bg-white p-1 rounded-md' onClick={openModal}>
          <img src={img} alt="" />
        </div>
        <div className='bg-white p-1 rounded-md'>
          <img src={img} alt="" />
        </div>
        <div className='bg-white p-1 rounded-md'>
          <img src={img} alt="" />
        </div>
        <div className='bg-white p-1 rounded-md'>
          <img src={img} alt="" />
        </div>
        <div className='bg-white p-1 rounded-md'>
          <img src={img} alt="" />
        </div>
      </div>
      <Modal isOpen={isOpen} onClose={closeModal}>
        <div>
          <img className='w-100 h-80' src={img} alt="" />
        </div>
      </Modal>
    </div>
  )
}

export default ThirdTab