import DefaultLayout from '../../layout/DefaultLayout.tsx';
import { Tabs } from 'antd';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb.tsx';
import { items } from './data.tsx';

const Client = () => {
  return (
    <DefaultLayout>
      <Breadcrumb pageName="Client" />
      <Tabs
        className="dark:bg-boxdark bg-white p-2 w-full"
        defaultActiveKey="1"
        items={items}
      />
    </DefaultLayout>
  );
};

export default Client;
