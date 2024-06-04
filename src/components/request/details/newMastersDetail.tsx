import React from 'react'
import Modal from '../../modals/modal'
import { Tabs } from 'antd';
import FirstTab from './newMastersTabs/FirstTab';
import SecondTab from './newMastersTabs/SecondTab';
import ThirdTab from './newMastersTabs/ThirdTab';

interface NewMastersDetail {
  isOpen: boolean;
  onClose: () => void;
  openReasonModal: () => void
}
const NewMastersDetail: React.FC<NewMastersDetail> = ({ isOpen, openReasonModal, onClose }) => {
  const items = [
    {
      key: '1',
      label: (
        <span
          className="dark:text-white text-black text-lg md:text-xl lg:text-2xl"
        >
          Основная информация
        </span>
      ),
      children: <FirstTab />,
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
      children: <ThirdTab onClose={onClose} openReasonModal={openReasonModal}/>,
    },
  ];
  return (
    <Modal isOpen={isOpen} onClose={onClose} mt='mt-[500px]'>
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

export default NewMastersDetail