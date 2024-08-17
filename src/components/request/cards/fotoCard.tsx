import React from 'react';
import { Link } from 'react-router-dom';

interface FotoCardProp {
  salonOwner: string;
  phoneNumber: string;
  salonCreateDate: string;
  salonDescription: string;
  ownerImage: any;
  link: string;
}

const FotoCard: React.FC<FotoCardProp> = ({ ownerImage, salonDescription, salonCreateDate, salonOwner, phoneNumber, link }) => {
  return (
    <Link to={`/master/${link}`}>
      <div className='lg:w-[280px] sm:w-[336px] cursor-pointer h-[150px] rounded-xl reviews-shadow p-3 bg-white'>
        <div className='flex gap-3 mt-3'>
          <div>
            <img className='w-7 h-7 rounded-full' src={ownerImage} alt="" />
          </div>
          <div>
            <p className='text-[14px] dark:text-[#000]'>{salonOwner}</p>
            <div className='flex items-center w-full'>
              <p className='text-[13px] dark:text-[#000]'>{phoneNumber}</p>
            </div>
          </div>
        </div>
        <div className='mt-3'>
          <hr />
        </div>
        <div className='flex justify-between'>
          <div className='w-3/4'>
            <p className='text-[15px]'>{salonDescription}</p>
          </div>
          <div className='w-1/4 flex items-end'>
            <p className='text-[11px] dark:text-[#000]'>{salonCreateDate}</p>
          </div>
        </div>
      </div>
    </Link>
  )
}

export default FotoCard