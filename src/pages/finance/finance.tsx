import DefaultLayout from '../../layout/DefaultLayout';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import MainTabs from './mainTabs';

const Finance = () => {
  return (
    <>
      <DefaultLayout>
        <Breadcrumb pageName="Finance" />
        <MainTabs />
      </DefaultLayout>
    </>
  );
};

export default Finance;
