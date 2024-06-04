import React, { useState } from 'react'
import RequestLayout from '../../../pages/request/request'
import NewMastersCard from '../cards/newMastersCard'
import { GoPlus } from "react-icons/go";
import { CiMenuKebab } from "react-icons/ci";
import opacha from '../../../images/Group 940396.png'
import NewMastersDetail from '../details/newMastersDetail';
import Modal from '../../modals/modal';

const RequestNewMasters: React.FC = () => {
  const [detailIsOpen, setDetailIsOpen] = useState(false);
  const [reasonIsOpen, setReasonIsOpen] = useState(false);

  const openReasonModal = () => setReasonIsOpen(true);
  const closeReasonModal = () => setReasonIsOpen(false);
  const openDetailModal = () => setDetailIsOpen(true)
  const closeDetailModal = () => setDetailIsOpen(false)

  return (
    <RequestLayout>
      <div className='bg-[#f5f6f7] dark:bg-[#21212e] h-[600px] w-full shadow-3 shadow-[0.2px]'>
        <div className='w-full bg-[#cccccc] dark:bg-white h-12 flex justify-between items-center  px-5'>
          <div className='flex gap-3'>
            <p className='dark:text-[#000]'>Новые мастера</p>
            <div className='w-6 flex items-center justify-center rounded-full h-6 bg-[#f1f5f9] dark:bg-[#21212e] dark:text-white'>
              <p className='text-sm'>2</p>
            </div>
          </div>
          <div className='flex gap-2'>
            <div className='w-6 flex items-center justify-center rounded-full h-6 bg-[#f1f5f9] dark:bg-[#21212e] dark:text-white'>
              <GoPlus />
            </div>
            <div className='w-6 flex items-center justify-center rounded-full h-6 bg-[#f1f5f9] dark:bg-[#21212e] dark:text-white'>
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
            modal={openDetailModal}
          />
        </div>
      </div>
      <NewMastersDetail isOpen={detailIsOpen} onClose={closeDetailModal} openReasonModal={openReasonModal} />
      <Modal isOpen={reasonIsOpen} onClose={closeReasonModal}>
        <div className='w-[700px] h-[320px]'>
          <div>
            <p className='font-bold text-xl text-[#000] dark:text-white'>Причина оклонения:</p>
          </div>
          <div className='mt-4'>
            <textarea
              rows={10}
              className="block p-2.5 w-full text-sm text-gray-900 dark:bg-[#30303d] rounded-lg border focus:ring-blue-500 focus:border-blue-500 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Write your thoughts here..."
            />
          </div>
          <div className='flex justify-center mt-4'>
            <button
              onClick={closeReasonModal}
              className='bg-[#2c2c2c] dark:bg-danger text-white py-2 px-10 rounded-lg'
            >
              Удалить
            </button>
          </div>
        </div>
      </Modal>
    </RequestLayout>
  )
}

export default RequestNewMasters