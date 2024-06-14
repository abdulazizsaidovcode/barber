import React, { useEffect } from "react";
import { Tabs } from "antd";
import FirstTab from "./firstTab";
import { useTranslation } from "react-i18next";
import { getChildCategory, getOrder } from "../../helpers/api-function/order/orderFunction";
import orderStore from "../../helpers/state_managment/order/orderStore";
import { getRegion } from "../../helpers/api-function/master/master";

const MainTabs: React.FC = () => {
  const { t } = useTranslation();

  const { setData, setTotalPage, setStatus, setRegionData, setChildCategoy, statusO } = orderStore();

  useEffect(() => {
    localStorage.setItem("orderStatus", "UPCOMING")
    getOrder({
      status: "UPCOMING",
      setData: setData,
      setTotalPage: setTotalPage,
    });
    getRegion(setRegionData);
    getChildCategory(setChildCategoy);
  }, []);

  useEffect(() => {
    getOrder({
      status: statusO,
      setData: setData,
      setTotalPage: setTotalPage,
    });
    getRegion(setRegionData);
    getChildCategory(setChildCategoy);
  }, [statusO]);

  const handleTabChange = (key: string) => {
    switch (key) {
      case "1":
        setStatus("UPCOMING");
        localStorage.setItem("orderStatus", "UPCOMING")
        break;
      case "2":
        setStatus("COMPLETED");
        localStorage.setItem("orderStatus", "COMPLETED")
        break;
      case "3":
        setStatus("REJECTED");
        localStorage.setItem("orderStatus", "REJECTED")
        break;
      default:
        break;
    }
  };

  const items = [
    {
      key: "1",
      label: (
        <span
          onClick={() => handleTabChange("1")}
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
          onClick={() => handleTabChange("2")}
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
          onClick={() => handleTabChange("3")}
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
      onChange={handleTabChange} // Tab change handler
    />
  );
};

export default MainTabs;
