import React from 'react';
import Modal from '../../modals/modal';
import { Tabs } from 'antd';
import FirstTab from './newMastersTabs/FirstTab';
import SecondTab from './newMastersTabs/SecondTab';
import ThirdTab from './newMastersTabs/ThirdTab';

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
  gender?: string;
  address?: string;
  masterImgPath?: string;
  startDate?: string;
  districtName?: string;
  placeOfWork?: string;
  regionName?: string;
  status?: string;
  block?: boolean;
  instagramLink?: string;
  telegramLink?: string;
  clientCount?: string;
  completedOrderCount?: string;
  masterFeedbackCount?: string;
  rejectedOrderCount?: string;
  deleteMasterDate?: string;
  directionByGender?: string[];
  masterServiceCategory?: string[];
  masterSpecialization?: string[];
  newOrUpdateCategory?: boolean;
  masterChatStatus?: string;
  scheduleType?: string;
  facebookLink?: string;
  serviceData: ServiceData[]; // Add service data prop
  galleryData: GalleryData[]; // Add gallery data prop
  confirmMasters: (id: string, callback: () => void) => void; // Add confirmMasters function
  fetchData: () => void; // Add fetchData function
}

const NewMastersDetail: React.FC<NewMastersDetailProps> = ({
  isOpen,
  openReasonModal,
  onClose,
  masterId,
  firstName,
  lastName,
  nickname,
  phoneNumber,
  age,
  address,
  masterImgPath,
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
  fetchData
}) => {
  const items = [
    {
      key: '1',
      label: (
        <span className="dark:text-white text-black text-[10px] md:text-xl lg:text-2xl">
          Основная информация
        </span>
      ),
      children: <FirstTab
        phoneNumber={phoneNumber}
        nickname={nickname}
        masterImgPath={masterImgPath}
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
      />,
    },
    {
      key: '2',
      label: (
        <span className="dark:text-white text-black text-[10px] md:text-xl lg:text-2xl">
          Процедуры
        </span>
      ),
      children: <SecondTab serviceData={serviceData} />, // Pass service data to the second tab
    },
    {
      key: '3',
      label: (
        <span className="dark:text-white text-black text-[10px] md:text-xl lg:text-2xl">
          Галерея
        </span>
      ),
      children: <ThirdTab
        galleryData={galleryData} // Pass gallery data to the third tab
        onClose={onClose}
        openReasonModal={openReasonModal}
        confirmMasters={() => confirmMasters(masterId || '', fetchData)} />, // Pass confirmMasters function and fetchData function
    },
  ];
  return (
    <Modal isOpen={isOpen} onClose={onClose} mt='lg:mt-[550px] mt-[1200px]'>
      <div className='lg:w-[1300px] h-max'>
        <Tabs
          className="dark:bg-boxdark bg-white p-2 w-full"
          defaultActiveKey="1"
          items={items}
        />
      </div>
    </Modal>
  )
}

export default NewMastersDetail;
