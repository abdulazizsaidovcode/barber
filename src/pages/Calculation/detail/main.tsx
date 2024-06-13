import React from "react";
import { Tabs } from "antd";
import orderStore from "../../../helpers/state_managment/order/orderStore";
import { useTranslation } from "react-i18next";

const { TabPane } = Tabs;

const MainTabs: React.FC = () => {
  const {t} = useTranslation()
  const { setIsDetail, isComplated } = orderStore();

  return (
    <Tabs moreIcon={false} more={undefined} defaultActiveKey="1" >
      <TabPane
        tab={
          <span
            onClick={() => {
              setIsDetail(true);
            }}
            className="text-black text-lg md:text-xl lg:text-2xl"
          >
            Детали записи
          </span>
        }
        key="1"
      />
      {isComplated && (
        <TabPane
          tab={
            <span
              onClick={() => {
                setIsDetail(false);
              }}
              className="text-black text-lg md:text-xl lg:text-2xl"
            >
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
