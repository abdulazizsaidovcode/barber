import React from 'react';
import Modal from '../../modals/modal';

interface DelModalProps {
    isOpen: boolean;
    onClose: () => void;
    onDelete?: () => void;
}

const DelModal: React.FC<DelModalProps> = ({ isOpen, onClose, onDelete }) => {
    return (
        <>
            <Modal isOpen={isOpen} onClose={onClose}>
                <div className="sm:w-[500px] w-[300px] h-[130px]">
                    <div className="flex justify-center">
                        <p className="text-xl text-[#000] dark:text-white text-center">Вы уверены что хотите удалить процедуру?</p>
                    </div>
                    <div className="flex justify-around mt-10">
                        <button onClick={onDelete} className="text-white rounded-lg dark:bg-danger bg-[#000] md:py-2 py-1 px-4 md:px-10">Удалить</button>
                        <button onClick={onClose} className="text-white rounded-lg dark:bg-white dark:text-[#000]  bg-gray md:py-2 py-1 px-4 md:px-10">Нет</button>
                    </div>  
                </div>
            </Modal>
        </>
    );
};

export default DelModal;
