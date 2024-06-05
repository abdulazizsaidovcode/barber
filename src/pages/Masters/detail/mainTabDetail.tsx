import React from 'react';
import { Tabs } from 'antd';
import type { TabsProps } from 'antd';
import DetailMaster from './detailMaster';
import DefaultLayout from '../../../layout/DefaultLayout';

const onChange = (key: string) => {
  console.log(key);
};

const items: TabsProps['items'] = [
  {
    key: '1',
    label: 'Tab 1',
    children: <DetailMaster />,
  },
  {
    key: '2',
    label: 'Tab 2',
    children: 'Content of Tab Pane 2',
  },
];

const MainTabDetail: React.FC = () => (
  <DefaultLayout>
    <Tabs defaultActiveKey="1" items={items} onChange={onChange} />
  </DefaultLayout>
);

export default MainTabDetail;
