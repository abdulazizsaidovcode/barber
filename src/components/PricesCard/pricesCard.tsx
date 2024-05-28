import React from "react";

interface IData {
    name: string;
    btnName: number | string;
}
const masterData: IData[] = [
    {
        name : 'Цена',
        btnName: 'Активировать'
    },
    {
        name : 'Оплачено',
        btnName: 'Активировать'
    },
]

const PricesCard : React.FC = () => {
    return(
        <div className='flex w-full justify-between'>
            <div className='w-[35%] bg-white shadow-6 p-4 mb-3'>
                <h1 className='font-bold text-xl text-black mb-2'>Тарифы:</h1>
                <hr className='text-gray'/>

                {masterData && masterData.map((item, idx) => (
                    <div className='flex justify-between p-3' key={idx}>
                        <h1 className='font-bold mt-2'>{item.name}</h1>
                        <button className='bg-[#00BD35] text-white px-4 py-2 rounded-xl'>{item.btnName}</button>
                    </div>
                ))}
            </div>
            <div className='w-[64%] bg-white  shadow-6 p-5 mb-3'></div>
        </div>
    );
};
export default PricesCard