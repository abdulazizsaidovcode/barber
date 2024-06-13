import React from 'react';
import { Rate } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import userImg from '../../../images/user.png';
import { ListData } from '../../../types/review';
import { getFileId } from '../../../helpers/api';

interface ReviewsServiceCardProps {
    data: ListData;
    openModal: () => void
}

const ReviewsServiceCard: React.FC<ReviewsServiceCardProps> = ({ data, openModal }) => {
    const { count, client, text, date, master } = data;
    const clientFirstName = client?.firstName || '';
    const clientLastName = client?.lastName || '';
    const clientAttachmentId = client?.attachmentId || '';

    const masterFirstName = master?.firstName || '';
    const masterLastName = master?.lastName || '';
    const masterAttachmentId = master?.attachmentId || '';
    return (
        <div className="w-full bg-white p-4 flex items-start shadow-lg rounded-xl dark:bg-[#60606D] text-black dark:text-white mb-4">
            <div className='flex items-center flex-col'>
                <img className='w-20 h-20 rounded-full' src={clientAttachmentId || masterAttachmentId ? getFileId + clientAttachmentId || getFileId + masterAttachmentId : userImg} alt="MASTER IMAGE" />
                <div className="text-gray-500">{client ? 'Client' : 'Master'}</div>
            </div>
            <div className="flex-1 ms-4">
                <div className="flex justify-between items-center mb-2">
                    <div>
                        <div className="font-bold text-lg">{clientFirstName || masterFirstName} {clientLastName || masterLastName}</div>
                    </div>
                    <Rate disabled defaultValue={count} className="ml-4 float-end" />
                </div>
                <div className="text-gray-700 mb-4">{text}</div>
                <div className="flex justify-between items-center text-gray-500">
                    <div>
                        <span>{date}</span>
                    </div>
                    <div onClick={openModal} className='w-10 h-10 border-[1px] border-red-900 flex items-center justify-center rounded-full'>
                        <DeleteOutlined className="text-red-900 text-xl cursor-pointer" />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ReviewsServiceCard;
