import React from 'react';
import { Avatar, Rate, Button } from 'antd';
import { UserOutlined, DeleteOutlined } from '@ant-design/icons';
import userImg from '../../../images/user.png'

interface ReviewsMasersCardProp {

}

const ReviewsMasersCard: React.FC = () => {
    return (
        <div className="w-full p-4 reviews-shadow mt-3 rounded-xl dark:bg-[#60606D] text-black dark:text-white mb-4">
            <div className="flex justify-between items-start mb-4">
                <div className='flex'>
                    <img src={userImg} className='w-20 h-20' alt="" />
                    <div className="flex-1 ms-3">
                        <div className="font-bold text-lg">Имя Фамилия</div>
                        <div className="text-gray-500">Клиент</div>
                        <Rate disabled defaultValue={3.4} className="text-sm" />
                    </div>
                </div>
                <div className='flex '>
                    <img src={userImg} className='w-20 h-20' alt="" />
                    <div className="flex-1 ms-3">
                        <div className="font-bold text-lg">Имя Фамилия</div>
                        <div className="text-gray-500">Мастер</div>
                        <Rate disabled defaultValue={5} className="text-sm" />
                    </div>
                </div>
                <div className="flex flex-col text-gray-700">
                    <div className="flex items-center">
                        <Rate disabled defaultValue={4} className="text-sm mr-2" />
                        Антураж заведения
                    </div>
                    <div className="flex items-center">
                        <Rate disabled defaultValue={4} className="text-sm mr-2" />
                        Профессионализм мастера
                    </div>
                    <div className="flex items-center">
                        <Rate disabled defaultValue={3} className="text-sm mr-2" />
                        Чистота заведения
                    </div>
                    <div className="flex items-center">
                        <Rate disabled defaultValue={2} className="text-sm mr-2" />
                        Отношение мастера
                    </div>
                    <div className="flex items-center">
                        <Rate disabled defaultValue={3} className="text-sm mr-2" />
                        Что то еще ...
                    </div>
                </div>
                <div className="text-gray-500 flex flex-col">
                    <div className='w-10 h-10 border-[1px] border-red-500 flex items-center justify-center rounded-full'>
                        <DeleteOutlined className="text-red-500 text-xl cursor-pointer" />
                    </div>
                    <p>25.02.2024</p>
                </div>
            </div>
            <div className="flex-1">
                <div className="text-gray-700 mb-2">
                    Отличное Впечатление, легко бронировать. Оплачивать процедуру так удобно — не нужны ни наличные, ни карты!
                    Оплачивать процедуру так удобно — не нужны ни наличные, ни карты! Оплачивать процедуру так удобно — не нужны ни наличные, ни карты!
                </div>
                <Button type="link" className="text-blue-500">
                    Показать полностью
                </Button>
            </div>
        </div>
    );
}

export default ReviewsMasersCard;
