import React, { useEffect } from "react";
import { Tabs } from "antd";
import FirstTab from "./firstTab";
import { useTranslation } from "react-i18next";
import { getOrder } from "../../helpers/api-function/order/orderFunction";
import orderStore from "../../helpers/state_managment/order/orderStore";

const onChange = (key: string) => {
  console.log(key);
};



const MainTabs: React.FC = () => {
  const { t } = useTranslation();

  const {setData, setTotalPage} = orderStore()

  useEffect(() => {
    getOrder({
      status: "Upcoming",
      setData: setData,
      setTotalPage: setTotalPage
    });
  }, [])
  const items = [
    {
      key: "1",
      label: (
        <span
          onClick={() => {
            getOrder({
              status: "Upcoming",
              setData: setData,
              setTotalPage: setTotalPage
            });
          }}
          className="dark:text-white text-black text-lg md:text-xl lg:text-2xl" // Responsive font sizes
        >
          {t("FirstTab_name")}
        </span>
      ),
      children: <FirstTab />,
    },
    {
      key: "2",
      label: (
        <span
          onClick={() => {
            getOrder({
              status: "Completed",
              setData: setData,
              setTotalPage: setTotalPage
            });
          }}
          className="dark:text-white text-black text-lg md:text-xl lg:text-2xl"
        >
          {t("SecondTab_name")}
        </span>
      ),
      children: <FirstTab />,
    },
    {
      key: "3",
      label: (
        <span
          onClick={() => {
            getOrder({
              status: "Rejected",
              setData: setData,
              setTotalPage: setTotalPage
            });
          }}
          className="dark:text-white text-black text-lg md:text-xl lg:text-2xl"
        >
          {t("ThirdTab_name")}
        </span>
      ),
      children: <FirstTab />,
    },
  ];
  return (
    <Tabs
      className="dark:bg-boxdark bg-white p-2 w-full"
      defaultActiveKey="1"
      items={items}
      onChange={onChange}
    />
  );
};

export default MainTabs;
