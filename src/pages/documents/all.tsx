import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Accordion from '../../components/accordion/accordion';
import Switch from '../../components/settings/details/TableSwitcher';
import FileUploader from '../../components/FileDowlander';
import axios from 'axios';
import { help_url } from '../../helpers/api';

interface AllProp {
    title: string;
    showSwitch: boolean;
    status: string;
    data: { text: string; active: boolean }[];
}

const All: React.FC = () => {
    const [isSwitchOn, setIsSwitchOn] = useState(false);
    const [accordionItems, setAccordionItems] = useState<AllProp[]>([]);

    useEffect(() => {
        // Initialize accordion items
        setAccordionItems([
            {
                title: 'О сервисе',
                showSwitch: true,
                status: 'ABOUT_SERVICE',
                data: []
            },
            {
                title: 'Политика конфиденциальности',
                showSwitch: true,                                           
                status: 'PRIVACY_POLICY',
                data: []
            },
            {
                title: 'Лицензионное соглашение',
                showSwitch: true,
                status: 'ABOUT_SERVICE',
                data: []
            }
        ]);
    }, []);

    const fetchData = async (status: string, index: number) => {
        try {
            const res = await axios.get(`${help_url}?HELP_STATUS=${status}`);
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

    const handleToggle = (index: number, dataIndex: number) => {
        setAccordionItems(prevState => {
            const updatedItems = [...prevState];
            updatedItems[index].data[dataIndex].active = !updatedItems[index].data[dataIndex].active;
            return updatedItems;
        });
    };

    const toggleSwitch = () => {
        setIsSwitchOn(!isSwitchOn);
    };

    return (
        <div className='p-2'>
            <div className='flex flex-col gap-3 mb-3 text-slate-700 dark:text-slate-300'>
                {accordionItems.map((item, index) => (
                    <Accordion onClick={() => fetchData(item.status, index)} key={index} title={item.title}>
                        {item.data.length !== 0 && item.data.map((dataItem, dataIndex) => (
                            <div key={dataIndex} className='border-[1px] p-5 rounded-2xl dark:border-white bg-white dark:bg-black text-slate-700 dark:text-slate-300'>
                                <p>{dataItem.text}</p>
                            </div>
                        ))}
                        {item.showSwitch && (
                            <div className='mt-3 flex gap-3 items-center text-slate-700 dark:text-slate-300'>
                                <p>Отображать в приложениях</p>
                                <Switch isOn={item.data.some(dataItem => dataItem.active)} handleToggle={() => handleToggle(index, 0)} />
                            </div>
                        )}
                    </Accordion>
                ))}
                <Accordion title='Лицензии'>
                    <p className='mb-2 text-slate-700 dark:text-slate-300'>Вложения</p>
                    <div className="flex flex-row flex-wrap bg-gray-100">
                        <div className='mt-3 flex gap-3 items-center mb-2text-slate-700 dark:text-slate-300'>
                            <p>Отображать в приложениях</p>
                            <Switch isOn={isSwitchOn} handleToggle={toggleSwitch} />
                        </div>
                    </div>
                    <Link to='/'>
                        <button
                            className={`bg-[#0e0608] text-white px-3 py-2 rounded-lg ${!isSwitchOn ? 'opacity-50 cursor-not-allowed' : ''}`}
                            disabled={!isSwitchOn}
                        >
                            Сохранить изменения
                        </button>
                    </Link>
                    <FileUploader />
                </Accordion>
            </div>
        </div>
    );
};

export default All;
