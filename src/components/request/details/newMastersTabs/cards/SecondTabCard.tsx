import React from 'react';
import { Image } from 'antd';
import { useTranslation } from 'react-i18next';

interface SecondTabCardProp {
    category: string;
    price: string;
    duration: string;
    description: string;
    image: string;
}




const SecondTabCard: React.FC<SecondTabCardProp> = ({ category, price, duration, description, image }) => {
    const { t } = useTranslation();
    console.log('IMAGE', image);
    
    return (
        <div className='bg-[#cccccc] dark:bg-[#60606d] px-4 flex w-full h-60 py-3'>
            <div className='w-[25%] mx-1 flex items-center'>
                <Image width={280} height={200} src={image} />
            </div>
            <div className='w-[70%] mx-1'>
                <div>
                    <p className='text-2xl dark:text-white'>{category}</p>
                </div>
                <div className='my-3'><hr /></div>
                <div className='flex    '>
                    <div className='flex flex-col gap-7'>
                        <p className='text-xl dark:text-white font-semibold'>{t("order_table_cost")}</p>
                        <p className='text-xl dark:text-white font-semibold'>{t("Duration")}</p>
                        <p className='text-xl dark:text-white font-semibold'>{t("Description")}</p>
                    </div>
                    <div className='flex flex-col ms-10 gap-7'>
                        <p className='text-xl dark:text-white'>{price}</p>
                        <p className='text-xl dark:text-white'>{duration}</p>
                        <p className='text-xl dark:text-white'>{description}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SecondTabCard;
