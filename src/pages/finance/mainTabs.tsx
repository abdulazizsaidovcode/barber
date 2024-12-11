import React from 'react';
import { Tabs } from 'antd';
import FirstTab from './firstTab';
import { useTranslation } from 'react-i18next';

const MainTabs: React.FC = () => {
  const { t } = useTranslation();
  const items = [
    {
      key: '1',
      label: (
        <span className="dark:text-white text-black text-lg md:text-xl lg:text-2xl">
          {t("By_region")}
        </span>
      ),
      children: <FirstTab />,
    },
    // {
    //   key: '2',
    //   label: (
    //     <span className="dark:text-white text-black text-lg md:text-xl lg:text-2xl">
    //       {t("By_city")}
    //     </span>
    //   ),
    //   children: <SecondTab />,
    // },
  ];

  return (
    <Tabs
      className="dark:bg-boxdark bg-white p-2 w-full"
      defaultActiveKey="1"
      items={items}
    />
  );
};

export default MainTabs;
