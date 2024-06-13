import React from 'react';
import { IMasterItems, IThead } from '../../types/master.ts';
import MasterLocation from './master-location.tsx';
import { useTranslation } from 'react-i18next';
import MasterTables from './master-tables.tsx';

const Translation: React.FC = () => {
    const { t } = useTranslation();


    const items: IMasterItems[] = [
        {
            key: '1',
            label: (
                <span className="dark:text-white text-black text-lg md:text-xl lg:text-2xl">
                    Masterlar ro'yxati
                </span>
            ),
            children: <MasterTables />,
        },
        {
            key: '2',
            label: (
                <span className="dark:text-white text-black text-lg md:text-xl lg:text-2xl">
                    Masterning joylashuvi
                </span>
            ),
            children: <MasterLocation />,
        },
    ];

    return (
        <div>
            {/* Render your components here, for example: */}
            <MasterTables thead={thead} />
            <MasterLocation />
        </div>
    );
};

export default Translation;
