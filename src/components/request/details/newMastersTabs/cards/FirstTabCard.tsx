import React from 'react'
import img from '../../../../../images/Image.png'

const FirstTabCard: React.FC = () => {
    return (
        <div className='bg-[#cccccc] px-4 flex w-full h-60 py-3'>
            <div className='w-[22%] mx-1 flex items-center'>
                <img src={img} alt="" />
            </div>
            <div className='w-[70%] mx-1'>
                <div>
                    <p className='text-2xl'>Стрижка, укладка, милирование:</p>
                </div>
                <div className='my-3'><hr /></div>
                <div className='flex justify-between w-[100%]'>
                    <div className='flex flex-col gap-7'>
                        <p className='text-xl font-semibold'>Цена</p>
                        <p className='text-xl font-semibold'>Длительность</p>
                        <p className='text-xl font-semibold'>Instagram</p>
                    </div>
                    <div className='flex flex-col gap-7 ms-34'>
                        <p className='text-xl'>350 000 сум</p>
                        <p className='text-xl'>1 час 30 минут</p>
                        <p className='text-xl'>В услугу входит мытьё головы, массаж головы и Разнообразный и богатый опыт основанный .......</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default FirstTabCard