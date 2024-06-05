import React, { useEffect } from 'react';
import { IoMdCloseCircleOutline } from "react-icons/io";

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    children?: React.ReactNode;
    mt?: string;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children, mt }) => {
    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                onClose();
            }
        };

        if (isOpen) {
            window.addEventListener('keydown', handleKeyDown);
        } else {
            window.removeEventListener('keydown', handleKeyDown);
        }

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    return (
        <div
            className="fixed inset-0 z-9999 flex items-center justify-center overflow-auto bg-slate-900 py-10 bg-opacity-50"
            onClick={onClose}
        >
            <div
                className={`bg-white dark:text-gray-400 dark:bg-[#30303d] relative rounded-lg shadow-lg p-6 ${mt}`}
                onClick={(e) => e.stopPropagation()}
            >
                <div>
                    {children}
                </div>
                <button
                    onClick={onClose}
                    className='absolute top-0 right-0 mt-[-20px] mr-[-20px]'
                >
                    <IoMdCloseCircleOutline size={30} className='dark:text-white' color='#000' />
                </button>
            </div>
        </div>
    );
};

export default Modal;
