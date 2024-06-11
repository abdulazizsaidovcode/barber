import React, { useState } from 'react';
import { Skeleton, Button, Input } from 'antd';
import { useTranslation } from 'react-i18next';
import Switch from './../settings/details/TableSwitcher';
import toast, { Toaster } from 'react-hot-toast';
import axios from 'axios';
import { client_block_put, client_send_message } from '../../helpers/api';
import { config } from './../../helpers/token';
import { useLocation } from 'react-router-dom';
import Modal from '../modals/modal';

const { TextArea } = Input;

type DetailClientProps = {
  ClientId: string;
  ClientName: string;
  ClientImg: string;
  turnover: string;
  Status: string;
  isLoading: boolean;
  SurName: string;
  Location: string;
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
  StartData: string;
  ServiceCategory: string[];
  StatusNow: string;
};

const DetailClient: React.FC<DetailClientProps> = ({
  ClientId,
  ClientName,
  ClientImg,
  turnover,
  Status,
  isLoading,
  SurName,
  Location,
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
  StartData,
  StatusNow,
}) => {
  const { t } = useTranslation();
  const [isSwitchOn, setIsSwitchOn] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const [SendOpen, setSendOpen] = useState(false);
  const [pendingSwitchState, setPendingSwitchState] = useState(true);
  const [message, setMessage] = useState('');
  const location = useLocation();
  const id = location.pathname.substring(11);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  const openSendModal = () => setSendOpen(true);
  const closeSendModal = () => setSendOpen(false);

  const handleSwitchClick = () => {
    setPendingSwitchState(!isSwitchOn);
    openModal();
  };

  const confirmToggleSwitch = async () => {
    setIsSwitchOn(pendingSwitchState);
    try {
      const response = await axios.put(
        `${client_block_put}?isBlock=${pendingSwitchState}&clientId=${id}`,
        config,
      );

      console.log('Switch toggled successfully:', response.data);
    } catch (error) {
      console.error('Error toggling switch:', error);
    }
    closeModal();
  };

  const handleSendMessage = async () => {
    console.log({
      clientId: ClientId,
      message: `${message}`,
    });

    try {
      const response = await axios.put(
        `${client_send_message}`,
        {
          clientId: ClientId,
          message: `${message}`,
        },
        config,
      );

      console.log('Message sent successfully:', response.data);
      toast.success('Message sent successfully');
      closeSendModal();
    } catch (error) {
      console.error('Error sending message:', error);
      toast.error('Failed to send message');
    }
  };

  return (
    <div className="flex flex-col lg:flex-row gap-4 mt-4">
      <div className="flex flex-col h-full justify-between gap-4">
        <Skeleton loading={isLoading} active>
          <div className="flex flex-col dark:bg-[#ffffffdf] text-black dark:text-black border-black w-full lg:w-[300px] shadow-3 p-3 rounded-xl">
            <div className="flex gap-3 items-center">
              <div className="bg-green-500 rounded-[50%] w-3 h-3"></div>
              <p>{StatusNow}</p>
            </div>
            <div className="flex items-center justify-center border-black p-1 rounded-full">
              <img
                src={ClientImg}
                alt="Client"
                className="w-40 border h-40 rounded-full"
              />
            </div>
            <div className="flex items-center mt-3 justify-between">
              <p className="text-gray-600">{t('Description')}:</p>
              <p className="text-gray-600">{turnover}</p>
            </div>
          </div>
        </Skeleton>
        <Skeleton loading={isLoading} active>
          <div className="flex flex-col dark:bg-[#ffffffdf] text-black dark:text-black border-black w-full lg:w-[300px] shadow-3 p-3 rounded-xl">
            <div className="flex items-center justify-between">
              <p className="text-black font-bold">{t('Status')}:</p>
              <div className="bg-green-500 px-6 rounded-xl font-bold">
                {Status}
              </div>
            </div>
            <div className="flex items-center justify-between mt-4">
              <p>{t('Block')}</p>
              <div onClick={handleSwitchClick}>
                <Switch isOn={isSwitchOn} handleToggle={() => {}} />
              </div>
            </div>
          </div>
        </Skeleton>
        <Skeleton loading={isLoading} active>
          <div className="flex flex-col dark:bg-[#ffffffdf] text-black dark:text-black border-black w-full lg:w-[300px] shadow-3 p-3 rounded-xl">
            <div className="flex items-center justify-between">
              <p className="text-black font-bold mb-2 mt-2">{t('Contacts')}:</p>
            </div>
            <div className="flex items-center justify-center w-[100%] h-[1px] bg-black"></div>
            <div className="flex items-center justify-between mt-4">
              <strong>{t('Phone')}:</strong>
              <p>{Number}</p>
            </div>
            <div className="flex items-center justify-between mt-4">
              <strong>{t('Telegram')}:</strong>
              <p>{Telegram}</p>
            </div>
            <div className="flex items-center justify-between mt-4">
              <strong>{t('Instagram')}:</strong>
              <p>{Instagram}</p>
            </div>
          </div>
        </Skeleton>
        <Skeleton loading={isLoading} active>
          <div className="flex flex-col dark:bg-[#ffffffdf] text-black dark:text-black border-black w-full lg:w-[300px] shadow-3 p-3 rounded-xl">
            <div className="flex items-center justify-between">
              <p className="text-black font-bold mb-2 mt-2">
                {t('Indicators')}:
              </p>
            </div>
            <div className="flex items-center justify-center w-[100%] h-[1px] bg-black"></div>
            <div className="flex items-center justify-between mt-4">
              <strong>{t('Completed Orders')}:</strong>
              <p>{CompOrders}</p>
            </div>
            <div className="flex items-center justify-between mt-4">
              <strong>{t('Cancelled Orders')}:</strong>
              <p>{rejectedOrderCount}</p>
            </div>
            <div className="flex items-center justify-between mt-4">
              <strong>{t('Clients')}:</strong>
              <p>{Clients}</p>
            </div>
            <div className="flex items-center justify-between mt-4">
              <strong>{t('Start Work')}:</strong>
              <p>{StartData}</p>
            </div>
          </div>
        </Skeleton>
      </div>
      <Skeleton loading={isLoading} active>
        <div className="bg-gray-100 dark:bg-[#ffffffdf] text-black dark:text-black p-4 shadow-4 flex flex-col justify-between pl-10 py-10 border-black rounded-xl w-full lg:w-[100%]">
          <div className="flex items-center justify-between">
            <p className="text-xl font-bold">{t('Profile')}:</p>
            <div
              onClick={openSendModal}
              className="bg-green-500 p-2 rounded-xl text-white px-3 cursor-pointer"
            >
              {t('Send Message')}
            </div>
          </div>
          <div className="w-[100%] bg-black h-[1px] flex items-center mb-4 mt-3"></div>
          <p className="mb-5">
            <strong>{t('Name')}:</strong> {ClientName}
          </p>
          <p className="mb-5">
            <strong>{t('Surname')}:</strong> {SurName}
          </p>
          <p className="mb-5">
            <strong>{t('Gender')}:</strong> {Gender}
          </p>
          <p className="mb-5">
            <strong>{t('Age')}:</strong> {Age}
          </p>
          <p className="mb-5">
            <strong>{t('Region')}:</strong> {Region}
          </p>
          <p className="mb-5">
            <strong>{t('City')}:</strong> {City}
          </p>
          <p className="mb-5">
            <strong>{t('Location')}:</strong> {Location}
          </p>
        </div>
      </Skeleton>
      <Modal isOpen={isOpen} onClose={closeModal}>
        <p className="text-2xl font-bold">{t('Modal_answer')}</p>
        <div className="flex items-center gap-2 justify-end mt-3">
          <Button key="back" onClick={closeModal}>
            {t('No')}
          </Button>
          <Button onClick={confirmToggleSwitch}>{t('Ok')}</Button>
        </div>
      </Modal>
      <Modal isOpen={SendOpen} onClose={closeSendModal}>
        <div className="w-[45rem]">
          <p className="text-2xl text-black dark:text-white">
            {t('Send message')}:
          </p>
          <TextArea
            className="mt-4"
            rows={4}
            placeholder={t('Enter your message')}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <div className="flex justify-center mt-2">
            <Button key="submit" type="primary" onClick={handleSendMessage} className='bg-boxdark px-12 '>
              {t('отправить')}
            </Button>
          </div>
        </div>
      </Modal>
      <Toaster position="top-center" reverseOrder={false} />
    </div>
  );
};

export default DetailClient;
