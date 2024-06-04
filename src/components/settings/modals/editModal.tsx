import React from 'react';
import Modal from '../../modals/modal';

interface EditModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSave?: () => void;
    onChange?: (e: any) => void;
    defaultValue?: any
    value?: any
}

const EditModal: React.FC<EditModalProps> = ({ isOpen, defaultValue, value, onClose, onSave, onChange }) => {
    return (
        <>
            <Modal isOpen={isOpen} onClose={onClose}>
                <div className="w-[500px] h-max">
                    <div className="flex justify-center">
                        <p className="text-xl dark:text-white text-black">Are you sure you want to edit the title?</p>
                    </div>
                    <div className="flex justify-center mt-10">
                        <input
                            defaultValue={defaultValue}
                            value={value}
                            onChange={onChange}
                            className="dark:border-slate-700 w-[323px] dark:text-[#000] border-black h-13 bg-[#f1f5f9] border-[1px]  active:outline-none dark:bg-slate-100 dark:text-dark rounded-md px-3"
                        />
                    </div>
                    <div className="flex justify-around mt-10">
                        <button onClick={onClose} className="text-white rounded-lg dark:bg-danger bg-[#000] py-2 px-10">
                            Close
                        </button>
                        <button
                            className="text-white rounded-lg dark:bg-white dark:text-[#000] bg-gray py-2 px-14"
                            onClick={onSave}
                        >
                            Save
                        </button>
                    </div>
                </div>
            </Modal>
        </>
    );
};

export default EditModal;
