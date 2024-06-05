import React from 'react';
import { Tabs } from 'antd';
import type { TabsProps } from 'antd';
import DetailMaster from './detailMaster';
import DefaultLayout from '../../../layout/DefaultLayout';

const onChange = (key: string) => {
  console.log(key);
};

const items: TabsProps['items'] = [
  {
    key: '1',
    label: (
      <span className="dark:text-white text-black text-lg md:text-xl lg:text-2xl">
        Основная информация
      </span>
    ),
    children: <DetailMaster />,
  },
  {
    key: '2',
    label: (
      <span className="dark:text-white text-black text-lg md:text-xl lg:text-2xl">
        Процедуры
      </span>
    ),
    children: 'Content of Tab Pane 2',
  },
  {
    key: '3',
    label: (
      <span className="dark:text-white text-black text-lg md:text-xl lg:text-2xl">
        Галерея
      </span>
    ),
    children: 'Content of Tab Pane 2',
  },
  {
    key: '4',
    label: (
      <span className="dark:text-white text-black text-lg md:text-xl lg:text-2xl">
        Отзывы
      </span>
    ),
    children: 'Content of Tab Pane 2',
  },
];

const MainTabDetail: React.FC = () => (
  <DefaultLayout>
    <Tabs defaultActiveKey="1" items={items} onChange={onChange} />
  </DefaultLayout>
);

export default MainTabDetail;
