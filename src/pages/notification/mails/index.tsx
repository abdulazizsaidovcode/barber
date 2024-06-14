import React, { useEffect, useState } from 'react';
import { DatePicker, Input, Dropdown, Menu, DatePickerProps, Image } from 'antd';
import { Buttons } from '../../../components/buttons';
import AddMails from './addMails';
import { TbArrowBigLeftFilled } from 'react-icons/tb';
import { Moment } from 'moment';
import MailStore from '../../../helpers/state_managment/chat/mailStore';
import MasterTable from '../../../components/Tables/MasterTable';
import { truncateText } from '../../../helpers/splitText';
import { PiDotsThreeOutlineVertical } from 'react-icons/pi';
import Modal from '../../../components/modals/modal';
import axios from 'axios';
import { getFileId, newsletters_url } from '../../../helpers/api';
import { config } from '../../../helpers/token';
import toast from 'react-hot-toast';
import { GetChatLetters } from '../../../helpers/api-function/chat/mail';
import { MdOutlineSpeakerNotesOff } from 'react-icons/md';
import { SearchOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const ChatTable: React.FC = () => {
    const { chatData, setLetterData } = MailStore();
    const navigate = useNavigate();

    const [dates, setDate] = useState<Moment | any | null>(null);
    const [showAddMails, setShowAddMails] = useState(false);
    const [selectedMailId, setSelectedMailId] = useState<number | null>(null);
    const [modalOpen, setModalOpen] = useState<boolean>(false);
    const [options, setOptions] = useState<{ value: string, label: string }[]>([]);

    const handleChange: DatePickerProps['onChange'] = (date) => {
        setDate(date);
        if (date) {
            GetChatLetters({
                date: `${date.year()}-${date.month() < 10 ? `0${date.month() + 1}` : date.month() + 1}-${date.date() < 10 ? `0${date.date()}` : date.date()}`,
                setLetterData: setLetterData
            });
        }
    };

    const handleChangeTema: any = (date: any) => {
        if (date.target.value.trim() !== '') {
            GetChatLetters({
                subject: date.target.value,
                setLetterData: setLetterData
            });
        } else {
            GetChatLetters({
                setLetterData: setLetterData
            });
        }
    };

    useEffect(() => {
        const newOptions = chatData.map((item: any) => ({
            value: item.content,
            label: item.content,
        }));
        setOptions(newOptions);
    }, [chatData]);
    const { t } = useTranslation()

    const thead = [
        { id: 1, name: t("Picture") },
        { id: 2, name: t("Subject") },
        { id: 3, name: t("To_whom") },
        { id: 4, name: t("Date") },
        { id: 5, name: t("Attachments") },
        { id: 6, name: t("Description") },
        { id: 7, name: ' ' },
    ];

    const openModal = () => {
        setModalOpen(!modalOpen);
    };

    const handleMenuClick = (id: number) => {
        setSelectedMailId(id);
        openModal();
    };

    const handleOpenDetail = (id: number) => {
        navigate(`/mail/${id}`);
    };

    function deleteMail(id: any) {
        if (selectedMailId) {
            axios.delete(`${newsletters_url}?id=${id}`, config)
                .then(res => {
                    GetChatLetters({
                        setLetterData: setLetterData
                    });
                    openModal()
                    toast.success(t("Successfully_done"));
                }).catch(err => {
                    console.error(err.data);
                })
        }
    }

    const items = (id: number) => [
        {
            key: '1',
            onClick: () => handleOpenDetail(id),
            label: t("Open"),
        },
        {
            key: '2',
            onClick: () => handleMenuClick(id),
            label: t("Delete"),
        },
    ];

    return (
        <section>
            {showAddMails ? (
                <div className='pt-5'>
                    <div className='mb-5 flex'>
                        <Buttons onClick={() => setShowAddMails(false)}>
                            <TbArrowBigLeftFilled />
                        </Buttons>
                    </div>
                    <AddMails />
                </div>
            ) : (
                <div className='pt-5'>
                    <div className='mb-5 flex gap-2 sm:flex-row flex-col'>
                        <Input
                            className='w-full md:w-40 lg:w-40 xl:w-40  dark:bg-gray-800 dark:text-black'
                            defaultValue='Тема'
                            style={{ width: 163 }}
                            onChange={handleChangeTema}
                            suffix={<SearchOutlined />}
                        />
                        <DatePicker
                            style={{ width: 163 }}
                            className='h-8 w-full md:w-50 lg:w-50 xl:w-50 dark:bg-gray-800 dark:text-white'
                            placeholder={t("Date")}
                            onChange={handleChange}
                        />
                        <div onClick={() => setShowAddMails(true)}>
                            <Buttons>{t("Create_a_newsletter")}</Buttons>
                        </div>
                    </div>

                    <MasterTable thead={thead}>
                        {chatData.length > 0 ? (
                            chatData.map((item) => (
                                <tr
                                    key={item.id}
                                    className='border-b border-[#eee] dark:border-strokedark'
                                >
                                    <td className='min-w-[150px] p-5'>
                                        <Image
                                            style={{ width: 80, height: 60, borderRadius: '10px' }}
                                            src={item.attachmentId ? getFileId + item.attachmentId : "https://picsum.photos/200/300"}
                                            alt="Mail img"
                                            className='w-16 h-10 scale-[1.4] rounded-md bg-gray p-2 object-cover'
                                        />
                                    </td>
                                    <td className="min-w-[150px] p-5">
                                        <p className="text-black dark:text-white">{item.subject}</p>
                                    </td>
                                    <td className="min-w-[150px] p-5">
                                        <p className="text-black dark:text-white">{item.toWhom}</p>
                                    </td>
                                    <td className="min-w-[150px] p-5">
                                        <p className="text-black dark:text-white">{item.date}</p>
                                    </td>
                                    <td className="min-w-[150px] p-5">
                                        <p className="text-black dark:text-white">{truncateText(item.fileId, 10)}</p>
                                    </td>
                                    <td className="min-w-[150px] p-5">
                                        <p className="text-black dark:text-white">{truncateText(item.content, 30)}</p>
                                    </td>
                                    <td className="min-w-[150px] p-5">
                                        <Dropdown overlay={<Menu items={items(item.id)} />} placement="bottomLeft" arrow>
                                            <PiDotsThreeOutlineVertical />
                                        </Dropdown>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr className='border-b border-[#eee] dark:border-strokedark flex justify-center md:w-[30vw] w-[100vw]'>
                                <td
                                    className="min-w-full text-center py-10 text-xl font-bold flex gap-5 items-center"
                                    colSpan={12}
                                >
                                    <p>{t("the_is_unavailable")}</p>
                                    <MdOutlineSpeakerNotesOff />
                                </td>
                            </tr>
                        )}
                    </MasterTable>
                </div>
            )}
            <Modal isOpen={modalOpen} onClose={openModal}>
                <div className='dark:text-gray-400 pt-10 px-10'>
                    <div className='flex justify-center flex-col items-center mt-4'>
                        <p>{t("Are_you_sure_you")}</p>
                        <div className='flex gap-10 mt-16'>
                            <Buttons bWidth={"w-40"} onClick={() => openModal()}>{t("Close")}</Buttons>
                            <Buttons bWidth={"w-40"} onClick={() => deleteMail(selectedMailId)}>{t("Delete")}</Buttons>
                        </div>
                    </div>
                </div>
            </Modal>
        </section>
    );
};

export default ChatTable;
