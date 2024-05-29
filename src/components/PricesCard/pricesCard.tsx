import { Button, Checkbox, CheckboxProps, Input } from "antd";
import React, { useState } from "react";
import Modal from "../modals/modal";

interface IData {
    name: string;
    btnName: number | string;
}

const masterData: IData[] = [
    {
        name: 'Цена',
        btnName: 'Активировать'
    },
    {
        name: 'Оплачено',
        btnName: 'Активировать'
    },
];

const PricesCard: React.FC = () => {
    const [isCheckboxChecked, setIsCheckboxChecked] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [sliderValue, setSliderValue] = useState(0);

    const handleCheckboxChange: CheckboxProps["onChange"] = (e) => {
        setIsCheckboxChecked(e.target.checked);
    };

    const handleOpenModal = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSliderValue(Number(e.target.value));
    };

    return (
        <div className="flex flex-col md:flex-row gap-2">
            <div className='w-full md:w-[35%] bg-white dark:bg-black text-slate-700 dark:text-slate-300 shadow-6 p-4 mb-3 rounded-lg'>
                <h1 className='font-bold text-xl text-slate-700 dark:text-slate-300 mb-2'>Тарифы:</h1>
                <hr className='text-gray' />
                {masterData && masterData.map((item, idx) => (
                    <div className='flex justify-between p-3' key={idx}>
                        <h1 className='font-bold mt-2'>{item.name}</h1>
                        <button className='bg-[#00BD35] text-white px-4 py-2 rounded-xl'>{item.btnName}</button>
                    </div>
                ))}
            </div>
            <div className='w-full md:w-[64%] text-slate-700 dark:text-slate-300 bg-white dark:bg-black shadow-6 p-5 mb-3 rounded-lg'>
                <div className="flex flex-row justify-between mb-3">
                    <h1 className="font-bold">Остановка подписки:</h1>
                    <div className="text-end">
                        <Checkbox onChange={handleCheckboxChange}>Без возврата</Checkbox>
                    </div>
                </div>
                <hr />
                <p className="mb-2">Сумма возрата</p>
                <div className="flex flex-col md:flex-row justify-between mb-1 text-slate-700 dark:text-slate-300">
                    <Input placeholder="3 000 000" className="py-2 text-dark font-bold mr-48" disabled={isCheckboxChecked} />
                    <Checkbox disabled={isCheckboxChecked}>Карта</Checkbox>
                </div>
                <div className="flex flex-col md:flex-row justify-between mb-2 text-slate-700 dark:text-slate-300">
                    <Checkbox disabled={isCheckboxChecked}>Вся сумма подписки</Checkbox>
                    <Checkbox disabled={isCheckboxChecked}>Вся сумма подписки</Checkbox>
                </div>
                <p className="mb-1">Дата с которой остановить тариф</p>
                <div className="flex flex-col md:flex-row font-bold text-black justify-between mb-2">
                    <Input type="date" className="px-8 py-1 rounded-lg shadow-6 mb-2 mr-24" disabled={isCheckboxChecked} />
                    <button className="bg-[#A6A6A6] rounded-lg px-2 mb-2" disabled={isCheckboxChecked}>Отменить</button>
                    <button
                        className={`rounded-lg px-2 ${isCheckboxChecked ? "bg-red-600" : "bg-[#A6A6A6]"} mb-2`}
                        onClick={handleOpenModal}
                        disabled={!isCheckboxChecked}
                    >
                        Остановить
                    </button>
                </div>
            </div>
            <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
                <p>Вы уверены что хоите остановить подписку?</p>
                <div className="flex justify-end mt-4">
                    <button 
                        onClick={handleCloseModal} 
                        className="mr-2 bg-[#232323] px-2 py-1 text-white"
                        disabled={sliderValue < 100}
                    >
                        Остановить
                    </button>
                    <button 
                        onClick={handleCloseModal} 
                        className="bg-[#686868] px-4 py-1 text-white"
                    >
                        Нет
                    </button>
                </div>
            </Modal>
        </div>
    );
};

export default PricesCard;
