import React from 'react';
import { getFileId } from '../../../helpers/api';
import userImg from '../../../images/user.png';

interface NewMastersCardProp {
  salonName: string;
  salonOwner: string;
  salonAddress: string;
  phoneNumber: string;
  salonCategory: string[];
  salonCreateDate: string;
  ownerImage: string | null;
  modal: () => void;
}

const NewMastersCard: React.FC<NewMastersCardProp> = ({
  salonName,
  ownerImage,
  salonAddress,
  salonCategory,
  modal,
  salonCreateDate,
  salonOwner,
  phoneNumber
}) => {
  const displayValue = (value: string | undefined | null) => (value ? value : 'не настроено');
  const displayArray = (array: string[] | undefined) => (array && array.length > 0 ? array.join(', ') : 'не настроено');
  
  return (
    <div onClick={modal} className="lg:w-[280px] md:w-[310px] sm:w-[320px] w-[320px] cursor-pointer h-[200px] rounded-xl shadow-lg p-3 bg-white">
      <div>
        <p className="text-xl font-bold text-black">{displayValue(salonName)}</p>
        <p className="text-md font-bold text-black">{displayArray(salonCategory)}</p>
        <p className="text-md text-black">{salonAddress}</p>
      </div>
      <div className="mt-3">
        <hr />
      </div>
      <div className="flex gap-3 mt-3">
        <div>
          <img className="w-7 h-7 mt-3 rounded-full" src={ownerImage ? getFileId + ownerImage : userImg} alt="Owner" />
        </div>
        <div>
          <p className="text-[14px] text-black">{salonOwner}</p>
          <div className="flex items-center w-full">
            <p className="text-[13px] text-black">{phoneNumber}</p>
            <p className="text-[12px] ml-10 text-black">{salonCreateDate}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NewMastersCard;
