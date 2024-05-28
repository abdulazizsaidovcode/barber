import React from 'react';
import {  Tabs } from 'antd';
import FirstTab from './firstTab';


const onChange = (key: string) => {
  console.log(key);
};

const items = [
  {
    key: '1',
    label: (
      <span
        className="dark:text-white text-black text-lg md:text-xl lg:text-2xl font-bold" // Responsive font sizes
      >
        Мастерам
      </span>
    ),
    children: <FirstTab />,
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
