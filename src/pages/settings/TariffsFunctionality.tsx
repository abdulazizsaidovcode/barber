import React, { useState } from 'react'
import DefaultLayout from '../../layout/DefaultLayout'
import Modal from '../../components/modals/modal';

const TariffsFunctionality: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false)

    const closeModal = () => setIsOpen(false)
    const openModal = () => setIsOpen(true)

    interface TariffsFunctionalityCardProp {
        title: string;
        functions: string;
        sum: string;
        link: string
    }
    const TariffsFunctionalityCard: React.FC<TariffsFunctionalityCardProp> = ({ title, link, functions, sum }) => {
        return (
            <div onClick={() => window.location.href = `${link}`} className='w-[160px] dark:bg-[#30303d] cursor-pointer gap-5 rounded-3xl shadow-3 flex flex-col justify-center items-center shadow-black bg-white h-[170px]'>
                <p className='font-bold text-black dark:text-white'>{title}</p>
                <p>{functions}</p>
                <p>{sum}</p>
            </div>
        )
    }
    return (
        <>
            <DefaultLayout>
                <div>
                    <div className='flex justify-between'>
                        <p className='text-xl dark:text-white'>Тарифы и функционал</p>
                        <button onClick={openModal} className='py-2 px-10 dark:text-white dark:bg-[#9C0A35] bg-[#eaeaea] rounded-2xl text-black'>Добавить Тариф</button>
                    </div>
                    <div className='flex flex-wrap gap-5 mt-5'>
                        <TariffsFunctionalityCard title='Free' functions='10 Функций' sum='0 сум' link='/tariff-detail' />
                        <TariffsFunctionalityCard title='Free' functions='10 Функций' sum='0 сум' link='/tariff-detail' />
                        <TariffsFunctionalityCard title='Free' functions='10 Функций' sum='0 сум' link='/tariff-detail' />
                    </div>
                </div>
            </DefaultLayout>
            <Modal isOpen={isOpen} onClose={closeModal}>
                <div className="w-[600px] h-[180px]">
                    <p className="text-xl text-black">Название тарифы:</p>
                    <input className="w-full border-[1px] border-black p-2 rounded-lg mt-3" type="text" placeholder="Оздоровительные процедуры" />
                    <div className="flex mt-15 justify-center">
                        <button className="py-2 px-10 bg-slate-800 text-white">Добавить</button>
                    </div>
                </div>
            </Modal>
        </>
    )
}

export default TariffsFunctionality;