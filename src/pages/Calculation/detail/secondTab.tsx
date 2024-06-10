import React, { useState } from 'react';
import { Tabs, TabsProps } from 'antd';
import SecondTab from './secondTab';
import DefaultLayout from '../../../layout/DefaultLayout';
import Slice from './slice';

const { TabPane } = Tabs;

const TabsComponentForSecondDetail: React.FC = () => {
  const [activeKey, setActiveKey] = useState('1');

  const handleTabChange = (key: string) => {
    setActiveKey(key);
  };

  const items: TabsProps['items'] = [
    {
      key: '1',
      label: (
        <span className="dark:text-white text-black text-sm md:text-base lg:text-lg xl:text-xl">
          Основная информация
        </span>
      ),
      children: <Slice status='Не начиналась' />,
    },
    {
      key: '2',
      label: (
        <span className="dark:text-white text-black text-sm md:text-base lg:text-lg xl:text-xl">
          Процедуры
        </span>
      ),
      children: <Slice status="Завершён" />,
    },
  ];
  return (
    <DefaultLayout>
      <Tabs defaultActiveKey="1" items={items}></Tabs>
    </DefaultLayout>
  );
};

export default TabsComponentForSecondDetail;
