import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import {
  base_url,
  getFileId,
  master_default_feedback,
  master_default_values,
} from '../../../helpers/api';
import { config } from '../../../helpers/token';
import Review from '../../../components/MasterCard/rewiev';
import { Image, Rate } from 'antd';
import { useTranslation } from 'react-i18next';
import empaty from '../../../images/empty.png';
import { MdDelete } from 'react-icons/md';
import DelModal from '../../../components/settings/modals/delModal';
import toast from 'react-hot-toast';
import { clearFunction } from '../../../common/clear-function/clear-function.tsx';

const DetailMaster: React.FC = () => {
  const location = useLocation();
  const [orderDetails, setOrderDetails] = useState<any>(null);
  const [masters, setmasters] = useState<[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [toggle, setToggle] = useState(false);

  const id = location.pathname.substring(8);

  useEffect(() => {
    setIsLoading(true);

    axios
      .get(`${master_default_values}${id}`, config)
      .then((response) => {
        const master = response.data.body;
        setOrderDetails(master);
        setmasters(master.feedback.object);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error('There was an error fetching the data!', error);
        setIsLoading(false);
        clearFunction()
      });
  }, [id, toggle]);

  const getFeedbek = (id: string, count: number) => {
    if (id && count) {
      axios
        .get(`${master_default_feedback}${id}`, config)
        .then((res) => {
          if (res.data.success) {
            setmasters(res.data.body);
          } else {
            setmasters([]);
            clearFunction()
          }
        })
        .catch(() => {
          setmasters([])
          clearFunction()
        });
    } else {
      setmasters([]);
    }
  };
  
  const { t } = useTranslation();

  const handleDelete = async (id: string) => {
    try {
      const { data } = await axios.delete(`${base_url}feedback/delete/${id}`);
      toast.success(data.message);
      setToggle(false);
    } catch (error) {
      console.log(error);
      clearFunction()
    }
  };

  return (
    <>
      <div>
        {isLoading ? (
          <p className="dark:text-white">{t('Loading_order_details')}</p>
        ) : orderDetails ? (
          <div>
            <Review
              isLoading={false}
              goodLev={orderDetails.overallRating}
              simpleLev={orderDetails.reviewCount}
              badLev={orderDetails.reviewCount}
              verBadLev={orderDetails.reviewCount}
              normLev={orderDetails.reviewCount}
              getFeedbek={getFeedbek}
            />
          </div>
        ) : (
          ''
        )}
      </div>
      {masters && masters.length ? (
         masters.map((item: any, i: any) => (
          <>
            <div
              key={i}
              className="mt-10 relative bg-gray-100 dark:bg-[#ffffffdf] text-black dark:text-black p-4 shadow-4 flex flex-row  py-10 border-black rounded-xl w-full lg:w-[100%]"
            >
              <div className="flex flex-col w-[20%] gap-3 justify-center items-center">
                <img
                  className="w-[100px] h-[100px] rounded-[50%]"
                  src={getFileId + item.clientPhoto}
                  alt=""
                />

                <p>{item.date}</p>
              </div>
              <div className="w-[80%]">
                <div className="flex items-center justify-between">
                  <p className="font-bold text-xl">{item.clientName}</p>
                  <Rate disabled defaultValue={item.count} />
                </div>
                <div className="flex items-center justify-center border border-gray mt-3 mb-4"></div>
                <div>
                  <p>{item.text}</p>
                </div>

                <div
                  onClick={() => setToggle(!toggle)}
                  className="w-10 h-10 border-2 cursor-pointer absolute rounded-full flex items-center justify-center border-danger bottom-5 right-5"
                >
                  <MdDelete size={25} color="#9c0936" />
                </div>
              </div>
            </div>
            <DelModal
              onDelete={() => handleDelete(item.id)}
              isOpen={toggle}
              onClose={() => setToggle(false)}
            />
          </>
        ))
      ) : (
        <div className="mt-10 bg-gray-100 items-center text-black  dark:text-black p-4 flex flex-col justify-between pl-10 py-10 border-black rounded-xl w-full lg:w-[100%]">
          <img width={120} height={120} src={empaty} alt="" />
          <p className="dark:text-white text-lg">Master reviews not found</p>
        </div>
      )}
    </>
  );
};

export default DetailMaster;
