import React, { useState } from 'react'
import RequestLayout from '../../../pages/request/request'
import NewMastersCard from '../cards/newMastersCard'
import { GoPlus } from "react-icons/go";
import { CiMenuKebab } from "react-icons/ci";
import opacha from '../../../images/Group 940396.png'
import NewMastersDetail from '../details/newMastersDetail';

const RequestNewMasters: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => setIsOpen(true)
  const closeModal = () => setIsOpen(false)

  return (
    <RequestLayout>
      <div className='bg-[#f5f6f7] h-[600px] w-full shadow-3 shadow-[0.2px]'>
        <div className='w-full bg-[#cccccc] h-12 flex justify-between items-center  px-5'>
          <div className='flex gap-3'>
            <p>Новые мастера</p>
            <div className='w-6 flex items-center justify-center rounded-full h-6 bg-[#f1f5f9]'>
              <p className='text-sm'>2</p>
            </div>
          </div>
          <div className='flex gap-2'>
            <div className='w-6 flex items-center justify-center rounded-full h-6 bg-[#f1f5f9]'>
              <GoPlus />
            </div>
            <div className='w-6 flex items-center justify-center rounded-full h-6 bg-[#f1f5f9]'>
              <CiMenuKebab className='rotate-180' />
            </div>
          </div>
        </div>
        <div className='flex mt-5 gap-3 flex-wrap px-5'>
          <NewMastersCard
            salonName='Beauty wave'
            salonCategory='Парикмахер, стилист, Барбер'
            salonAddress='Ташкентская область г. Ташкент ул. Алишера Навои, дом 62, кв 45'
            ownerImage={opacha}
            salonOwner='Малика Махмудова'
            phoneNumber='+998931716380'
            salonCreateDate='10.07.2022'
            modal={openModal}
          />
        </div>
      </div>
      <NewMastersDetail isOpen={isOpen} onClose={closeModal} />
    </RequestLayout>
  )
}

export default RequestNewMasters