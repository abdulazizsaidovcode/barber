import { create } from 'zustand';
import { HelpList, HelpTypes } from '../../../types/help.ts';

const financeStore = create<HelpTypes>((set) => ({
  dataAboutService: [],
  setDataAboutService: (val: HelpList[]) => set({ dataAboutService: val }),
  dataPrivacyPolicy: [],
  setDataPrivacyPolicy: (val: HelpList[]) => set({ dataPrivacyPolicy: val }),
  dataLicenseAgreement: [],
  setDataLicenseAgreement: (val: HelpList[]) => set({ dataLicenseAgreement: val }),
  dataLicenses: [],
  setDataLicenses: (val: HelpList[]) => set({ dataLicenses: val }),
  dataCertificates: [],
  setDataCertificates: (val: HelpList[]) => set({ dataCertificates: val }),
  dataUsingApplication: [],
  setDataUsingApplication: (val: HelpList[]) => set({ dataUsingApplication: val }),
  dataOffer: [],
  setDataOffer: (val: HelpList[]) => set({ dataOffer: val }),
  dataServiceSpecification: [],
  setDataServiceSpecification: (val: HelpList[]) => set({ dataServiceSpecification: val }),
  dataTermsOfUse: [],
  setDataTermsOfUse: (val: HelpList[]) => set({ dataTermsOfUse: val })
}));

export default financeStore;