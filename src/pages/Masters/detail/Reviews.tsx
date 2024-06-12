import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import {
  getFileId,
  master_default_feedback,
  master_default_values,
} from "../../../helpers/api";
import { config } from "../../../helpers/token";
import Review from "../../../components/MasterCard/rewiev";

const DetailMaster: React.FC = () => {
  const location = useLocation();
  const [orderDetails, setOrderDetails] = useState<any>(null);
  const [masters, setmasters] = useState<[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const id = location.pathname.substring(8);

  useEffect(() => {
    setIsLoading(true);

    axios
      .get(`${master_default_values}${id}`, config)
      .then((response) => {
        const master = response.data.body;
        console.log(`Detail page with id: ${master}`);
        setOrderDetails(master);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("There was an error fetching the data!", error);
        setIsLoading(false);
      });
  }, [id]);

  const getFeedbek = (id: string, count: number) => {
    if (id && count) {
      axios
        .get(`${master_default_feedback}${id}?count=${count}`, config)
        .then((res) => {
          if (res.data.success) {
            setmasters(res.data.body);
            console.log(res.data.body);
          } else {
            setmasters([]);
          }
        })
        .catch(() => setmasters([]))
    }
    else {
      setmasters([])
    }
  };

  return (
    <>
      <div>
        {isLoading ? (
          <p className="dark:text-white">Loading order details...</p>
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
          <p className="dark:text-white">No order details found.</p>
        )}
      </div>
      { masters.length !== 0
        ? masters.map((item: any, i: any) => (
            <div key={i} className="mt-10 bg-gray-100 dark:bg-[#ffffffdf] text-black dark:text-black p-4 shadow-4 flex flex-row pl-10 py-10 border-black rounded-xl w-full lg:w-[100%]">
              <img className="w-[100px] h-[100px] rounded-2xl" src={getFileId + item.clientPhoto} alt="" />
              
              <p>
                {item.text}
              </p>
            </div>
          ))
        : 
        <div className="mt-10 bg-gray-100 dark:bg-[#ffffffdf] text-black  dark:text-black p-4 shadow-4 flex flex-col justify-between pl-10 py-10 border-black rounded-xl w-full lg:w-[100%]">
              <p>
                no data
              </p>
            </div>}
    </>
  );
};

export default DetailMaster;
