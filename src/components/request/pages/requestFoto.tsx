import React from 'react'
import RequestLayout from '../../../pages/request/request'
import { GoPlus } from 'react-icons/go'
import { CiMenuKebab } from 'react-icons/ci'
import FotoCard from '../cards/fotoCard'
import opacha from '../../../images/Group 940396.png'

const RequestFoto: React.FC = () => {
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
        <div className='flex mt-5 gap-x-3 gap-y-8 flex-wrap px-5'>
          <FotoCard
            ownerImage={opacha}
            salonOwner='Малика Махмудова'
            phoneNumber='+998931716380'
            salonCreateDate='10.07.2022'
            salonDescription='Мастер добавил/изменил фото в галерею'
          />
          <FotoCard
            ownerImage={opacha}
            salonOwner='Малика Махмудова'
            phoneNumber='+998931716380'
            salonCreateDate='10.07.2022'
            salonDescription='Мастер добавил/изменил фото в галерею'
          />
          <FotoCard
            ownerImage={opacha}
            salonOwner='Малика Махмудова'
            phoneNumber='+998931716380'
            salonCreateDate='10.07.2022'
            salonDescription='Мастер добавил/изменил фото в галерею'
          />
          <FotoCard
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

export default RequestFoto