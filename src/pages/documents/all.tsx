import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Accordion from '../../components/accordion/accordion';
import Switch from '../../components/settings/details/TableSwitcher';

const All: React.FC = () => {
    const [isSwitchOn, setIsSwitchOn] = useState(false);

    const toggleSwitch = () => {
        setIsSwitchOn(!isSwitchOn);
    };

    // Define accordion items
    const accordionItems = [
        {
            title: 'О сервисе',
            content: 'Your content for О сервисе',
            showSwitch: false
        },
        {
            title: 'Политика конфиденциальности',
            content: 'Your content for Политика конфиденциальности',
            showSwitch: true
        },
        {
            title: 'Лицензионное соглашение',
            content: 'Your content for Лицензионное соглашение',
            showSwitch: true
        },
    ];

    return (
        <div className='p-2'>
            <div className='flex flex-col gap-3 mb-3   text-slate-700 dark:text-slate-300'>
                {accordionItems.map((item, index) => (
                    <Accordion key={index} title={item.title}>
                        <div className='border-[1px]  p-5 rounded-2xl dark:border-white bg-white dark:bg-black  text-slate-700 dark:text-slate-300'>
                            <p>{item.content}</p>
                        </div>
                        {item.showSwitch && (
                            <div className='mt-3 flex gap-3 items-center text-slate-700 dark:text-slate-300'>
                                <p>Отображать в приложениях</p>
                                <Switch isOn={isSwitchOn} handleToggle={toggleSwitch} />
                            </div>
                        )}
                    </Accordion>
                ))}
                <Accordion title='Лицензии'>
                    <p className='mb-2  text-slate-700 dark:text-slate-300'>Вложения</p>
                    <div className="flex flex-row flex-wrap bg-gray-100">
                        <div className='mt-3 flex gap-3 items-center mb-2text-slate-700 dark:text-slate-300'>
                            <p>Отображать в приложениях</p>
                            <Switch isOn={isSwitchOn} handleToggle={toggleSwitch} />
                        </div> 
                    </div>
                    <Link to="/regulations">
                        <button
                            className={`bg-[#9C0A35] text-white px-3 py-2 rounded-lg ${!isSwitchOn ? 'opacity-50 cursor-not-allowed' : ''}`}
                            disabled={!isSwitchOn}
                        >
                            Сохранить изменения
                        </button>
                    </Link>
                </Accordion>
            </div>
        </div>
    );
};

export default All;