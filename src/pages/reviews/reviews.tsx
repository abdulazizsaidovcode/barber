import React, { useEffect } from 'react';
import DefaultLayout from '../../layout/DefaultLayout';
import FirstTab from './tabs/FirstTab';
import SecondTab from './tabs/SecondTab';
import { Tabs } from 'antd';
import { useTranslation } from 'react-i18next';
import useReviewsStore from '../../helpers/state_managment/reviews/reviews';
import { fetchDataList, fetchMainData, fetchMasterDataList } from '../../helpers/api-function/reviews/reviews';
import { getRegion } from '../../helpers/api-function/master/master';
import masterStore from '../../helpers/state_managment/master/masterStore';
import { reviews_list_data, reviews_list_master_data, reviews_main_data } from '../../helpers/api';

const Reviews: React.FC = () => {
  const { setMainData, setListData, pageSize, currentPage, setTotalPage, setListMasterData } = useReviewsStore();
  const { setRegionData } = masterStore();
  const { t } = useTranslation();

  useEffect(() => {
    fetchMainData(setMainData, reviews_main_data);
    getRegion(setRegionData);
    fetchMasterDataList(setListMasterData, `reviews_list_master_data?page=0&size=${pageSize}`);
  }, []);

  useEffect(() => {
    fetchDataList(setListData, setTotalPage, `${reviews_list_data}?page=${currentPage}&size=${pageSize}`);
  }, [currentPage, pageSize]);

  const items = [
    {
      key: '1',
      label: (
        <span className="dark:text-white text-black text-lg md:text-xl lg:text-2xl">
          {t("About_the_service")}
        </span>
      ),
      children: <FirstTab />,
    },
    {
      key: '2',
      label: (
        <span className="dark:text-white text-black text-lg md:text-xl lg:text-2xl">
          {t("About_the_masters")}
        </span>
      ),
      children: <SecondTab />,
    },
  ];

  return (
    <DefaultLayout>
      <Tabs
        className="dark:bg-boxdark bg-white p-2 w-full"
        defaultActiveKey="1"
        items={items}
      />
    </DefaultLayout>
  );
};

export default Reviews;
