import DefaultLayout from '../../layout/DefaultLayout';
import { Tabs } from 'antd';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb.tsx';
import { useEffect } from 'react';
import { getCategory, getMasters, getRegion } from '../../helpers/api-function/master/master.tsx';
import masterStore from '../../helpers/state_managment/master/masterStore.tsx';
import { useTranslation } from 'react-i18next';
import { IMasterItems } from '../../types/master.ts';
import MasterTables from './master-tables.tsx';
import MasterLocation from './master-location.tsx';

const Master = () => {
  const { setData, setTotalPage, setRegionData, setCategory, page } = masterStore()
  const { t } = useTranslation();
  useEffect(() => {
    getMasters({ setData, setTotalPage })
    getRegion(setRegionData)
    getCategory(setCategory)
  }, [])

  useEffect(() => {
    getMasters({ setData, setTotalPage, page })
  }, [page])

  const items: IMasterItems[] = [
    {
      key: '1',
      label: (
        <span className="dark:text-white text-black text-lg md:text-xl lg:text-2xl">
          {t("List_of_masters")}
        </span>
      ),
      children: <MasterTables />,
    },
    {
      key: '2',
      label: (
        <span className="dark:text-white text-black text-lg md:text-xl lg:text-2xl">
          {t("The_location_of_the_master")}
        </span>
      ),
      children: <MasterLocation />,
    },
  ];

  return (
    <DefaultLayout>
      <Breadcrumb pageName={t('master')} />
      <Tabs
        className="dark:bg-boxdark bg-white p-2 w-full"
        defaultActiveKey="1"
        items={items}
      />
    </DefaultLayout>
  );
};

export default Master;