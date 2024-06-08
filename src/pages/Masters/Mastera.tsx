import DefaultLayout from '../../layout/DefaultLayout';
import { Tabs } from 'antd';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb.tsx';
import { items } from './data.tsx';
import { useEffect } from 'react';
import { getCategory, getMasters, getRegion } from '../../helpers/api-function/master/master.tsx';
import masterStore from '../../helpers/state_managment/master/masterStore.tsx';
import { useTranslation } from 'react-i18next';

const Master = () => {
  const { setData, setTotalPage, setRegionData, setCategory } = masterStore()
  const { t } = useTranslation();
  useEffect(() => {
    getMasters({ setData, setTotalPage })
    getRegion(setRegionData)
    getCategory(setCategory)
  }, [])
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