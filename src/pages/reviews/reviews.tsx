import React from 'react'
import DefaultLayout from '../../layout/DefaultLayout';
import FirstTab from './tabs/FirstTab';
import SecondTab from './tabs/SecondTab';
import { Tabs } from 'antd';


const items = [
  {
    key: '1',
    label: (
      <span className="dark:text-white text-black text-lg md:text-xl lg:text-2xl">
        О сервисе
      </span>
    ),
    children: <FirstTab />,
  },
  {
    key: '2',
    label: (
      <span className="dark:text-white text-black text-lg md:text-xl lg:text-2xl">
        О мастерах
      </span>
    ),
    children: <SecondTab />,
  }
];

const Reviews: React.FC = () => {
  return (
    <DefaultLayout>
      <Tabs
        className="dark:bg-boxdark bg-white p-2 w-full"
        defaultActiveKey="1"
        items={items}
      />
    </DefaultLayout>)
}
export default Reviews;