import DefaultLayout from '../../layout/DefaultLayout';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import MainTabs from './mainTabs';
import { useTranslation } from 'react-i18next';

const Calculation = () => {
  const { t } = useTranslation();


  return (
    <div>
      <DefaultLayout>
        <Breadcrumb pageName={t('orders_name')} />
        <MainTabs />
      </DefaultLayout>
    </div>
  );
};

export default Calculation;
