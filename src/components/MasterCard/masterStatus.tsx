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

const MasterStatus: React.FC = () => {
    return (
        <div className='w-full shadow-6 p-5 mb-3'>
            {masterData && masterData.map((item, idx) => (
                <div className='flex justify-start items-center font-bold mt-8 p-2' key={idx}>
                    <h1 className={`w-48`}>{item.name}</h1>
                    <h1>{item.price}</h1>
                </div>
            ))}
        </div>
    )
}
export default MasterStatus