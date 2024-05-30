import React from 'react';
import { MdEdit, MdDelete } from 'react-icons/md';
import onlineBookingStore from '../../../helpers/state_managment/settings/online_booking.tsx';

interface ServiceCategoriesCardProps {
  title: string;
  itemVal?: Data | undefined;
  editOnClick: () => void;
  deleteOnClick: () => void;
}

interface Data {
  id: number;
  percent: string;
}

const ServiceCategoriesCard: React.FC<ServiceCategoriesCardProps> = ({ title, itemVal, editOnClick, deleteOnClick }) => {
  const { setItems } = onlineBookingStore();
  return (
    <div className="flex mt-4">
      <div>
        <div
          className="dark:bg-[#60606d] w-[323px] border-black h-13 bg-[#f1f5f9] border-[1px] dark:border-white active:outline-none dark:bg-gray-800 dark:text-white rounded-md px-3 flex items-center">
          {title}
        </div>
      </div>
      <div className="flex items-center gap-2 ms-5">
        <button
          onClick={() => {
            editOnClick();
            setItems(itemVal);
          }}
          className="p-[6px] dark:border-[#fff] border-[#000] border-[1px] rounded-lg"
        >
          <MdEdit size={20} color="black" className="dark:text-white" />
        </button>
        <button
          onClick={() => {
            deleteOnClick()
            setItems(itemVal)
          }}
          className="p-[6px] dark:border-[#fff] border-[1px] border-[#000] rounded-lg"
        >
          <MdDelete size={20} color="black" className="dark:text-white" />
        </button>
      </div>
    </div>
  );
};

export default ServiceCategoriesCard;
