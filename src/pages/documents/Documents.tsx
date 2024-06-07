import DefaultLayout from '../../layout/DefaultLayout';
import MainTabs from './mainTabs';
import { useEffect } from 'react';
import { getHelp } from '../../helpers/api-function/help/help.tsx';
import helpStore from '../../helpers/state_managment/help/helpStore.tsx';

const Documents = () => {
  const {
    setDataAboutService,
    setDataPrivacyPolicy,
    setDataLicenseAgreement,
    setDataLicenses,
    setDataCertificates,
    setDataUsingApplication,
    setDataOffer,
    setDataServiceSpecification,
    setDataTermsOfUse
  } = helpStore();

  useEffect(() => {
    getHelp(setDataAboutService, 'ABOUT_SERVICE');
    getHelp(setDataPrivacyPolicy, 'PRIVACY_POLICY');
    getHelp(setDataLicenseAgreement, 'LICENSE_AGREEMENT');
    getHelp(setDataLicenses, 'LICENSES');
    getHelp(setDataCertificates, 'CERTIFICATES');
    getHelp(setDataUsingApplication, 'USING_APPLICATION');
    getHelp(setDataOffer, 'OFFER');
    getHelp(setDataServiceSpecification, 'SERVICE_SPECIFICATION');
    getHelp(setDataTermsOfUse, 'TERMS_OF_USE');
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