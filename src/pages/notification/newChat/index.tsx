import { Select } from 'antd';
import { useEffect, useState } from 'react';
import Modal from '../../../components/modals/modal';
import { Buttons } from '../../../components/buttons';
import chatStore from '../../../helpers/state_managment/chat/chatStore';
import masterStore from '../../../helpers/state_managment/master/masterStore';
import clientStore from '../../../helpers/state_managment/client/clientstore';
import { Option } from 'antd/es/mentions';
import axios from 'axios';
import { newChat_url } from '../../../helpers/api';
import { config } from '../../../helpers/token';
import toast, { Toaster } from 'react-hot-toast';
import { GetChatList } from '../../../helpers/api-function/chat/chat';


function NewChat() {
    const [datas, setDatas] = useState<any>(null);
    const [recipientId, setRecipientId] = useState<string | null>(null);
    const [recipientName, setRecipientName] = useState<string | null>(null);
    const [recipientPhone, setRecipientPhone] = useState<string | null>(null);
    const [modalOpen, setModalOpen] = useState<boolean>(false);

    const { role, setChatData } = chatStore();
    const { data } = masterStore();
    const { clientData } = clientStore();

    useEffect(() => {
        if (role === 'master') {
            setDatas(data);

        } else if (role === 'client') {
            setDatas(clientData);
        }
    }, [role, data, clientData]);

    const handleChange = (value: string) => {
        const selectedItem = datas.find((item: any) => item.fullName === value || item.phoneNumber === value);
        if (selectedItem) {
            setRecipientId(selectedItem.id);
            setRecipientName(selectedItem.fullName);
            setRecipientPhone(selectedItem.phoneNumber);
        }
    };

    const openModal = () => {
        setModalOpen(!modalOpen)
        setRecipientId(null);
        setRecipientName(null);
        setRecipientPhone(null);
    };

    const sentNotification = () => {
        const messageElement = document.getElementById('message') as HTMLTextAreaElement;
        let content: string = messageElement.value;

        const editMessage: any = {
            userId: recipientId,
            message: content,
            status: role
        }

        if (recipientId && recipientName && content.trim()) {
            console.log(editMessage);

            axios.post(`${newChat_url}`, editMessage, config)
                .then((res) => {
                    console.log(res.data);
                    if (res.data.success === true) {
                        openModal()
                        toast.success('Сообщение отправлено');

                        if (role === 'master') {
                            GetChatList({
                                status: "MASTER",
                                setData: setChatData
                            })

                        }
                        if (role === 'client') {
                            GetChatList({
                                status: "CLIENT",
                                setData: setChatData
                            })
                        }
                    }
                }).catch((err) => {
                    console.error(err);
                })

        } else {
            toast.error('Заполните все поля');
        }
    }


    return (
        <div className=' z-1 '>
            <div onClick={openModal}>
                <Buttons>Начать</Buttons>
            </div>
            <Modal isOpen={modalOpen} onClose={openModal}>
                <div className='dark:text-gray-400'>
                    <div className='flex gap-10'>
                        <div>
                            <p>Имя или фамилия мастера:</p>
                            <Select
                                className='z-100 w-full mt-3'
                                placeholder="выберите номер"
                                value={recipientName || undefined} // Use value instead of defaultValue
                                showSearch
                                onChange={handleChange}
                                onBlur={() => setRecipientName(recipientName)} // Close the Select on blur
                            >
                                {datas && datas.map((item: any) => (
                                    <Option key={item.id} value={item.fullName}>{item.fullName}</Option>
                                ))}
                            </Select>
                        </div>
                        <div>
                            <p>Телефон мастера:</p>
                            <Select
                                className='z-100 w-full mt-3'
                                placeholder="выберите номер"
                                value={recipientPhone || undefined} // Use value instead of defaultValue
                                showSearch
                                onChange={handleChange}
                                onBlur={() => setRecipientPhone(recipientPhone)} // Close the Select on blur
                            >
                                {datas && datas.map((item: any) => (
                                    <Option key={item.id} value={item.phoneNumber}>{item.phoneNumber}</Option>
                                ))}
                            </Select>
                        </div>
                    </div>
                    <div className='mt-5'>
                        <label className="block mb-2 text-sm font-medium text-gray-900">Сообщение</label>
                        <textarea id="message" rows={4} className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-slate-700 dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Write your thoughts here..."></textarea>
                    </div>
                    <div className='flex justify-center mt-4'>
                        <div onClick={sentNotification}>
                            <Buttons>Отправить</Buttons >
                        </div>
                    </div>
                </div>
            </Modal>
            <Toaster
                position="top-center"
                reverseOrder={false}
            />
        </div>
    );
}

export default NewChat;
