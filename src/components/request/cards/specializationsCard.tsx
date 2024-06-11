import React from 'react';
import { Link } from 'react-router-dom';

interface SpecializationsCardProp {
  salonOwner: string;
  phoneNumber: string;
  salonCreateDate: string;
  salonDescription: string;
  ownerImage: any;
  link: string;
}

const SpecializationsCard: React.FC<SpecializationsCardProp> = ({ ownerImage, salonDescription, salonCreateDate, salonOwner, phoneNumber, link }) => {
  return (
    <Link to={`/master/${link}`}>
      <div className='lg:w-[420px] w-full cursor-pointer h-[130px] rounded-xl reviews-shadow p-3 bg-white'>
        <div className='flex justify-between'>
          <div className='flex gap-3 mt-3'>
            <div>
              <img className='w-7 h-7' src={ownerImage} alt="master image" />
            </div>
            <div className='flex'>
              <div>
                <p className='text-[14px] dark:text-[#000]'>{salonOwner}</p>
                <div className='flex items-center w-full'>
                  <p className='text-[13px] dark:text-[#000]'>{phoneNumber}</p>
                </div>
              </div>
            </div>
          </div>
          <div className='flex items-start'>
            <p className='text-[12px] dark:text-[#000]'>{salonCreateDate}</p>
          </div>
        </div>
        <div className='my-3'><hr /></div>
        <div>
          <div>
            <p className='text-[17px]'>{salonDescription}</p>
          </div>
        </div>
      </div>
    </Link>
  )
}

export default SpecializationsCard