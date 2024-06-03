import React from 'react'
import opacha from '../../../../images/Group 940396.png'
import { GoDotFill } from "react-icons/go";

const FirstTab: React.FC = () => {
    return (
        <div className='flex justify-between'>
            <div className='w-1/4 mx-1'>
                <div className='bg-[#cccccc] w-full h-[27%]'>
                    <div className='flex justify-end p-3 items-center'>
                        <GoDotFill className='text-[#24FF00]' />
                        <p className='ml-2'>В сети</p>
                    </div>
                    <div className='flex justify-center'>
                        <img className='w-45 h-45' src={opacha} alt="Profile" />
                    </div>
                </div>
                <div className='bg-[#cccccc] w-full h-[71.8%] mt-3 p-4 py-5'>
                    <div>
                        <p className='text-2xl'>Контакты:</p>
                    </div>
                    <div className='my-3'><hr /></div>
                    <div className='flex justify-between w-full'>

                        <div className='flex flex-col gap-10'>
                            <p className='text-xl font-semibold'>Телефон</p>
                            <p className='text-xl font-semibold'>Telegram</p>
                            <p className='text-xl font-semibold'>Instagram</p>
                            <p className='text-xl font-semibold'>Facebook</p>
                        </div>
                        <div className='flex flex-col gap-10'>
                            <p className='text-xl'>+99893 171 63 80</p>
                            <p className='text-xl'>@someusername</p>
                            <p className='text-xl'>someusername</p>
                            <p className='text-xl'>someusername</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className='w-3/4 h-auto mx-1'>
                <div className='bg-[#cccccc] p-4 py-5 w-full'>
                    <div>
                        <p className='text-2xl'>Профиль:</p>
                    </div>
                    <div className='my-3'><hr /></div>
                    <div className='flex justify-between w-[60%]'>
                        <div className='flex flex-col gap-10'>
                            <p className='text-xl font-semibold'>Имя</p>
                            <p className='text-xl font-semibold'>Фамилия</p>
                            <p className='text-xl font-semibold'>Никнейм</p>
                            <p className='text-xl font-semibold'>Пол</p>
                            <p className='text-xl font-semibold'>Возраст</p>
                            <p className='text-xl font-semibold'>Регион</p>
                            <p className='text-xl font-semibold'>Город</p>
                            <p className='text-xl font-semibold'>Адрес</p>
                        </div>
                        <div className='flex flex-col gap-10'>
                            <p className='text-xl'>Малика</p>
                            <p className='text-xl'>Махмудова</p>
                            <p className='text-xl'>@somenickname</p>
                            <p className='text-xl'>Женский</p>
                            <p className='text-xl'>25-30 лет</p>
                            <p className='text-xl'>Ташкентская область</p>
                            <p className='text-xl'>г. Ташкент</p>
                            <p className='text-xl'>ул. Алишера Навои, дом 62, кв 45</p>
                        </div>
                    </div>
                </div>
                <div className='bg-[#cccccc] p-4 py-5 w-full mt-3'>
                    <div>
                        <p className='text-2xl'>Информация о профессии:</p>
                    </div>
                    <div className='my-3'><hr /></div>
                    <div className='flex justify-between w-[60%]'>
                        <div className='flex flex-col gap-10'>
                            <p className='text-xl font-semibold'>Место работы</p>
                            <p className='text-xl font-semibold'>Напраление по полу</p>
                            <p className='text-xl font-semibold'>Категория услуг</p>
                            <p className='text-xl font-semibold'>Специализация</p>
                            <p className='text-xl font-semibold'>Тип расписания</p>
                        </div>
                        <div className='flex flex-col gap-10'>
                            <p className='text-xl'>Beauty wave / на дому / с выездом</p>
                            <p className='text-xl'>Женское / Мужское</p>
                            <p className='text-xl'>Красота и здоровье волос</p>
                            <p className='text-xl'>Парикмахер, стилист, Барбер</p>
                            <p className='text-xl'>По графику</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default FirstTab
