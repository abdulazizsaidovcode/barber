import DefaultLayout from '../../layout/DefaultLayout';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import MainTabs from './mainTabs';
import MasterTable from '../../components/Tables/MasterTable';

const Calculation = () => {
  const tableHeaders = [
    { id: 1, name: 'Country' },
    { id: 2, name: 'Non-cash turnover' },
    { id: 3, name: 'All turnover' },
    { id: 4, name: 'Total income' },
    { id: 5, name: 'Income “Simple”' },
    { id: 6, name: 'Income "Premium"' },
    { id: 7, name: 'Income "Vip"' },
    { id: 8, name: 'Master total' },
    { id: 9, name: 'Income "Simple"' },
    { id: 10, name: '“Family” income' },
    { id: 11, name: 'Total clients' },
  ];
  return (
    <div>
      <DefaultLayout>
        <Breadcrumb pageName="Calculation" />
        <MainTabs />
      </DefaultLayout>
    </div>
  );
};

export default Calculation;
