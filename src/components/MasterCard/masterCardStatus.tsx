import React from "react";

interface IData {
    masterName: string;
    specialistTitle: string;
    phoneNumber: string;
    imageUrl: string;
    price: number | string;
    status: string;
    spisalisc:string;
    btnColor?: string;
}

interface MasterCardStatusProps {
    data: IData;
}

const MasterCardStatus: React.FC<MasterCardStatusProps> = ({ data }) => {
    return (
        <div className='w-full bg-white'>
            <div className='w-full bg-white shadow-6 p-3 rounded-lg mb-3'>
                <div className='flex justify-between mb-3'>
                    <h1 className='font-bold'>{data.spisalisc}</h1>
                    <h1 className=''>{data.masterName}</h1>
                </div>
                <div className='flex justify-center mb-3'>
                    <img
                        src={data.imageUrl}
                        className='rounded-full'
                        alt='master'
                    />
                </div>
                <h1 className='text-center mb-2'>{data.specialistTitle}</h1>
                <p className='text-center mb-3'>{data.phoneNumber}</p>
            </div>
            <div className='w-full bg-white shadow-6 p-3 rounded-lg mb-3'>
                <div className='flex justify-between mb-3 '>
                    <h1>Остановить</h1>
                    <div className='bg-gray p-1 rounded-full'>
                        <input type='range' />
                    </div>
                </div>
                <div className='flex justify-between '>
                    <h1 className='font-black mt-2'>{data.status}</h1>
                    <button className='bg-[#9C0A35] px-8 py-2 rounded-lg text-white'>{data.btnColor}</button>
                </div>
            </div>
        </div>
    );
};

export default MasterCardStatus;
