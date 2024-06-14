import React, { useEffect, useState } from 'react';
import { Skeleton, Rate, message } from 'antd';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import { get_orders_otis } from '../../helpers/api';
import { config } from '../../helpers/token';

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
  MasterStatus: any;
}

interface RatingData {
  rating: number;
  count: number;
  text: string;
}

const DetailOrder: React.FC<Props> = ({
  MasterNumber,
  MasterName,
  MasterImg,
  ClientName,
  ClientNumber,
  ClientPhoto,
  MasterStatus,
}) => {
  const [ratingData, setRatingData] = useState<RatingData[] | null>(null);
  const [loading, setLoading] = useState(true);

  const location = useLocation();
  const id = location.pathname.substring(8);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`${get_orders_otis}${id}`, config);
        setRatingData(response.data);
      } catch (error) {
        setRatingData(null)
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  return (
    <div className="flex flex-col lg:flex-row gap-4 mt-4">
      <div className="flex flex-col h-full justify-between gap-4">
        <Skeleton loading={loading} active>
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
        <Skeleton loading={loading} active>
          <div className="flex flex-col dark:bg-[#ffffffdf] text-black dark:text-black border-black w-full lg:w-[300px] shadow-3 p-3 rounded-xl">
            <div className="flex items-center justify-between">
              <p className="font-bold">Client:</p>
              <p>{ClientName}</p>
            </div>
            <div className="flex items-center justify-center border-black p-1 rounded-full">
              <img
                src={ClientPhoto}
                alt="Client"
                className="w-40 border h-40 rounded-full"
              />
            </div>
            <div className="flex items-center mt-3 flex-col gap-1 justify-center">
              <p className="text-gray-600">{ClientNumber}</p>
            </div>
          </div>
        </Skeleton>
      </div>
      <Skeleton loading={loading} active>
        <div className="bg-gray-100 dark:bg-[#ffffffdf] text-black dark:text-black p-4 shadow-4 flex flex-col justify-between pl-10 py-5 border-black rounded-xl w-full lg:w-[100%]">
          {ratingData && ratingData.length !== 0 ? ratingData.map((item, index) => (
            <div key={index}>
              <div className="flex items-center justify-between px-4 p-2 rounded-lg bg-[#f6d0db]">
                <p>Оценка (рейтинг)</p>
                <Rate disabled value={item.rating} />
                <p>{item.count}</p>
              </div>
              <div>
                <p>{item.text}</p>
              </div>
            </div>
          )) : 
          <div>
              <div className="flex items-center justify-between px-4 p-2 rounded-lg bg-[#f6d0db]">
                <p>Отзывы not found</p>
              </div>
            </div>}
        </div>
      </Skeleton>
    </div>
  );
};

export default DetailOrder;
