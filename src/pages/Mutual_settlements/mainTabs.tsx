import React from 'react';
import { Tabs } from 'antd';
import FirstTab from './firstTab';
 // Make sure the file name is correctly referenced.

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
        
      </span>
        ),
        children: <FirstTab />,
    },
    
];

const MainTabs: React.FC = () => (
    <Tabs
        className="bg-white dark:bg-black  text-slate-700 dark:text-slate-300 p-2 w-full" // Use w-full for full width and responsive background colors
        defaultActiveKey="1"
        items={items}
        onChange={onChange}
    />
);

export default MainTabs;
