import React from 'react';
import { Tabs } from 'antd';
import All from './all';
import MasterDocument from './masterDocument';


const onChange = (key: string) => {
  console.log(key);
};

const items = [
  {
    key: '1',
    label: (
      <span
        className="dark:text-white text-black text-lg md:text-xl lg:text-2xl"
      >
        Общее
      </span>
    ),
     children: <All/>,

   
  },
  {
    key: '2',
    label: (
      <span className="dark:text-white text-black text-lg md:text-xl lg:text-2xl">
        Мастера
      </span>
    ),
    children: <MasterDocument/>
    
  },
  {
    key: '3',
    label: (
      <span className="dark:text-white text-black text-lg md:text-xl lg:text-2xl">
        Клиенты
      </span>
    ),
    
  },
];

const MainTabs: React.FC = () => (
    
  <Tabs
    className="dark:bg-boxdark bg-white p-2 w-full" // Use w-full for full width and responsive background colors
    defaultActiveKey="1"
    items={items}
    onChange={onChange}
  />
  
);

export default MainTabs;
