import React from "react";

import { useTranslation } from "react-i18next";
import MainTabs from "./main";
import orderStore from "../../../helpers/state_managment/order/orderStore";
import FirstDetail from "./secondTab";
import SecondDetail from "./third.tab";

const NotFound: React.FC = () => {
  const { isDetail } = orderStore();
  const { t } = useTranslation();
  return (
    <div>
      <>
        <div className="shadow-3 dark:bg-[#ffffffdf] dark:text-black border-black rounded-xl border-solid border-1 p-3 flex items-center justify-between w-[100%] dark:bg-gray-800 dark:border-gray-700">
          <MainTabs />
          <div className="rounded-xl text-white bg-[#ffa723] p-1 px-4 flex items-center justify-center">
            {t("detail_payment_type")}
          </div>
        </div>
        {
          isDetail ? (
            <FirstDetail/>
          ) : (
            <SecondDetail/>
          )
        }
      </>
    </div>
  );
};

export default NotFound;
