import DefaultLayout from '../../layout/DefaultLayout';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import MainTabs from './mainTabs';
import MasterTable from '../../components/Tables/MasterTable';

const Calculation = () => {
  const tableHeaders = [
    { id: 1, name: 'Ism' },
    { id: 2, name: 'Familiya' },
    { id: 3, name: 'Yosh' },
  ];
  return (
    <div>
      <DefaultLayout>
        <Breadcrumb pageName="Calculation" />
        <MainTabs />
        <MasterTable thead={tableHeaders}>
          <tr>
            <td className="p-5">Ali</td>
            <td className="p-5">Valiyev</td>
            <td className="p-5">25</td>
          </tr>
          <tr>
            <td className="p-5">Bek</td>
            <td className="p-5">Karimov</td>
            <td className="p-5">30</td>
          </tr>
          // Bu yerda yanada ko'proq qatorlar qo'shishingiz mumkin
        </MasterTable>{' '}
      </DefaultLayout>
    </div>
  );
};

export default Calculation;
