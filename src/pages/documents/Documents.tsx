import React, { useState } from 'react';
import DefaultLayout from '../../layout/DefaultLayout';
import Accordion from '../../components/accordion/accordion';

import Switch from '../../components/settings/details/TableSwitcher';

const Documents: React.FC = () => {
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
        {
            title: 'Лицензии',
            content: 'Your content for Лицензии',
            showSwitch: false
        }
    ];

    return (
        <DefaultLayout>
            <div className='flex flex-col gap-3'>
                {accordionItems.map((item, index) => (
                    <Accordion key={index} title={item.title}>
                        <div className='border-[1px] border-black p-5 rounded-2xl dark:border-white'>
                            <p>{item.content}</p>
                        </div>
                        {item.showSwitch && (
                            <div className='mt-3 flex gap-3 items-center'>
                                <p>Отображать в приложениях</p>
                                <Switch isOn={isSwitchOn} handleToggle={toggleSwitch} />
                            </div>
                        )}
                    </Accordion>
                ))}
            </div>
        </DefaultLayout>
    );
};

export default Documents;
