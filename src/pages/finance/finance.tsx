import DefaultLayout from '../../layout/DefaultLayout';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import MainTabs from './mainTabs';
import financeStore from '../../helpers/state_managment/finance/financeStore';
import { getFinance } from '../../helpers/api-function/finance/finance';
import { useEffect } from 'react';
 
const Finance = () => {
  const {setData} = financeStore()

  useEffect(() => {
    getFinance(null, null, setData)
  }, [])
 
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
