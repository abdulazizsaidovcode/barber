import React from 'react';
import { Skeleton, Rate } from 'antd';

interface Props {
  OrderEnterTime: string;
  OrderEndTime: string;
  Prepayment: any;
  MasterName: string;
  MasterImg: string;
  ClientName: string;
  ClientPhoto: string;
  ClientNumber: string;
  MasterNumber: any;
  isLoading: boolean;
  MasterStatus: any;
  Count: string;
  Description: string;
}

const DetailOrder: React.FC<Props> = ({
  Description,
  MasterNumber,
  MasterName,
  MasterImg,
  ClientName,
  ClientNumber,
  isLoading,
  ClientPhoto,
  MasterStatus,
  Count,
}) => {
  return (
    <div className="flex flex-col lg:flex-row gap-4 mt-4">
      <div className="flex flex-col h-full justify-between gap-4">
        <Skeleton loading={isLoading} active>
          <div className="flex flex-col dark:bg-[#ffffffdf] text-black dark:text-black border-black w-full lg:w-[300px] shadow-3 p-3 rounded-xl">
            <div className="flex items-center justify-between">
              <p className="font-bold">Master:</p>
              <p>{MasterName}</p>
            </div>
            <div className="flex items-center justify-center border-black p-1 rounded-full">
              <img
                src={MasterImg}
                alt="Master"
                className="w-40 border h-40 rounded-full"
              />
            </div>
            <div className="flex items-center mt-3 flex-col gap-1 justify-center">
              <p className="text-gray-600">{MasterStatus}</p>
              <p className="text-gray-600">{MasterNumber}</p>
            </div>
          </div>
        </Skeleton>
        <Skeleton loading={isLoading} active>
          <div className="flex flex-col dark:bg-[#ffffffdf] text-black dark:text-black border-black w-full lg:w-[300px] shadow-3 p-3 rounded-xl">
            <div className="flex items-center justify-between">
              <p className="font-bold">Client:</p>
              <p>{ClientName}</p>
            </div>
            <div className="flex items-center justify-center border-black p-1 rounded-full">
              <img
                src={ClientPhoto}
                alt="Master"
                className="w-40 border h-40 rounded-full"
              />
            </div>
            <div className="flex items-center mt-3 flex-col gap-1 justify-center">
              <p className="text-gray-600">{ClientNumber}</p>
            </div>
          </div>
        </Skeleton>
      </div>
      <Skeleton loading={isLoading} active>
        <div className="bg-gray-100 dark:bg-[#ffffffdf] text-black dark:text-black p-4 shadow-4 flex flex-col justify-between pl-10 py-5 border-black rounded-xl w-full lg:w-[100%]">
          <div className="flex items-center justify-between px-4 p-2 rounded-lg bg-[#f6d0db]">
            <p>Оценка (рейтинг)</p>
            <Rate disabled defaultValue={2} />
            <p>{Count}</p>
          </div>
          <div>
            <p>{Description}</p>
          </div>
        </div>
      </Skeleton>
    </div>
  );
};

export default DetailOrder;
