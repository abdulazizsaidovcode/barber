import DefaultLayout from '../../layout/DefaultLayout';
import { Tabs } from 'antd';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb.tsx';
import { items } from './data.tsx';
import { useEffect } from 'react';
import { getMasters } from '../../helpers/api-function/master/master.tsx';
import masterStore from '../../helpers/state_managment/master/masterStore.tsx';

const Master = () => {
  const {setData, setTotalPage} = masterStore()
  useEffect(() => {
    getMasters({setData, setTotalPage})
  }, [])
  return (
    <DefaultLayout>
      <Breadcrumb pageName="Master" />
      <Tabs
        className="dark:bg-boxdark bg-white p-2 w-full"
        defaultActiveKey="1"
        items={items}
      />
    </DefaultLayout>
  );
};

export default Master;