// main help types
export interface HelpTypes {
  dataAboutService: HelpList[];
  setDataAboutService: (val: HelpList[]) => void;
  dataPrivacyPolicy: HelpList[];
  setDataPrivacyPolicy: (val: HelpList[]) => void;
  dataLicenseAgreement: HelpList[];
  setDataLicenseAgreement: (val: HelpList[]) => void;
  dataLicenses: HelpList[]
  setDataLicenses: (val: HelpList[]) => void;
  dataCertificates: HelpList[],
  setDataCertificates: (val: HelpList[]) => void;
  dataUsingApplication: HelpList[];
  setDataUsingApplication: (val: HelpList[]) => void;
  dataOffer: HelpList[];
  setDataOffer: (val: HelpList[]) => void;
  dataServiceSpecification: HelpList[];
  setDataServiceSpecification: (val: HelpList[]) => void;
  dataTermsOfUse: HelpList[];
  setDataTermsOfUse: (val: HelpList[]) => void;
}

// help list types
export interface HelpList {
  id: string;
  name: string;
  categoryFatherId: string;
  categoryFatherName: string;
  isNew: boolean;
}