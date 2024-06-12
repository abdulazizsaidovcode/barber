import React from "react";
import { Tabs } from "antd";
import { useTranslation } from "react-i18next";
import orderStore from "../../../helpers/state_managment/order/orderStore";

const { TabPane } = Tabs;

const MainTabs: React.FC = () => {
  const { t } = useTranslation();
  const { setIsDetail, isComplated } = orderStore();

  const onChange = (key: string) => {
    console.log(key);
  };

  return (
    <Tabs defaultActiveKey="1" onChange={onChange}>
      <TabPane
        tab={
          <span
            onClick={() => {
              setIsDetail(true);
            }}
            className="text-black text-lg md:text-xl lg:text-2xl"
          >
            {t("FirstTab_name")}
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
              {t("SecondTab_name")}
            </span>
          }
          key="2"
        />
      )}
    </Tabs>
  );
};

export default MainTabs;
