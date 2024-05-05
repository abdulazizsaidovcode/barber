import React from 'react';
import { Tabs } from 'antd';
import FirstTab from './firstTab';
import SecondTab from './seondTab'; // Corrected typo from 'seondTab' to 'secondTab'
import ThirdTab from './thirdTab';

const onChange = (key: string) => {
  console.log(key);
};

const items = [
  {
    key: '1',
    label: (
      <span
        className="dark:text-white"
        style={{ color: 'Black', fontSize: '30px' }}
      >
        Upcoming
      </span>
    ),
    children: <FirstTab />,
  },
  {
    key: '2',
    label: <span style={{ color: 'black', fontSize: '30px' }}>Completed</span>,
    children: <SecondTab />,
  },
  {
    key: '3',
    label: <span style={{ color: 'black', fontSize: '30px' }}>Rejected</span>,
    children: <ThirdTab />,
  },
];

const MainTabs: React.FC = () => (
  <Tabs
    className="dark:bg-boxdark p-2"
    defaultActiveKey="1"
    items={items}
    onChange={onChange}
  />
);

export default MainTabs;
