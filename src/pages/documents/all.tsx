import React, { useEffect, useState } from 'react';
import Accordion from '../../components/accordion/accordion';
import Switch from '../../components/settings/details/TableSwitcher';
import FileUploader from '../../components/FileDowlander';
import axios from 'axios';
import { get_attachment_url, help_url } from '../../helpers/api';
import { MdEdit } from 'react-icons/md';
import { config } from '../../helpers/token';

interface DataItem {
    id: number;
    text: string;
    active: boolean;
    attachment: any;
}

interface AllProp {
    title: string;
    status: string;
    data: DataItem[];
}

const All: React.FC = () => {
    const [accordionItems, setAccordionItems] = useState<AllProp[]>([]);
    const [switchStates, setSwitchStates] = useState<{ [key: number]: boolean }>({});

    useEffect(() => {
        // Initialize accordion items   
        setAccordionItems([
            {
                title: 'О сервисе',
                status: 'ABOUT_SERVICE',
                data: []
            },
            {
                title: 'Политика конфиденциальности',
                status: 'PRIVACY_POLICY',
                data: []
            },
            {
                title: 'Лицензионное соглашение',
                status: 'ABOUT_SERVICE',
                data: []
            },
            {
                title: 'Лицензии',
                status: 'ABOUT_SERVICE',
                data: []
            }
        ]);
    }, []);

    const fetchData = async (status: string, index: number) => {
        try {
            const res = await axios.get(`${help_url}?HELP_STATUS=${status}`, config);
            const newData = res.data.body;
            setAccordionItems(prevState => {
                const updatedItems = [...prevState];
                updatedItems[index].data = newData;
                return updatedItems;
            });
        } catch (error) {
            console.error(error);
        }
    };

    const fetchAttachmentData = async () => {
        try {
            const res = await axios.get(`${get_attachment_url}/d4405ded-50d5-4d0d-a039-e4638ddd3e18`);
            console.log(res);
        } catch (error) {
            console.log(error);
        }
    };

    const toggleSwitch = (index: number) => {
        setSwitchStates(prevState => ({
            ...prevState,
            [index]: !prevState[index]
        }));
    };

    return (
        <div className='p-2'>
            <div className='flex flex-col gap-3 mb-3 text-slate-700 dark:text-slate-300'>
                {accordionItems.map((item, index) => (
                    <Accordion onClick={() => fetchData(item.status, index)} key={index} title={item.title}>
                        {item.data.length !== 0 && item.data.map((dataItem, i) => (
                            <div key={i}>
                                <div className='border-[1px] p-5 rounded-2xl dark:border-white bg-white dark:bg-black text-slate-700 dark:text-slate-300'>
                                    <p>{dataItem.text}</p>

                                </div>
                                <div className='mt-3 flex gap-3 items-center text-slate-700 dark:text-slate-300'>
                                    <p>Отображать в приложениях</p>
                                    <Switch
                                        isOn={switchStates[dataItem.id] !== undefined ? switchStates[dataItem.id] : dataItem.active}
                                        handleToggle={() => toggleSwitch(dataItem.id)}
                                    />
                                </div>
                                <button
                                    className="p-[6px] dark:border-[#fff] border-[#000] border-[1px] rounded-lg"
                                >
                                    <MdEdit size={20} className="dark:text-white" />
                                </button>
                            </div>
                        ))}
                    </Accordion>
                ))}
                <button
                    className={`bg-[#9C0A35] text-white px-3 py-2 rounded-lg ${!Object.values(switchStates).some(state => state) ? 'opacity-50 cursor-not-allowed' : ''}`}
                    disabled={!Object.values(switchStates).some(state => state)}
                >
                    Сохранить изменения
                </button>
                <FileUploader />
            </div>
        </div>
    );
};

export default All;
