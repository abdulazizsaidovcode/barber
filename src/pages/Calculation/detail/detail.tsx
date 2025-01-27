import React, { useEffect } from "react";

import MainTabs from "./main";
import orderStore from "../../../helpers/state_managment/order/orderStore";
import FirstDetail from "./secondTab";
import SecondDetail from "./third.tab";
import { useLocation } from "react-router-dom";
import { getDetail } from "../../../helpers/api-function/order/orderFunction";

const OrderDetail: React.FC = () => {
  const { isDetail, setOrderDetail } = orderStore();
  const location = useLocation();

  const id = location.pathname.substring(8);

  useEffect(() => {
    getDetail(id, setOrderDetail)
  }, [id])

  return (
    <div>
      <>
        <div className="shadow-3 dark:bg-[#ffffffdf] dark:text-black border-black rounded-xl border-solid border-1 p-3 flex items-center justify-between w-[100%] dark:bg-gray-800 dark:border-gray-700">
          <MainTabs />
          {localStorage.getItem("orderStatus") === "UPCOMING" ? (
            <div className="rounded-xl text-white bg-[#ffa723] p-1 px-4 flex items-center justify-center">
              Не начиналась
            </div>
          ) : localStorage.getItem("orderStatus") === "COMPLETED" ? (
            <div className="rounded-xl text-white bg-[#288f23] p-1 px-4 flex items-center justify-center">
              Завершён
            </div>
          ) : localStorage.getItem("orderStatus") === "REJECTED" ? (
            <div className="rounded-xl text-white bg-[#f13d3d] p-1 px-4 flex items-center justify-center">
              Отклонена
            </div>
          ) : (
            <div></div>
          )}
        </div>
        {isDetail ? <FirstDetail /> : <SecondDetail />}
      </>
    </div>
  );
};

export default OrderDetail;
