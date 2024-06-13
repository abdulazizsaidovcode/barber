import React, { useState } from 'react';
import { Skeleton, Button, Rate } from 'antd';
import Switch from './../settings/details/TableSwitcher';
import Modal from '../modals/modal';
import { useTranslation } from 'react-i18next';
import TextArea from 'antd/es/input/TextArea';
import toast, { Toaster } from 'react-hot-toast';
import {
  master_block_put,
  master_send_message_master,
} from '../../helpers/api';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import { config } from '../../helpers/token';

type MasterCardInfoProps = {
  MasterName: string;
  MasterImg: any;
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
  Number: string;
  Telegram: string;
  Instagram: string;
  CompOrders: string;
  rejectedOrderCount: string;
  Clients: string;
  Level: string;
  StartData: string;
  PlaceOfWork: string;
  GenderType: [];
  ServiceCategory: [];
  Specialization: [];
  scheduleType: string;
  StatusNow: string;
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
  Number,
  Telegram,
  Instagram,
  CompOrders,
  rejectedOrderCount,
  Clients,
  Level,
  StartData,
  PlaceOfWork,
  GenderType,
  ServiceCategory,
  Specialization,
  scheduleType,
  StatusNow,
}) => {
  const { t } = useTranslation();
  const [isSwitchOn, setIsSwitchOn] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [SendOpen, setSendOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [pendingSwitchState, setPendingSwitchState] = useState(true);
  const MasterLocation = useLocation();
  const idMaster = MasterLocation.pathname.substring(8);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  const closeSendModal = () => setSendOpen(false);

  const handleSwitchClick = () => {
    setPendingSwitchState(!isSwitchOn);
    openModal();
  };
  const confirmToggleSwitch = async () => {
    setIsSwitchOn(pendingSwitchState);
    try {
      const type = () => {
        if (pendingSwitchState) {
          return 'ACTIVE';
        } else {
          return 'BLOCKED';
        }
      };
      const response = await axios.put(
        `${master_block_put}`,
        {
          id: idMaster,
          status: type(),
        },
        config,
      );

      console.log('Switch toggled successfully:', response.data);
      toast.success(t('Switch toggled successfully'));
    } catch (error) {
      console.error('Error toggling switch:', error);
      toast.error(t('Error toggling switch'));
    }
    closeModal();
  };
  const location = useLocation();
  const id = location.pathname.substring(8);
  console.log(id);

  const sendMessage = async () => {
    try {
      const response = await axios.post(
        master_send_message_master,
        {
          clientId: null,
          masterId: id,
          adminId: null,
          message: message,
          messageStatus: 'ADMIN_MASTER_MESSAGE_FOR_WRITE',
          read: true,
        },
        config,
      );
      console.log('Message sent successfully:', response.data);
      toast.success('Message sent successfully');
      closeSendModal();
    } catch (error) {
      console.error('There was an error sending the message!', error);
      toast.error('Failed to send message');
    }
  };
  const handleClickSendBtn = () => {
    setMessage('');
    setSendOpen(true);
  };
  const handlePostBtn = () => {
    if (message.valueOf() === '') {
      toast.error('информация не введена');
    } else {
      sendMessage();
    }
  };
  return (
    <div className="flex flex-col lg:flex-row-reverse gap-4 mt-4">
      <div className="w-[100%] flex flex-col items-center justify-center gap-4">
        <Skeleton loading={isLoading} active>
          <div className="bg-gray-100 dark:bg-[#ffffffdf] text-black dark:text-black p-4 shadow-4 flex flex-col justify-between pl-10 py-10 border-black rounded-xl w-full lg:w-[100%]">
            <div className="flex items-center justify-between">
              <p className="text-xl font-bold">Profile:</p>
              <div
                onClick={handleClickSendBtn}
                className="bg-green-500 p-2 rounded-xl text-white px-3 cursor-pointer"
              >
                Send Message
              </div>
            </div>
            <div className="w-[100%] bg-black h-[1px] flex items-center mb-4 mt-3"></div>
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
        <Skeleton loading={isLoading} active>
          <div className="bg-gray-100 dark:bg-[#ffffffdf] text-black dark:text-black p-4 shadow-4 flex flex-col justify-between pl-10 py-10 border-black rounded-xl w-full lg:w-[100%]">
            <div className="flex items-center">
              <p className="text-xl font-bold">Profession information:</p>
            </div>
            <div className="w-[100%] bg-black h-[1px] flex items-center mb-4 mt-3"></div>
            <p className="mb-5">
              <strong>Place of work:</strong> {PlaceOfWork}
            </p>
            <p className="mb-5">
              <strong>Direction by gender:</strong> {GenderType}
            </p>
            <p className="mb-5">
              <strong>Service category:</strong> {ServiceCategory}
            </p>
            <p className="mb-5">
              <strong>Specialization:</strong> {Specialization}
            </p>
            <p className="mb-5">
              <strong>Schedule Type:</strong> {scheduleType}
            </p>
          </div>
        </Skeleton>
      </div>
      <div className="flex flex-col h-full justify-between gap-4">
        <Skeleton loading={isLoading} active>
          <div className="flex flex-col dark:bg-[#ffffffdf] text-black dark:text-black border-black w-full lg:w-[300px] shadow-3 p-3 rounded-xl">
            <div className="flex items-center gap-4">
              <div
                className={` rounded-[50%] w-2 h-2 font-bold ${
                  StatusNow === 'OFFLINE'
                    ? 'bg-red-500 text-white'
                    : 'bg-green-500'
                }`}
              ></div>
              <p>{StatusNow}</p>
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
              <div
                className={`px-6 rounded-xl font-bold ${
                  Status === 'BLOCKED'
                    ? 'bg-red-500 text-white'
                    : 'bg-green-500'
                }`}
              >
                {Status}
              </div>
            </div>
            <div className="flex items-center justify-between mt-4">
              <p>Заблокировать</p>
              <div onClick={handleSwitchClick}>
                <Switch isOn={isSwitchOn} handleToggle={() => {}} />
              </div>
            </div>
          </div>
        </Skeleton>
        <Skeleton loading={isLoading} active>
          <div className="flex flex-col dark:bg-[#ffffffdf] text-black dark:text-black border-black w-full lg:w-[300px] shadow-3 p-3 rounded-xl">
            <div className="flex items-center justify-between">
              <p className="text-black font-bold mb-2 mt-2">Контакты:</p>
            </div>
            <div className="flex items-center justify-center w-[100%] h-[1px] bg-black"></div>
            <div className="flex items-center justify-between mt-4">
              <strong>Telefon :</strong>
              <p>{Number}</p>
            </div>
            <div className="flex items-center justify-between mt-4">
              <strong>Telegram :</strong>
              <p>{Telegram}</p>
            </div>
            <div className="flex items-center justify-between mt-4">
              <strong>Instagram :</strong>
              <p>{Instagram}</p>
            </div>
          </div>
        </Skeleton>
        <Skeleton loading={isLoading} active>
          <div className="flex flex-col dark:bg-[#ffffffdf] text-black dark:text-black border-black w-full lg:w-[300px] shadow-3 p-3 rounded-xl">
            <div className="flex items-center justify-between">
              <p className="text-black font-bold mb-2 mt-2">Indicators:</p>
            </div>
            <div className="flex items-center justify-center w-[100%] h-[1px] bg-black"></div>
            <div className="flex items-center justify-between mt-4">
              <strong>Completed Orders:</strong>
              <p>{CompOrders}</p>
            </div>
            <div className="flex items-center justify-between mt-4">
              <strong>Cancelled orders:</strong>
              <p>{rejectedOrderCount}</p>
            </div>
            <div className="flex items-center justify-between mt-4">
              <strong>Clients:</strong>
              <p>{Clients}</p>
            </div>
            <div className="flex items-center justify-between mt-4">
              <strong>Level:</strong>

              <Rate disabled defaultValue={Level} />
            </div>
            <div className="flex items-center justify-between mt-4">
              <strong>Start work:</strong>
              <p>{StartData}</p>
            </div>
          </div>
        </Skeleton>
      </div>
      <div>
        <Modal isOpen={isOpen} onClose={closeModal}>
          <p className="text-2xl font-bold">{t('Modal_answer')}</p>
          <div className="flex items-center gap-2 justify-end mt-3">
            <Button key="back" onClick={closeModal}>
              {t('No')}
            </Button>
            <Button onClick={confirmToggleSwitch}>{t('Ok')}</Button>
          </div>
        </Modal>
      </div>

      <Modal isOpen={SendOpen} onClose={closeSendModal} mt={'w-[70%]'}>
        <div className="w-[100%]">
          <p className="text-2xl text-black dark:text-white">Send message:</p>
          <TextArea
            required
            className="mt-4"
            rows={4}
            placeholder="Enter your message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <div className="flex items-center justify-center">
            <Button
              onClick={handlePostBtn}
              className="text-black mt-4 w-[40%] dark:text-white"
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
