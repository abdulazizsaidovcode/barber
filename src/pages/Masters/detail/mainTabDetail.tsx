import React from 'react';
import { Tabs } from 'antd';
import type { TabsProps } from 'antd';
import DetailMaster from './detailMaster';
import DefaultLayout from '../../../layout/DefaultLayout';
import Gallery from './galery';
import Service from './service';
import Reviews from './Reviews';
import { useTranslation } from 'react-i18next';

const MainTabDetail: React.FC = () => {
  const { t } = useTranslation()
  const items: TabsProps['items'] = [
    {
      key: '1',
      label: (
        <span className="dark:text-white text-black text-sm md:text-base lg:text-lg xl:text-xl">
          {t("basic_information")}
        </span>
      ),
      children: <DetailMaster />,
    },
    {
      key: '2',
      label: (
        <span className="dark:text-white text-black text-sm md:text-base lg:text-lg xl:text-xl">
          {t("Procedures")}
        </span>
      ),
      children: <Service />,
    },
    {
      key: '3',
      label: (
        <span className="dark:text-white text-black text-sm md:text-base lg:text-lg xl:text-xl">
          {t("siderbar_gallery")}
        </span>
      ),
      children: <Gallery />,
    },
    {
      key: '4',
      label: (
        <span className="dark:text-white text-black text-sm md:text-base lg:text-lg xl:text-xl">
          {t("Reviews")}
        </span>
      ),
      children: <Reviews />,
    },
  ];

  return (
    <DefaultLayout>
      <Tabs defaultActiveKey="1" items={items} />
    </DefaultLayout>
  );
};

export default MainTabDetail;
