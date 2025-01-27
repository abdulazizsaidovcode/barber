import DefaultLayout from '../../layout/DefaultLayout.tsx';
import MainTabs from './mainTabs.tsx';
import { useEffect } from 'react';
import { getHelp } from '../../helpers/api-function/help/help.tsx';
import helpStore from '../../helpers/state_managment/help/helpStore.tsx';

const Documents = () => {
  const {
    setDataAll,
    setDataMaster,
    setDataClient
  } = helpStore();

  useEffect(() => {
    getHelp(setDataAll, 'ALL');
    getHelp(setDataMaster, 'FOR_MASTER');
    getHelp(setDataClient, 'FOR_CLIENT');
  }, []);
  return (
    <>
      <DefaultLayout>
        <MainTabs />
      </DefaultLayout>
    </>
  );
};
export default Documents;