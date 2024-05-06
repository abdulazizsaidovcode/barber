import TableThree from '../../components/Tables/TableThree';
import DefaultLayout from '../../layout/DefaultLayout';
import { Tabs } from 'antd';
import SecondTab from '../finance/secondTab.tsx';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb.tsx';
import Filters from './filters/filters.tsx';
import { IMasterItems } from '../../types/master.ts';

const Master = () => {
  const items: IMasterItems[] = [
    {
      key: '1',
      label: (
        <span className="dark:text-white text-black text-lg md:text-xl lg:text-2xl">
          Masterlar ro'yxati
        </span>
      ),
      children: <TableThree />
    },
    {
      key: '2',
      label: (
        <span className="dark:text-white text-black text-lg md:text-xl lg:text-2xl">
          Masterning joylashuvi
        </span>
      ),
      children: <SecondTab />
    }
  ];

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