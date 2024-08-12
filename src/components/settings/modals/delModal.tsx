import React from 'react';
import Modal from '../../modals/modal';
import { useTranslation } from 'react-i18next';

interface DelModalProps {
    isOpen: boolean;
    onClose: () => void;
    onDelete?: () => void;
}

const DelModal: React.FC<DelModalProps> = ({ isOpen, onClose, onDelete }) => {
    const { t } = useTranslation();
    return (
        <>
            <Modal isOpen={isOpen} onClose={onClose}>
                <div className="sm:w-[500px] w-[300px] h-[130px]">
                    <div className="flex justify-center">
                        <p className="text-xl text-[#000] dark:text-white text-center">{t("Are_you_sure_you_want_to_delete_the_procedure")}</p>
                    </div>
                    <div className="flex justify-around mt-10">
                        <button onClick={onClose} className="text-white rounded-lg dark:bg-white dark:text-[#000]  bg-gray md:py-2 py-1 px-4 md:px-10">{t("Not")}</button>
                        <button onClick={onDelete} className="text-white rounded-lg dark:bg-danger bg-[#000] md:py-2 py-1 px-4 md:px-10">{t("Delete")}</button>
                    </div>
                </div>
            </Modal>
        </>
    );
};

export default DelModal;
