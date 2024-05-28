import React, { useState } from 'react';
import Switch from './TableSwitcher'

interface StoragePath {
    component: string;
    mount: string;
    name: string;
    isActive: boolean;
}

const storagePaths: StoragePath[] = [
    { component: 'AAM', mount: 'Render panel', name: 'Render panel uchun vaqtinchalik qattiq disk', isActive: false },
];

const DetailsFirstTab: React.FC = () => {
    const [isSwitchOn, setIsSwitchOn] = useState(false);

    const toggleSwitch = () => {
        setIsSwitchOn(!isSwitchOn);
    };
    return (
        <table className='w-full'>
            <thead>
                <tr className='bg-[#d0eeff] h-10'>
                    <th className='text-start px-4'>Категория функционала</th>
                    <th className='text-start px-4'>Функционал</th>
                    <th className='text-start px-4'>Описание</th>
                    <th className='text-start px-4'>Статус</th>
                </tr>
            </thead>
            <tbody>
                {storagePaths.map((path, index) => (
                    <tr key={index}>
                        <td className='px-4'>{path.component}</td>
                        <td className='px-4'>{path.mount}</td>
                        <td className='px-4'>{path.name}</td>
                        <td className='px-4'>
                            <Switch isOn={isSwitchOn} handleToggle={toggleSwitch} />
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default DetailsFirstTab;
