import DefaultLayout from '../../layout/DefaultLayout';
import { Tabs } from 'antd';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb.tsx';
import Filters from './filters/filters.tsx';
import { items } from './data.tsx';

const Master = () => {
  return (
    <DefaultLayout>
      <Breadcrumb pageName="Master" />
      <Filters />
      <Tabs
        className="dark:bg-boxdark bg-white p-2 w-full"
        defaultActiveKey="1"
        items={items}
      />
    </DefaultLayout>
  );
};

export default Master;