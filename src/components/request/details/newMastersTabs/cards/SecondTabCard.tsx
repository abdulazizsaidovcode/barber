import React from 'react';
import { Image } from 'antd';

interface SecondTabCardProp {
    category: string;
    price: string;
    duration: string;
    description: string;
    image: string;
}

const SecondTabCard: React.FC<SecondTabCardProp> = ({ category, price, duration, description, image }) => {
    return (
        <div className='bg-[#cccccc] dark:bg-white px-4 flex w-full h-60 py-3'>
            <div className='w-[22%] mx-1 flex items-center'>
                <Image width={280} height={200} src={image} />
            </div>
            <div className='w-[70%] mx-1'>
                <div>
                    <p className='text-2xl'>{category}</p>
                </div>
                <div className='my-3'><hr /></div>
                <div className='flex    '>
                    <div className='flex flex-col gap-7'>
                        <p className='text-xl font-semibold'>Цена</p>
                        <p className='text-xl font-semibold'>Длительность</p>
                        <p className='text-xl font-semibold'>Описание</p>
                    </div>
                    <div className='flex flex-col ms-10 gap-7'>
                        <p className='text-xl'>{price}</p>
                        <p className='text-xl'>{duration}</p>
                        <p className='text-xl'>{description}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SecondTabCard;
