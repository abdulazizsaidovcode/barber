import React from 'react';
import { Tabs } from 'antd';
import All from './all';
import MasterDocument from './masterDocument';
import ClientDocument from './clientTab';
import { useTranslation } from 'react-i18next';

const MainTabs: React.FC = () => {
  const { t } = useTranslation();

  const items = [
    {
      key: '1',
      label: (
        <span className="dark:text-white text-black text-lg md:text-xl lg:text-2xl">
          {t("General")}
        </span>
      ),
      children: <All />
    },
    {
      key: '2',
      label: (
        <span className="dark:text-white text-black text-lg md:text-xl lg:text-2xl">
          {t("Master")}
        </span>
      ),
      children: <MasterDocument />
    },
    {
      key: '3',
      label: (
        <span className="dark:text-white text-black text-lg md:text-xl lg:text-2xl">
          {t("siderbar_client")}
        </span>
      ),
      children: <ClientDocument />
    }
  ];

  return (
    <Tabs
      className="dark:bg-boxdark bg-white p-2 w-full" // Full kenglik va responsiv fon ranglari uchun w-full foydalaning
      defaultActiveKey="1"
      items={items}
    />
  );
};

export default MainTabs;
