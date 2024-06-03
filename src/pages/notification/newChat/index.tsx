import { Select } from 'antd';
import { useEffect, useState } from 'react';
import Modal from '../../../components/modals/modal';
import { Buttons } from '../../../components/buttons';
import chatStore from '../../../helpers/state_managment/chat/chatStore';
import masterStore from '../../../helpers/state_managment/master/masterStore';
import clientStore from '../../../helpers/state_managment/client/clientstore';
import { Option } from 'antd/es/mentions';


function NewChat({ }) {
    const [datas, setDatas] = useState<any>(null);
    const [recipientName, setRecipientId] = useState<string | null>(null);
    const [modalOpen, setModalOpen] = useState<boolean>(false);

    const { role } = chatStore();
    const { data } = masterStore();
    const { clientData } = clientStore();


    useEffect(() => {
        if (role === 'master') {
            setDatas(data)
        }
        if (role === 'client') {
            setDatas(clientData)
        }
    }, [])

    useEffect(() => {
        if (role === 'master') {
            setDatas(data)
        }
        if (role === 'client') {
            setDatas(clientData)
        }
    }, [role]);



    // ----------- open modal ----------- //
    const openModal = () => setModalOpen(!modalOpen);


    return (
        <div className='z-10 '>
            <div onClick={openModal}>
                <Buttons >Начать</Buttons>
            </div>
            <Modal isOpen={modalOpen} onClose={openModal}>
                <div className='dark:text-gray-400'>
                    <div className='flex gap-10'>
                        <div>
                            <p>Имя или фамилия мастера:</p>
                            <Select
                                className='z-100 w-full mt-3'
                                placeholder="выберите номер"
                                defaultValue="Имя или фамилия"
                                showSearch
                            >
                                {datas && datas.map((item: any) => (
                                    <Option value={item.fullName} >{item.fullName}</Option>
                                ))}
                            </Select>
                        </div>
                        <div>
                            <p>Телефон мастера:</p>
                            <Select
                                className='z-100 w-full mt-3'
                                placeholder="выберите номер"
                                defaultValue="номер"
                                showSearch
                            >
                                {datas && datas.map((item: any) => (
                                    <Option value={item.phoneNumber} >{item.phoneNumber}</Option>
                                ))}
                            </Select>
                        </div>
                    </div>
                    <div className='mt-5'>
                        <label className="block mb-2 text-sm font-medium text-gray-900 ">Сообщение</label>
                        <textarea id="message" rows={4} className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-slate-700 dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Write your thoughts here..."></textarea>
                    </div>
                    <div className='flex justify-center mt-4'>
                        <Buttons>Отправить</Buttons>
                    </div>
                </div>
            </Modal>
        </div>
    );
}

export default NewChat;
