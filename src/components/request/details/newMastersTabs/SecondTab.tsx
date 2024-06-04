import React, { useState } from 'react'
import FirstTabCard from './cards/FirstTabCard'
import Modal from '../../../modals/modal'
import img from '../../../../images/Image.png';

const SecondTab: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => setIsOpen(true)
  const closeModal = () => setIsOpen(false)

  return (
    <div>
      <FirstTabCard
        category='Стрижка, укладка, милирование:'
        description='В услугу входит мытьё головы, массаж головы и Разнообразный и богатый опыт основанный .......'
        price='350 000 сум' duration='1 час 30 минут'
        openModal={openModal}
      />
      <Modal isOpen={isOpen} onClose={closeModal}>
        <div className="flex justify-center items-center h-full w-full">
          <img className="max-w-full max-h-full rounded-md" src={img} alt="Modal Image" />
        </div>
      </Modal>
    </div>
  )
}

export default SecondTab