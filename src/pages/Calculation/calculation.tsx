import DefaultLayout from '../../layout/DefaultLayout';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import MainTabs from './mainTabs';

const Calculation = () => {
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
