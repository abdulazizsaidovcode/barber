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
        <div className="w-full max-h-screen mb-4 flex flex-col gap-4">
            <div className="p-4 w-full bg-white dark:bg-black rounded-lg shadow-md">
                <h1 className="font-bold">История подписки</h1>
            </div>
            <div className="bg-white dark:bg-black flex justify-between items-center p-4 w-full rounded-lg shadow-md">
                <h1 className="font-bold text-xl text-slate-700 dark:text-slate-300">Premium</h1>
                <button className="bg-[#58CA64] px-6 py-2 rounded-full text-white">Активный</button>
            </div>
            <div className="w-full flex flex-col lg:flex-row gap-4">
                <div className="w-full lg:w-1/3 flex flex-col gap-4">
                    <div className="w-full bg-white dark:bg-black shadow-lg p-3 rounded-lg text-slate-700 dark:text-slate-300">
                        <div className="flex justify-between mb-3">
                            <h1 className="font-bold">Мастер</h1>
                            <h1>{masterName}</h1>
                        </div>
                        <div className="flex justify-center mb-3">
                            <img
                                src={imageUrl}
                                className="rounded-full w-24 h-24 object-cover"
                                alt="master"
                            />
                        </div>
                        <h1 className="text-center mb-2">{specialistTitle}</h1>
                        <p className="text-center mb-3">{phoneNumber}</p>
                    </div>
                    <div className="w-full text-slate-700 dark:text-slate-300 bg-white dark:bg-black shadow-lg p-3 rounded-lg">
                        <div className="flex justify-between mb-3">
                            <h1>Остановить</h1>
                            <div className="bg-gray-300 p-1 rounded-full">
                                <input type="range" />
                            </div>
                        </div>
                        <div className="flex justify-between">
                            <h1 className="font-bold mt-2">Остановить</h1>
                            <button className="bg-[#9C0A35] px-8 py-2 rounded-lg text-white">Продлить</button>
                        </div>
                    </div>
                </div>
                <div className="w-full lg:w-2/3 bg-white dark:bg-black text-slate-700 dark:text-slate-300 shadow-md p-5 rounded-lg">
                    {masterData && masterData.map((item, idx) => (
                        <div className="flex justify-between items-center font-bold mt-4 p-2 border-b border-gray-200 dark:border-gray-700" key={idx}>
                            <h1 className="w-1/2">{item.name}</h1>
                            <h1>{item.price}</h1>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default MasterCard;
