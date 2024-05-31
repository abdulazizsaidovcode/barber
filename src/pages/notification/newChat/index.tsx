import { Select } from 'antd';
import React, { useState } from 'react';
import Modal from '../../../components/modals/modal';
import { Buttons } from '../../../components/buttons';

function NewChat({ }) {
    const [modalOpen, setModalOpen] = useState<boolean>(false);

    // ----------- open modal ----------- //
    const openModal = () => setModalOpen(!modalOpen);

    const regionOptions = [
        { value: "1", label: "Not Identified" },
        { value: "2", label: "Closed" },
    ];

    return (
        <div className='z-10'>
            <div onClick={openModal}>
                <Buttons >Начать</Buttons>
            </div>
            <Modal isOpen={modalOpen} onClose={openModal}>
                <div className='flex gap-10'>
                    <div>
                        <p>Имя или фамилия мастера:</p>
                        <Select
                            className='z-100 w-full mt-3'
                            showSearch
                            placeholder="Регион"
                            optionFilterProp="children"
                            filterOption={(input, option) =>
                                (option?.label ?? "").includes(input)
                            }
                            filterSort={(optionA, optionB) =>
                                (optionA?.label ?? "")
                                    .toLowerCase()
                                    .localeCompare((optionB?.label ?? "").toLowerCase())
                            }
                            options={regionOptions}
                        />
                    </div>
                    <div>
                        <p>Имя или фамилия мастера:</p>
                        <Select
                            className='z-100 w-full mt-3'
                            showSearch
                            placeholder="Регион"
                            optionFilterProp="children"
                            filterOption={(input, option) =>
                                (option?.label ?? "").includes(input)
                            }
                            filterSort={(optionA, optionB) =>
                                (optionA?.label ?? "")
                                    .toLowerCase()
                                    .localeCompare((optionB?.label ?? "").toLowerCase())
                            }
                            options={regionOptions}
                        />
                    </div>
                </div>
            </Modal>
        </div>
    );
}

export default NewChat;
