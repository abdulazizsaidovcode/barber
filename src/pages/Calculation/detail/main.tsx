import React from "react";
import { Tabs } from "antd";
import orderStore from "../../../helpers/state_managment/order/orderStore";
import { useTranslation } from "react-i18next";

const { TabPane } = Tabs;

const MainTabs: React.FC = () => {
  const { t } = useTranslation();
  const { setIsDetail } = orderStore();

  const handleTabClick = (key: string) => {
    if (key === "1") {
      setIsDetail(true);
    } else if (key === "2") {
      setIsDetail(false);
    }
  };

  return (
    <Tabs
      moreIcon={false}
      defaultActiveKey="1"
      onChange={handleTabClick}
    >
      <TabPane
        tab={
          <span className="text-black text-lg md:text-xl lg:text-2xl">
            Детали записи
          </span>
        }
        key="1"
      />
      {localStorage.getItem("orderStatus") === "COMPLETED" && (
        <TabPane
          tab={
            <span className="text-black text-lg md:text-xl lg:text-2xl">
              {t("Отзывы")}
            </span>
          }
          key="2"
        />
      )}
    </Tabs>
  );
};

export default MainTabs;
