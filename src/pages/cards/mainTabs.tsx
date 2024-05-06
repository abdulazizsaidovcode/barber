import React from 'react';
import { Button, Tabs } from 'antd';
import FirstTab from './firstTab';
import SecondTab from './secondTab'; // Make sure the file name is correctly referenced.

const onChange = (key: string) => {
  console.log(key);
};

const items = [
  {
    key: '1',
    label: (
      <span
        className="dark:text-white text-black text-lg md:text-xl lg:text-2xl" // Responsive font sizes
      >
        Мастерам
      </span>
    ),
    children: <FirstTab />,
  },
  {
    key: '2',
    label: <span className="dark:text-white text-black text-lg md:text-xl lg:text-2xl">Клиентам</span>,
    children: <SecondTab />,
  },
 
];

const MainTabsCard: React.FC = () => (
  
  <Tabs
    className="dark:bg-boxdark bg-white p-2 w-full" // Use w-full for full width and responsive background colors
    defaultActiveKey="1"
    items={items}
    onChange={onChange}
    
    
  />
 
);

export default MainTabsCard;
