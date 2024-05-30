import React, { useState } from "react";
import { MdEdit, MdDelete } from "react-icons/md";
import Modal from "../modals/modal";
interface ServiceCategoriesCardProps {
  title: string;
  editOnClick: (newTitle: string) => void;
  deleteOnClick: () => void;
}

const ServiceCategoriesCard: React.FC<ServiceCategoriesCardProps> = ({ title, editOnClick, deleteOnClick }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentTitle, setCurrentTitle] = useState(title);
  const [changedTitle, setChangedTitle] = useState(title);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  return (
    <div className="flex mt-4">
      <div>
        <div className="dark:bg-[#60606d] w-[323px] border-black h-13 bg-[#f1f5f9] border-[1px] dark:border-white active:outline-none dark:bg-gray-800 dark:text-white rounded-md px-3 flex items-center"
        >{currentTitle}</div>
      </div>
      <div className="flex items-center gap-2 ms-5">
        <button
          onClick={() => {
            openModal()
          }}
          className="p-[6px] dark:border-[#fff] border-[#000] border-[1px] rounded-lg">
          <MdEdit size={20} color="black" className="dark:text-white" />
        </button>
        <button onClick={deleteOnClick} className="p-[6px] dark:border-[#fff] border-[1px] border-[#000] rounded-lg">
          <MdDelete size={20} color="black" className="dark:text-white" />
        </button>
      </div>
      <Modal isOpen={isOpen} onClose={closeModal}>
        <div className="w-[500px] h-max">
          <div className="flex justify-center">
            <p className="text-xl text-black">Вы что хоите удалить процедуру?</p>
          </div>
          <div className="flex justify-center mt-10">
            <input
              value={currentTitle}
              onChange={(e) => setCurrentTitle(e.target.value)}
              className="dark:border-slate-700 w-[323px] border-black h-13 bg-[#f1f5f9] border-[1px]  active:outline-none dark:bg-slate-100 dark:text-dark rounded-md px-3 l"
            />
          </div>
          <div className="flex justify-around mt-10">
            <button onClick={() => {
              closeModal()
            }} className="text-white bg-[#000] py-2 px-10">close</button>
            <button onClick={() => {
              if (changedTitle !== currentTitle && currentTitle.trim() !== " " && currentTitle !== "") {
                if (+currentTitle !== 0 && +currentTitle < 100) {
                  closeModal()
                  editOnClick(currentTitle)
                } else {
                  alert("0 ga teng bolmasligi va 100dan bvalandd bolmasligi kerak")
                }
              } else {
                alert("suka ozgartir")
              }
            }} className="text-white bg-gray py-2 px-14">Save</button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default ServiceCategoriesCard;
