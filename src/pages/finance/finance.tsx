import DefaultLayout from '../../layout/DefaultLayout';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import MainTabs from './mainTabs';
import financeStore from '../../helpers/state_managment/finance/financeStore';
import { getFinance } from '../../helpers/api-function/finance/finance';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

const Finance = () => {
  const { setData } = financeStore()
  const { t } = useTranslation()

  useEffect(() => {
    getFinance(null, null, setData)
  }, [])

  return (
    <>
      <DefaultLayout>
        <Breadcrumb pageName={t("siderbar_finance")} />
        <MainTabs />
      </DefaultLayout>
    </>
  );
};

export default Finance;
