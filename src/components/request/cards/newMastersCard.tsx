import React from 'react';

interface NewMastersCardProp {
  salonName: string;
  salonOwner: string;
  salonAddress: string;
  phoneNumber: string;
  salonCategory: string;
  salonCreateDate: string;
  ownerImage: any;
  modal: any
}

const NewMastersCard: React.FC<NewMastersCardProp> = ({ salonName, ownerImage, salonAddress, salonCategory, modal, salonCreateDate, salonOwner, phoneNumber }) => {
  return (
    <div onClick={modal} className='w-[280px] cursor-pointer h-[200px] rounded-xl shadow-4 shadow-[1px] p-3 bg-white'>
      <div>
        <p className='text-xl font-bold dark:text-[#000]'>{salonName}</p>
        <p className='text-md font-bold dark:text-[#000]'>{salonCategory} </p>
        <p className='text-md dark:text-[#000]'>{salonAddress}</p>
      </div>
      <div className='mt-3'>
        <hr />
      </div>
      <div className='flex gap-3 mt-3'>
        <div>
          <img src={ownerImage} alt="" />
        </div>
        <div>
          <p className='text-[14px] dark:text-[#000]'>{salonOwner}</p>
          <div className='flex items-center w-full'>
            <p className='text-[13px] dark:text-[#000]'>{phoneNumber}</p>
            <p className='text-[12px] ms-10 dark:text-[#000]'>{salonCreateDate}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default NewMastersCard