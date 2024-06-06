import React, { useState } from 'react';
import { Skeleton, Button } from 'antd';
import Switch from './../settings/details/TableSwitcher';
import Modal from '../modals/modal';
import { useTranslation } from 'react-i18next';
import TextArea from 'antd/es/input/TextArea';
import toast, { Toaster } from 'react-hot-toast';

type MasterCardInfoProps = {
  MasterName: string;
  MasterImg: string;
  definitionType: string;
  Status: string;
  isLoading: boolean;
  SurName: string;
  Location: any;
  UserName: string;
  Gender: string;
  Age: string;
  Region: string;
  City: string;
};

const MasterCardInfo: React.FC<MasterCardInfoProps> = ({
  MasterName,
  MasterImg,
  definitionType,
  Status,
  isLoading,
  SurName,
  Location,
  UserName,
  Gender,
  Age,
  Region,
  City,
}) => {
  const { t } = useTranslation();
  const [isSwitchOn, setIsSwitchOn] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [SendOpen, setSendOpen] = useState(false);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  const openSendModal = () => setSendOpen(true);
  const closeSendModal = () => setSendOpen(false);

  const toggleSwitch = () => {
    setIsSwitchOn(!isSwitchOn);
  };

  const toas = () => {
    toast.success('Send your message');
    closeSendModal();
  };

  return (
    <div className="flex flex-col lg:flex-row gap-4 mt-4">
      <div className="flex flex-col h-full justify-between gap-4">
        <Skeleton loading={isLoading} active>
          <div className="flex flex-col dark:bg-[#ffffffdf] text-black dark:text-black border-black w-full lg:w-[300px] shadow-3 p-3 rounded-xl">
            <div className="flex items-center">
              <div className="bg-green-500 rounded-[50%] w-3 h-3"></div>
              <p>{MasterName}</p>
            </div>
            <div className="flex items-center justify-center border-black p-1 rounded-full">
              <img
                src={MasterImg}
                alt="Master"
                className="w-40 border h-40 rounded-full"
              />
            </div>
            <div className="flex items-center mt-3 justify-between">
              <p className="text-gray-600">Ta'rif:</p>
              <p className="text-gray-600">{definitionType}</p>
            </div>
          </div>
        </Skeleton>
        <Skeleton loading={isLoading} active>
          <div className="flex flex-col dark:bg-[#ffffffdf] text-black dark:text-black border-black w-full lg:w-[300px] shadow-3 p-3 rounded-xl">
            <div className="flex items-center justify-between">
              <p className="text-black font-bold">Status:</p>
              <div className="bg-green-500 px-6 rounded-xl font-bold">
                {Status}
              </div>
            </div>
            <div className="flex items-center justify-start mt-4">
              <p>Заблокировать</p>
              <div onClick={() => openModal()}>
                <Switch isOn={isSwitchOn} handleToggle={toggleSwitch} />
              </div>
            </div>
          </div>
        </Skeleton>
      </div>
      <Skeleton loading={isLoading} active>
        <div className="bg-gray-100  dark:bg-[#ffffffdf] text-black dark:text-black p-4 shadow-4 flex flex-col justify-between pl-10 py-10 border-black rounded-xl w-full lg:w-[100%]">
          <div className="flex items-center justify-between">
            <p className="mb-2 text-2xl font-bold">Profile:</p>
            <div
              onClick={openSendModal}
              className="bg-green-500 p-2 rounded-xl text-white px-5 cursor-pointer"
            >
              Send Message
            </div>
          </div>
          <div className="w-[100%]  bg-black h-[1px] flex items-center mb-4 mt-3"></div>
          <p className="mb-5">
            <strong>Name:</strong> {MasterName}
          </p>
          <p className="mb-5">
            <strong>SurName:</strong> {SurName}
          </p>
          <p className="mb-5">
            <strong>User Name:</strong> {UserName}
          </p>
          <p className="mb-5">
            <strong>Gender:</strong> {Gender}
          </p>
          <p className="mb-5">
            <strong>Age:</strong> {Age}
          </p>
          <p className="mb-5">
            <strong>Region:</strong> {Region}
          </p>
          <p className="mb-5">
            <strong>City:</strong> {City}
          </p>
          <p className="mb-5">
            <strong>Location:</strong> {Location}
          </p>
        </div>
      </Skeleton>
      <Modal isOpen={isOpen} onClose={closeModal}>
        <p className="text-2xl font-bold">{t('Modal_answer')}</p>
        <div className="flex items-center justify-end mt-10 gap-4">
          <Button danger onClick={closeModal}>
            No
          </Button>
          <Button className="text-white" onClick={closeModal}>
            Ok
          </Button>
        </div>
      </Modal>
      <Modal isOpen={SendOpen} onClose={closeSendModal}>
        <div className="w-[45rem]">
          <p className="text-2xl text-black dark:text-white">Send message:</p>
          <TextArea
            className="mt-4"
            rows={4}
            placeholder="Enter your message"
          />
          <div className="flex items-center justify-center">
            <Button
              onClick={toas}
              className="text-black mt-4 px-50 dark:text-white"
              size="large"
            >
              Send
            </Button>
          </div>
        </div>
      </Modal>
      <Toaster position="top-center" reverseOrder={false} />
    </div>
  );
};

export default MasterCardInfo;
