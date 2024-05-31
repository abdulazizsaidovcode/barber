import React from 'react';
import { Tabs } from 'antd';
import FirstTab from './firstTab';
import SecondTab from './secondTab';

const items = [
  {
    key: '1',
    label: (
      <span
        className="dark:text-white text-black text-lg md:text-xl lg:text-2xl"
      >
        By region
      </span>
    ),
    children: <FirstTab />,
  },
  {
    key: '2',
    label: (
      <span className="dark:text-white text-black text-lg md:text-xl lg:text-2xl">
        By city
      </span>
    ),
    children: <SecondTab />,
  },
];

const MainTabs: React.FC = () => (
  <Tabs
    className="dark:bg-boxdark bg-white p-2 w-full"
    defaultActiveKey="1"
    items={items}
  />
);

export default MainTabs;
