import React from 'react';
import { Tabs } from 'antd';
import All from './all.tsx';
import MasterDocument from './masterDocument.tsx';
import ClientDocument from './clientTab.tsx';
import { useTranslation } from 'react-i18next';
import helpStore from '../../helpers/state_managment/help/helpStore.tsx';
import WebTab from './WebTab.tsx';

const MainTabs: React.FC = () => {
  const { setHelpRole } = helpStore();
  const { t } = useTranslation();

  const items = [
    {
      key: 'all',
      label: (
        <span className="dark:text-white text-black text-lg md:text-xl lg:text-2xl">
          {t('General')}
        </span>
      ),
      children: <All />
    },
    {
      key: 'master',
      label: (
        <span className="dark:text-white text-black text-lg md:text-xl lg:text-2xl">
          {t('master')}
        </span>
      ),
      children: <MasterDocument />
    },
    {
      key: 'client',
      label: (
        <span className="dark:text-white text-black text-lg md:text-xl lg:text-2xl">
          {t('siderbar_client')}
        </span>
      ),
      children: <ClientDocument />
    },
    {
      key: 'web',
      label: (
        <span className="dark:text-white text-black text-lg md:text-xl lg:text-2xl">
          {t('WEB')}
        </span>
      ),
      children: <WebTab />
    }
  ];

  return (
    <Tabs
      className="dark:bg-boxdark bg-white p-2 w-full"
      defaultActiveKey="1"
      items={items}
      onChange={e => setHelpRole(e)}
    />
  );
};

export default MainTabs;
