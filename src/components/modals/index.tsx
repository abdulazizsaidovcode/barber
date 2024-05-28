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
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-green-50 bg-opacity-50">
            <div className="bg-white absolute rounded-lg shadow-lg p-6">
                {children}
                <button className='relative -top-[88px] left-67' onClick={onClose}>
                    <IoMdCloseCircleOutline size={30} color='#000' />
                </button>
            </div>
        </div>
    );
};

export default Modal;