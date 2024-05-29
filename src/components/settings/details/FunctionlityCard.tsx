import React from "react";
import { MdEdit } from "react-icons/md";


interface FunctionlityCardProp {
  title: string;
  editOnClick: () => void;
}

const FunctionlityCard: React.FC<FunctionlityCardProp> = ({ title, editOnClick }) => {
  return (
    <div className="flex mt-4">
      <div className="w-full flex items-center p-3 rounded-md border-[1px] dark:border-[#fff] border-[#000]">
        <p className="dark:text-white">{title}</p>
      </div>
      <div className="flex items-center gap-2 ms-5">
        <button onClick={editOnClick} className="p-[6px]  dark:border-[#fff] border-[#000] border-[1px] rounded-lg">
          <MdEdit size={20} className="dark:text-white"/>
        </button>
      </div>
    </div>
  )
}

export default FunctionlityCard;