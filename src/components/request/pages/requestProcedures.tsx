import React from 'react'
import RequestLayout from '../../../pages/request/request'
import SpecializationsCard from '../cards/specializationsCard'
import opacha from '../../../images/Group 940396.png'

const RequestProcedures: React.FC = () => {
  return (
    <RequestLayout>
      <div className='bg-[#f5f6f7] dark:bg-[#21212e] h-max w-full shadow-3 shadow-[0.2px] pb-5'>
        <div className='w-full bg-[#cccccc] dark:bg-white h-12 flex justify-center items-center  px-5'>
          <div className='flex gap-3'>
            <p className='dark:text-[#000]'>Специализации</p>
            <div className='w-6 flex items-center justify-center rounded-full h-6 bg-[#f1f5f9] dark:bg-[#21212e] dark:text-white'>
              <p className='text-sm'>2</p>
            </div>
          </div>
        </div>
        <div className='flex justify-between mt-4'>
          <div className='w-1/2 bg-[#cccccc] mr-1 dark:bg-white h-12 flex justify-start items-center px-5'>
            <div className='flex gap-3'>
              <p className='dark:text-[#000]'>Изменённые</p>
              <div className='w-6 flex items-center justify-center rounded-full h-6 bg-[#f1f5f9] dark:bg-[#21212e] dark:text-white'>
                <p className='text-sm'>2</p>
              </div>
            </div>
          </div>
          <div className='w-1/2 bg-[#cccccc] ms-1 dark:bg-white h-12 flex justify-start items-center px-5'>
            <div className='flex gap-3'>
              <p className='dark:text-[#000]'>Новые</p>
              <div className='w-6 flex items-center justify-center rounded-full h-6 bg-[#f1f5f9] dark:bg-[#21212e] dark:text-white'>
                <p className='text-sm'>2</p>
              </div>
            </div>
          </div>
        </div>
        <div className='flex mt-5 gap-x-10 gap-y-8 flex-wrap px-5'>
          <SpecializationsCard
            ownerImage={opacha}
            salonOwner='Малика Махмудова'
            phoneNumber='+998931716380'
            salonCreateDate='10.07.2022'
            salonDescription='Мастер добавил/изменил фото в галерею'
          />
          <SpecializationsCard
            ownerImage={opacha}
            salonOwner='Малика Махмудова'
            phoneNumber='+998931716380'
            salonCreateDate='10.07.2022'
            salonDescription='Мастер добавил/изменил фото в галерею'
          />
        </div>
      </div>
    </RequestLayout>
  )
}

export default RequestProcedures