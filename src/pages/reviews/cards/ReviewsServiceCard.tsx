import React from 'react';
import { Rate } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import userImg from '../../../images/user.png'

interface ReviewsCardProp {
    starCount: number;
    firstName: string;
    lastName: string;
    image?: string;
    description: string;
    createDate: string;
    whoIs: string;
    openDelModal: () => void;
}

const ReviewsServiceCard: React.FC<ReviewsCardProp> = ({ starCount, firstName, lastName, image, description, createDate, whoIs, openDelModal }) => {
    return (
        <div className="w-full bg-white p-4 flex items-start shadow-lg">
            <div>
                <img className='w-20 h-20' src={image ? image : userImg} alt="MASTER IMAGE" />
            </div>
            <div className="flex-1 ms-4">
                <div className="flex justify-between items-center mb-2">
                    <div>
                        <div className="font-bold text-lg">{firstName} {lastName}</div>
                        <div className="text-gray-500">{whoIs}</div>
                    </div>
                    <Rate disabled defaultValue={starCount} className="ml-4 float-end" />
                </div>
                <div className="text-gray-700 mb-4">{description}</div>
                <div className="flex justify-between items-center text-gray-500">
                    <div>
                        <span>{createDate}</span>
                    </div>
                    <div onClick={openDelModal} className='w-10 h-10 border-[1px] border-red-500 flex items-center justify-center rounded-full'>
                        <DeleteOutlined className="text-red-500 text-xl cursor-pointer" />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ReviewsServiceCard;
