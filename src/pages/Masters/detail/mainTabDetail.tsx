import React from 'react';
import { Tabs } from 'antd';
import type { TabsProps } from 'antd';
import DetailMaster from './detailMaster';
import DefaultLayout from '../../../layout/DefaultLayout';
import Gallery from './galery';
import Service from './service';
import Reviews from './Reviews';

const onChange = (key: string) => {
  console.log(key);
};

const items: TabsProps['items'] = [
  {
    key: '1',
    label: (
      <span className="dark:text-white text-black text-sm md:text-base lg:text-lg xl:text-xl">
        Основная информация
      </span>
    ),
    children: <DetailMaster />,
  },
  {
    key: '2',
    label: (
      <span className="dark:text-white text-black text-sm md:text-base lg:text-lg xl:text-xl">
        Процедуры
      </span>
    ),
    children: <Service />,
  },
  {
    key: '3',
    label: (
      <span className="dark:text-white text-black text-sm md:text-base lg:text-lg xl:text-xl">
        Галерея
      </span>
    ),
    children: <Gallery />,
  },
  {
    key: '4',
    label: (
      <span className="dark:text-white text-black text-sm md:text-base lg:text-lg xl:text-xl">
        Отзывы
      </span>
    ),
    children: <Reviews />,
  },
];

const MainTabDetail: React.FC = () => (
  <DefaultLayout>
    <Tabs defaultActiveKey="1" items={items} onChange={onChange} />
  </DefaultLayout>
);

export default MainTabDetail;
