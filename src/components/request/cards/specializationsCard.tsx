import React from 'react';
import { Link } from 'react-router-dom';

interface SpecializationsCardProp {
  salonOwner: string;
  phoneNumber: string;
  salonCreateDate: string;
  modal?: boolean;
  salonDescription: string;
  onClick?: () => void
  ownerImage: any;
  link?: string;
}

const SpecializationsCard: React.FC<SpecializationsCardProp> = ({ ownerImage, modal = false, onClick, salonDescription, salonCreateDate, salonOwner, phoneNumber, link }) => {
  return (
    modal ? <Link to={`/master/${link}`}>
      <div className='lg:w-[380px] w-full cursor-pointer lg:h-[130px] h-max rounded-xl reviews-shadow p-3 bg-white'>
        <div className='flex justify-between'>
          <div className='flex gap-3 mt-3'>
            <div>
              <img className='w-7 h-7 rounded-full' src={ownerImage} alt="master image" />
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
    </Link> :
      <div onClick={onClick}>
        <div className='lg:w-[380px] w-full cursor-pointer lg:h-[130px] h-max rounded-xl reviews-shadow p-3 bg-white'>
          <div className='flex justify-between'>
            <div className='flex gap-3 mt-3'>
              <div>
                <img className='w-7 h-7 rounded-full' src={ownerImage} alt="master image" />
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
      </div>
  )
}

export default SpecializationsCard