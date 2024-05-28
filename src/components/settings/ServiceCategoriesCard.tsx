import React from "react";
import { MdEdit, MdDelete  } from "react-icons/md";

interface ServiceCategoriesCard {
  title: string;
  editOnClick: () => void;
  deleteOnClick: () => void;
}

const ServiceCategoriesCard: React.FC<ServiceCategoriesCard> = ({ title, editOnClick, deleteOnClick }) => {
  return (
    <div className="flex mt-4">
      <div className="w-full flex items-center p-3 rounded-md border-[1px] dark:border-[#fff] border-[#000]">
        <p className="dark:text-white">{title}</p>
      </div>
      <div className="flex items-center gap-2 ms-5">
        <button onClick={editOnClick} className="p-[6px]  dark:border-[#fff] border-[#000] border-[1px] rounded-lg">
          <MdEdit size={20} color="black"/>
        </button>
        <button onClick={deleteOnClick}  className="p-[6px] dark:border-[#fff] border-[1px] border-[#000] rounded-lg">
          <MdDelete size={20} color="black" />
        </button>
      </div>
    </div>
  )
}

export default ServiceCategoriesCard;