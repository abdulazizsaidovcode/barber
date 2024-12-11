import React from 'react';
import Modal from '../../modals/modal';
import { Tabs } from 'antd';
import FirstTab from './newMastersTabs/FirstTab';
import SecondTab from './newMastersTabs/SecondTab';
import ThirdTab from './newMastersTabs/ThirdTab';
import { useTranslation } from 'react-i18next';

interface ServiceData {
  category: {
    name: string;
  };
  price: string;
  serviceTime: string;
  attachmentId: string;
  description: string;
}

interface GalleryData {
  id: number;
  albumName: string;
  resGalleryAttachments: [
    { attachmentId: string; main: boolean; newStatus: boolean }
  ];
  date: string;
}

interface NewMastersDetailProps {
  isOpen: boolean;
  onClose: () => void;
  openReasonModal: () => void;
  masterId?: string;
  firstName?: string;
  lastName?: string;
  nickname?: string;
  phoneNumber?: string;
  age?: string;
  address?: string;
  masterImgId?: string;
  districtName?: string;
  regionName?: string;
  instagramLink?: string;
  telegramLink?: string;
  directionByGender?: string[];
  masterServiceCategory?: string[];
  masterSpecialization?: string[];
  masterChatStatus?: string;
  scheduleType?: string;
  facebookLink?: string;
  serviceData: ServiceData[];
  galleryData: GalleryData[];
  confirmMasters: (id: string, callback: () => void) => void;
  fetchData: () => void;
}

const NewMastersDetail: React.FC<NewMastersDetailProps> = ({
  isOpen,
  onClose,
  openReasonModal,
  masterId,
  firstName,
  lastName,
  nickname,
  phoneNumber,
  age,
  address,
  masterImgId,
  districtName,
  regionName,
  instagramLink,
  telegramLink,
  directionByGender,
  masterServiceCategory,
  masterChatStatus,
  scheduleType,
  facebookLink,
  serviceData,
  galleryData,
  confirmMasters,
  fetchData,
}) => {
  const { t } = useTranslation();

  const items = [
    {
      key: '1',
      label: (
        <span className="dark:text-white text-black text-[10px] md:text-xl lg:text-2xl">
          {t('basic_information')}
        </span>
      ),
      children: (
        <FirstTab
          phoneNumber={phoneNumber}
          nickname={nickname}
          masterImgId={masterImgId}
          firstName={firstName}
          lastName={lastName}
          age={age}
          address={address}
          instagramLink={instagramLink}
          telegramLink={telegramLink}
          directionByGender={directionByGender}
          masterChatStatus={masterChatStatus}
          masterServiceCategory={masterServiceCategory}
          masterSpecialization={masterServiceCategory}
          regionName={regionName}
          facebookLink={facebookLink}
          districtName={districtName}
          scheduleType={scheduleType}
        />
      ),
    },
    {
      key: '2',
      label: (
        <span className="dark:text-white text-black text-[10px] md:text-xl lg:text-2xl">
          {t('Procedures')}
        </span>
      ),
      children: <SecondTab serviceData={serviceData} />,
    },
    {
      key: '3',
      label: (
        <span className="dark:text-white text-black text-[10px] md:text-xl lg:text-2xl">
          {t('Gallery')}
        </span>
      ),
      children: (
        <ThirdTab
          galleryData={galleryData}
          onClose={onClose}
          openReasonModal={openReasonModal}
          confirmMasters={() => confirmMasters(masterId || '', fetchData)}
        />
      ),
    },
  ];

  return (
    <Modal isOpen={isOpen} onClose={onClose} mt="lg:w-[1300px] h-max">
      <div>
        <Tabs className="dark:bg-boxdark bg-white p-2 w-full" defaultActiveKey="1" items={items} />
      </div>
    </Modal>
  );
};

export default NewMastersDetail;
