import DefaultLayout from '../../layout/DefaultLayout.tsx';
import { Tabs } from 'antd';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb.tsx';
import { items } from './data.tsx';
import { useEffect } from 'react';
import { getRegion } from '../../helpers/api-function/master/master.tsx';
import clientFilterStore from '../../helpers/state_managment/client/clientFilterStore.tsx';
import { useTranslation } from 'react-i18next';
import { getClients } from '../../helpers/api-function/client/client.tsx';

const Client = () => {
  const { t } = useTranslation();
  const { setRegionData, setClientFilterData, setClientTotalPage, page, size} = clientFilterStore()
  useEffect(() => {
    getClients({ setData: setClientFilterData, setTotalPage: setClientTotalPage})
    getRegion(setRegionData)
  }, [])

  useEffect(() => {
    getClients({ setData: setClientFilterData, setTotalPage: setClientTotalPage, page, size })
  }, [page])

  return (
    <DefaultLayout>
      <Breadcrumb pageName={t("Client")} />
      <Tabs
        className="dark:bg-boxdark bg-white p-2 w-full"
        defaultActiveKey="1"
        items={items}
      />
    </DefaultLayout>
  );
};

export default Client;
