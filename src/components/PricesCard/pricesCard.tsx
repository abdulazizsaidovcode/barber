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
        <div className="flex flex-row gap-2">
            <div className=' w-full bg-white dark:bg-black  text-slate-700 dark:text-slate-300 shadow-6 p-4 mb-3 rounded-lg'>
                <h1 className='font-bold text-xl  text-slate-700 dark:text-slate-300 mb-2'>Тарифы:</h1>
                <hr className='text-gray'/>
                {masterData && masterData.map((item, idx) => (
                    <div className='flex justify-between p-3' key={idx}>
                        <h1 className='font-bold mt-2'>{item.name}</h1>
                        <button className='bg-[#00BD35] text-white px-4 py-2 rounded-xl'>{item.btnName}</button>
                    </div>
                ))}
            </div>
            <div className='w-full  text-slate-700 dark:text-slate-300 bg-white dark:bg-black  shadow-6 p-5 mb-3 rounded-lg'></div>  
        </div>
              
    );
};
export default PricesCard