import DefaultLayout from './../../layout/DefaultLayout';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import MainTabs from './mainTabs';

const Order = () => {
  return (
    <div>
      <DefaultLayout>
        <Breadcrumb pageName="Orders" />
        <MainTabs />
      </DefaultLayout>
    </div>
  );
};

export default Order;
