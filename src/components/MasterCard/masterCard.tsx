import React from "react";

interface IData {
    name: string;
    price: number | string;
}
const masterData: IData[] = [
    {
        name : 'Цена',
        price: 10000
    },
    {
        name : 'Оплачено',
        price: 6000000
    },
    {
        name : 'Дата оплаты',
        price: '25.02 .2024'
    },
    {
        name : 'Срок подписки',
        price: '3 месяца'
    },
    {
        name: 'Способ оплаты',
        price: 'Карта'
    }
]

const MasterCard: React.FC = () => {
    return (
        <div className='w-full max-h-screen mb-4 flex flex-wrap'>
            <div className='p-4 w-full bg-white rounded-lg shadow-6 mb-4'>
                <h1 className='font-bold'>История подписки</h1>
            </div>
            <div className='flex flex-wrap justify-between p-4 w-full bg-white rounded-lg shadow-6 mb-4'>
                <h1 className='font-bold text-xl'>Premium</h1>
                <button className='bg-[#58CA64] px-6  rounded-full text-white'>Активный</button>
            </div>
            <div className='w-full flex justify-between'>
                <div className='w-[35%]'>
                    <div className='w-full bg-white shadow-6 p-3 rounded-lg mb-3'>
                        <div className='flex justify-between mb-3'>
                            <h1 className='font-bold'>Мастер</h1>
                            <h1>Малика Махмудова</h1>
                        </div>
                        <div className='flex justify-center mb-3'>
                            <img
                                src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR-VkIPYYQdu9f9V-v466dFYjCnKA49Uuc3YFni6s1Azg&s'
                                className='rounded-full'/>
                        </div>
                        <h1 className='text-center mb-2'>Специалист по наращиванию ресниц</h1>
                        <p className='text-center mb-3'>+99893 171 63 80</p>
                    </div>
                    <div className='w-full bg-white shadow-6 p-3 rounded-lg mb-3'>
                        <div className='flex justify-between mb-3 '>
                            <h1>Остановить</h1>
                            <div className='bg-gray p-1 rounded-full'>
                                <input type='range'/>
                            </div>
                        </div>
                        <div className='flex justify-between '>
                            <h1 className='font-bold mt-2'>Остановить</h1>
                            <button className='bg-[#9C0A35] px-8 py-2 rounded-lg text-white'>Продлить</button>
                        </div>
                    </div>
                </div>


                <div className='w-[64%] bg-white  shadow-6 p-5 mb-3'>
                    {masterData && masterData.map((item, idx) => (
                        <div className='flex justify-start items-center font-bold mt-8 p-2' key={idx}>
                            <h1 className={`w-48`}>{item.name}</h1>
                            <h1>{item.price}</h1>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
export default MasterCard;
