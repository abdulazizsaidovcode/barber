import DefaultLayout from '../../layout/DefaultLayout';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import MainTabs from './mainTabs';

const Finance = () => {
  return (
    <div>
      <DefaultLayout>
        <Breadcrumb pageName="Finance" />
        <MainTabs />
      </DefaultLayout>
    </div>
  );
};

export default Finance;
