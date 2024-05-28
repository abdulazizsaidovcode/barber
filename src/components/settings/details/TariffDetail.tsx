import React from 'react';
import { Tabs } from 'antd';
import DefaultLayout from '../../../layout/DefaultLayout';
import DeatilsSecondTab from './DeatilsSecondTab';
import DeatilsFirstTab from './DeatilsFirstTab';

const onChange = (key: string) => {
  console.log(key);
};

const items = [
  {
    key: '1',
    label: (
      <span className="dark:text-white text-black text-lg md:text-xl lg:text-2xl">
        Основной функционал
      </span>
    ),
    children: <DeatilsFirstTab />,
  },
  {
    key: '2',
    label: (
      <span className="dark:text-white text-black md:text-xl lg:text-2xl">
        Ограничения
      </span>
    ),
    children: <DeatilsSecondTab />,
  },
];

const TariffDetail: React.FC = () => (
  <DefaultLayout>
    <Tabs
      className="dark:bg-boxdark bg-white p-2 w-full"
      defaultActiveKey="1"
      onChange={onChange}
    >
      {items.map(item => (
        <Tabs.TabPane tab={item.label} key={item.key}>
          {item.children}
        </Tabs.TabPane>
      ))}
    </Tabs>
  </DefaultLayout>
);

export default TariffDetail;
