import React from "react";

interface IData {
    name: string;
    price: number | string;
}

interface MasterCardProps {
    masterName: string;
    specialistTitle: string;
    phoneNumber: string;
    imageUrl: string;
    masterData: IData[];
}

const MasterCard: React.FC<MasterCardProps> = ({ masterName, specialistTitle, phoneNumber, imageUrl, masterData }) => {
    return (
        <div className='w-full  max-h-screen mb-4 flex flex-wrap'>
            <div className='p-4 w-full bg-white dark:bg-black  rounded-lg shadow-md mb-4'>
                <h1 className='font-bold'>История подписки</h1>
            </div>
            <div className='bg-white dark:bg-black flex flex-wrap justify-between p-4 w-full  rounded-lg shadow-md mb-4'>
                <h1 className='font-bold text-xl text-slate-700 dark:text-slate-300'>Premium</h1>
                <button className='bg-[#58CA64] px-6 rounded-full text-white'>Активный</button>
            </div>
            <div className='w-full flex justify-between'>
                <div className='w-[35%]'>
                    <div className='w-full bg-white dark:bg-black shadow-lg p-3 rounded-lg mb-3  text-slate-700 dark:text-slate-300'>
                        <div className='flex justify-between mb-3'>
                            <h1 className='font-bold'>Мастер</h1>
                            <h1>{masterName}</h1>
                        </div>
                        <div className='flex justify-center mb-3'>
                            <img
                                src={imageUrl}
                                className='rounded-full'
                                alt='master'
                            />
                        </div>
                        <h1 className='text-center mb-2'>{specialistTitle}</h1>
                        <p className='text-center mb-3'>{phoneNumber}</p>
                    </div>
                    <div className='w-full  text-slate-700 dark:text-slate-300 bg-white dark:bg-black  shadow-lg p-3 rounded-lg mb-3'>
                        <div className='flex justify-between mb-3 '>
                            <h1>Остановить</h1>
                            <div className='bg-gray-300 p-1 rounded-full'>
                                <input type='range' />
                            </div>
                        </div>
                        <div className='flex justify-between'>
                            <h1 className='font-bold mt-2'>Остановить</h1>
                            <button className='bg-[#9C0A35] px-8 py-2 rounded-lg text-white'>Продлить</button>
                        </div>
                    </div>
                </div>

                <div className='w-[64%] bg-white dark:bg-black  text-slate-700 dark:text-slate-300 shadow-md p-5 mb-3'>
                    {masterData && masterData.map((item, idx) => (
                        <div className='flex justify-start items-center font-bold mt-8 p-2' key={idx}>
                            <h1 className='w-48'>{item.name}</h1>
                            <h1>{item.price}</h1>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default MasterCard;
