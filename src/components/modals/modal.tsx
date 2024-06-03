import React from 'react';
import { IoMdCloseCircleOutline } from "react-icons/io";

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    children?: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-100 flex items-center justify-center bg-slate-900 bg-opacity-50 ">
            <div className="bg-white dark:text-gray-400 dark:bg-[#30303d] relative rounded-lg shadow-lg p-6 ">
                <div>
                    {children}
                </div>
                <button
                    onClick={onClose}
                    className='absolute top-0 right-0 mt-[-20px] mr-[-20px]'
                >
                    <IoMdCloseCircleOutline size={30} color='#000' />
                </button>
            </div>
        </div>
    );
};

export default Modal;
