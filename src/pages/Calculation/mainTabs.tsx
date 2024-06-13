import React, { useEffect } from "react";
import { Tabs } from "antd";
import FirstTab from "./firstTab";
import { useTranslation } from "react-i18next";
import { getChildCategory, getOrder } from "../../helpers/api-function/order/orderFunction";
import orderStore from "../../helpers/state_managment/order/orderStore";
import { getRegion } from "../../helpers/api-function/master/master";

const onChange = (key: string) => {
  
};



const MainTabs: React.FC = () => {
  const { t } = useTranslation();

  const {setData, setTotalPage, setStatus, setRegionData, setChildCategoy, setIsComplated, statusO} = orderStore()

  useEffect(() => {
    getOrder({
      status: "Upcoming",
      setData: setData,
      setTotalPage: setTotalPage
    });
    getRegion(setRegionData)
    getChildCategory(setChildCategoy)
  }, [])
  useEffect(() => {
    getOrder({
      status: "Upcoming",
      setData: setData,
      setTotalPage: setTotalPage
    });
    getRegion(setRegionData)
    getChildCategory(setChildCategoy)
  }, [statusO])
  const items = [
    {
      key: "1",
      label: (
        <span
          onClick={() => {
            getOrder({
              status: "UPCOMING",
              setData: setData,
              setTotalPage: setTotalPage
            });
            setStatus("UPCOMING")
            setIsComplated(false)
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
              status: "COMPLETED",
              setData: setData,
              setTotalPage: setTotalPage
            });
            setStatus("COMPLETED")
            setIsComplated(true)
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
              status: "REJECTED",
              setData: setData,
              setTotalPage: setTotalPage
            });
            setStatus("REJECTED")
            setIsComplated(false)
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
