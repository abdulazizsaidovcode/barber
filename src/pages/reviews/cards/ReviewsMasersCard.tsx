import React from 'react';
import { Rate, Button } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import userImg from '../../../images/user.png'
import { ListMasterData } from '../../../types/review';
import { getFileId } from '../../../helpers/api';


const ReviewsMasersCard: React.FC<{ data: ListMasterData, openModal: () => void }> = ({ data, openModal }) => {
    const { clientFirstName, clientLastName, masterFirstName, masterLastName, description, masterFeedbackCount, feedbackCount, feedbackDate, clientAttachmentId, masterAttachmentId } = data;
    return (
        <div className="w-full p-4 reviews-shadow mt-3 rounded-xl dark:bg-[#60606D] text-black dark:text-white mb-4">
            <div className="flex md:flex-row flex-col md:gap-0 gap-3 justify-between items-start mb-4">
                <div className='flex'>
                    <img src={masterAttachmentId ? getFileId + masterAttachmentId : userImg} className='md:w-20 w-10 h-10 md:h-20' alt="" />
                    <div className="flex-1 ms-3">
                        <div className="font-bold text-lg">{clientFirstName} {clientLastName}</div>
                        <div className="text-gray-500">Мастер</div>
                        <Rate disabled defaultValue={masterFeedbackCount} className="text-sm" />
                    </div>
                </div>
                <div className='flex '>
                    <img src={clientAttachmentId ? getFileId + clientAttachmentId : userImg} className='md:w-20 w-10 h-10 md:h-20' alt="" />
                    <div className="flex-1 ms-3">
                        <div className="font-bold text-lg">{masterFirstName} {masterLastName}</div>
                        <div className="text-gray-500">Клиент</div>
                    </div>
                </div>
                <div className="flex flex-col text-gray-700">
                    {/* <div className="flex items-center">
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
                    </div> */}
                    <div className="flex items-center">
                        <Rate disabled defaultValue={feedbackCount} className="text-sm mr-2" />
                        {/* Что то еще ... */}
                    </div>
                </div>
                <div className="text-gray-500 flex flex-col items-center">
                    <div onClick={openModal} className='w-10 h-10 border-[1px] border-red-500 flex items-center justify-center rounded-full'>
                        <DeleteOutlined className="text-red-500 text-xl cursor-pointer" />
                    </div>
                    <p>{feedbackDate}</p>
                </div>
            </div>
            <div className="flex md:flex-row flex-col justify-between">
                <div className="text-gray-700 mb-2">
                    {description}
                </div>
                <Button type="link" className="text-blue-500">
                    Показать полностью
                </Button>
            </div>
        </div>
    );
}

export default ReviewsMasersCard;
