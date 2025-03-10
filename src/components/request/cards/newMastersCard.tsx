import React from 'react';
import { getFileId } from '../../../helpers/api';
import userImg from '../../../images/user.png';
import { useTranslation } from 'react-i18next';

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
  const { t } = useTranslation();

  const displayArray = (array: string[] | undefined) => (array && array.length > 0 ? array.join(', ') : t('Salon_category_is_not_configured'));

  return (
    <div onClick={modal} className="lg:w-[280px] md:w-[310px] sm:w-[320px] w-[320px] cursor-pointer rounded-xl shadow-lg p-3 bg-white">
      <div>
        <p className="text-xl font-bold text-black">{salonName}</p>
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
          <div>
            <p className="text-[14px] text-black">{salonOwner}</p>
          </div>
          <div className="flex items-center gap-10">
            <p className="text-[12px] text-black">{phoneNumber}</p>
            <p className="text-[12px] text-black">{salonCreateDate}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NewMastersCard;
