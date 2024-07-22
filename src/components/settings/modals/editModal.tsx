import React from 'react';
import Modal from '../../modals/modal';
import toast from 'react-hot-toast';
import { useTranslation } from 'react-i18next';
import { Buttons } from '../../buttons';

interface EditModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSave: () => void;
    handleUploadClick?: () => void;
    handleImageChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    defaultValue?: string;
    value?: string;
    type?: string;
    disabled?: boolean;
    attachmentStyle?: boolean;
    attchmentId?: string;
}

const EditModal: React.FC<EditModalProps> = ({
    isOpen,
    defaultValue,
    value,
    onClose,
    onSave,
    onChange,
    type,
    disabled,
    handleUploadClick,
    handleImageChange,
    attchmentId,
    attachmentStyle
}) => {
    const { t } = useTranslation();

    const handleSave = () => {
        if (defaultValue === value) {
            toast.error(t('No_changes_detected_Please_modify_the_value_before_saving'));
        } else {
            onSave();
        }
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <div className="sm:w-[500px] w-[300px] h-max">
                <div className="flex justify-center">
                    <p className="text-xl dark:text-white text-black text-center">
                        {t('Are_you_sure_you_want_to_edit_the_title')}
                    </p>
                </div>
                <div className="flex flex-col items-center mt-10">
                    <input
                        type={type ? type : 'text'}
                        defaultValue={defaultValue}
                        value={value}
                        onChange={onChange}
                        className="dark:border-slate-700 w-[323px] dark:text-[#000] border-black h-13 bg-[#f1f5f9] border-[1px] active:outline-none dark:bg-slate-100 dark:text-dark rounded-md px-3"
                    />
                    {attachmentStyle &&
                        <div className="mt-3 flex items-center gap-3">
                            <Buttons onClick={handleUploadClick}>Upload</Buttons>
                            <input
                                id="imageUploadInput"
                                type="file"
                                accept="image/*"
                                style={{ display: 'none' }}
                                onChange={handleImageChange}
                            />
                            <img className="w-8 h-8 object-cover" src={attchmentId} alt="" />
                        </div>
                    }

                </div>
                <div className="flex justify-around mt-10">
                    <button onClick={onClose} className="text-white rounded-lg dark:bg-danger bg-[#000] sm:py-2 py-1 px-6 sm:px-10">
                        {t('Close')}
                    </button>
                    <button
                        disabled={disabled}
                        className="text-white rounded-lg dark:bg-white dark:text-[#000] bg-gray sm:py-2 py-1 px-6 sm:px-10"
                        onClick={handleSave}
                    >
                        {disabled ? 'Loading...' : t('Save')}
                    </button>
                </div>
            </div>
        </Modal>
    );
};

export default EditModal;
