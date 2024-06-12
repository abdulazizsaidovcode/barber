import React, { useEffect } from 'react';
import DefaultLayout from '../../layout/DefaultLayout';
import FirstTab from './tabs/FirstTab';
import SecondTab from './tabs/SecondTab';
import { Tabs } from 'antd';
import { useTranslation } from 'react-i18next';
import useReviewsStore from '../../helpers/state_managment/reviews/reviews';
import { fetchMainData, fetchReviewsData } from '../../helpers/api-function/reviews/reviews';

const Reviews: React.FC = () => {
  const { mainData, setMainData, setReviewsData } = useReviewsStore();
  const { t } = useTranslation();

  useEffect(() => {
    const loadData = async () => {
      try {
        const mainData = await fetchMainData();
        setMainData(mainData);
        const reviewsData = await fetchReviewsData();
        console.log(reviewsData);
        
        setReviewsData(reviewsData);
      } catch (error) {
        console.error("Failed to load data", error);
      }
    };

    loadData();
  }, [setMainData, setReviewsData]);

  const items = [
    {
      key: '1',
      label: (
        <span className="dark:text-white text-black text-lg md:text-xl lg:text-2xl">
          {t("About_the_service")}
        </span>
      ),
      children: <FirstTab mainData={mainData} />,
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