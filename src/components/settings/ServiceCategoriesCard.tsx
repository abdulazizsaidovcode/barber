import React, { useState, useRef } from "react";
import { MdEdit, MdDelete, MdSave } from "react-icons/md";

interface ServiceCategoriesCardProps {
  title: string;
  editOnClick: (newTitle: string) => void;
  deleteOnClick: () => void;
}

const ServiceCategoriesCard: React.FC<ServiceCategoriesCardProps> = ({ title, editOnClick, deleteOnClick }) => {
  const [isEditable, setIsEditable] = useState(false);
  const [currentTitle, setCurrentTitle] = useState(title);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleEditClick = () => {
    if (isEditable) {
      editOnClick(currentTitle);
      
    } else {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 0);
    }
    setIsEditable(!isEditable);
  };

  return (
    <div className="flex mt-4">
      <div>
        <input
          ref={inputRef}
          type="text"
          value={currentTitle}
          disabled={!isEditable}
          onChange={(e) => setCurrentTitle(e.target.value)}
          placeholder="Type something..."
          className="dark:bg-[#60606d] w-[323px] border-black h-13 bg-[#f1f5f9] border-[1px] dark:border-white active:outline-none dark:bg-gray-800 dark:text-white rounded-md px-3"
        />
      </div>
      <div className="flex items-center gap-2 ms-5">
        {isEditable ? (
          <button
            onClick={() => {
              handleEditClick();
              editOnClick(currentTitle);
              
            }}
            className="p-[6px] dark:border-[#fff] border-[#000] border-[1px] rounded-lg"
          >
            <MdSave size={20} color="black" className="dark:text-white" />
          </button>
        ) : (
          <button onClick={handleEditClick} className="p-[6px] dark:border-[#fff] border-[#000] border-[1px] rounded-lg">
            <MdEdit size={20} color="black" className="dark:text-white" />
          </button>
        )}
        <button onClick={deleteOnClick} className="p-[6px] dark:border-[#fff] border-[1px] border-[#000] rounded-lg">
          <MdDelete size={20} color="black" className="dark:text-white" />
        </button>
      </div>
    </div>
  );
};

export default ServiceCategoriesCard;
