import React from 'react';
import { Tabs } from 'antd';
import FirstTab from './firstTab';
import SecondTab from './secondTab'; // Make sure the file name is correctly referenced.
import ThirdTab from './thirdTab';
import { useTranslation } from 'react-i18next';

const onChange = (key: string) => {
  console.log(key);
};

const MainTabs: React.FC = () => {
  const { t } = useTranslation();
  const items = [
    {
      key: '1',
      label: (
        <span
          className="dark:text-white text-black text-lg md:text-xl lg:text-2xl" // Responsive font sizes
        >
          {t('FirstTab_name')}
        </span>
      ),
      children: <FirstTab />,
    },
    {
      key: '2',
      label: (
        <span className="dark:text-white text-black text-lg md:text-xl lg:text-2xl">
          {t('SecondTab_name')}
        </span>
      ),
      children: <SecondTab />,
    },
    {
      key: '3',
      label: (
        <span className="dark:text-white text-black text-lg md:text-xl lg:text-2xl">
          {t('ThirdTab_name')}
        </span>
      ),
      children: <ThirdTab />,
    },
  ];
  return (
    <Tabs
      className="dark:bg-boxdark bg-white p-2 w-full"
      defaultActiveKey="1"
      items={items}
      onChange={onChange}
    />
  );
};

export default MainTabs;
