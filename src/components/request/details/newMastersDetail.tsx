import React from 'react';
import Modal from '../../modals/modal';
import { Tabs } from 'antd';
import FirstTab from './newMastersTabs/FirstTab';
import SecondTab from './newMastersTabs/SecondTab';
import ThirdTab from './newMastersTabs/ThirdTab';

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
  gender,
  address,
  masterImgPath,
  startDate,
  districtName,
  placeOfWork,
  regionName,
  status,
  block,
  instagramLink,
  telegramLink,
  clientCount,
  completedOrderCount,
  masterFeedbackCount,
  rejectedOrderCount,
  deleteMasterDate,
  directionByGender,
  masterServiceCategory,
  masterSpecialization,
  newOrUpdateCategory,
  masterChatStatus,
  scheduleType,
  facebookLink
}) => {
  const items = [
    {
      key: '1',
      label: (
        <span className="dark:text-white text-black text-lg md:text-xl lg:text-2xl">
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
        <span className="dark:text-white text-black text-lg md:text-xl lg:text-2xl">
          Процедуры
        </span>
      ),
      children: <SecondTab />,
    },
    {
      key: '3',
      label: (
        <span className="dark:text-white text-black text-lg md:text-xl lg:text-2xl">
          Галерея
        </span>
      ),
      children: <ThirdTab onClose={onClose} openReasonModal={openReasonModal} />,
    },
  ];
  return (
    <Modal isOpen={isOpen} onClose={onClose} mt='mt-[550px]'>
      <div className='w-[1300px] h-[1100px]'>
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
