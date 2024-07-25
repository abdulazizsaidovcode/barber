import React, { useState, useCallback } from 'react';
import { Skeleton, Input } from 'antd';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import axios from 'axios';
import { client_block_put, client_send_message } from '../../helpers/api';
import { config } from '../../helpers/token';
import Switch from '../settings/details/TableSwitcher';
import Modal from '../modals/modal';
import { Buttons } from '../buttons';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { IoMdCloseCircleOutline } from 'react-icons/io';

const { TextArea } = Input;

type MasterCardInfoProps = {
  ClientName: string;
  ClientImg: string;
  isLoading: any;
  SurName: string;
  Location: string;
  Gender: string;
  Age: string;
  Region: string;
  City: string;
  Number: string;
  Telegram: string;
  Instagram: string;
  turnover: string;
  CompOrders: string;
  rejectedOrderCount: string;
  Clients: string;
  StartData: string;
  Status: string;
  ServiceCategory: string[];
  StatusNow: string;
   getFunc: () => void;
};

const MasterCardInfo: React.FC<MasterCardInfoProps> = ({
  ClientName,
  ClientImg,
  turnover,
  getFunc,
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
  Status,
  StatusNow,
}) => {
  const { t } = useTranslation();
  const location = useLocation();
  const idMaster = location.pathname.substring(11);

  const [isSwitchOn, setIsSwitchOn] = useState(Status === 'ACTIVE');
  const [isOpen, setIsOpen] = useState(false);
  const [sendOpen, setSendOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [pendingSwitchState, setPendingSwitchState] = useState(false);
  const [isImageModal, setIsImageModal] = useState<boolean>(false);
  const [imageID, setImageID] = useState<string>('');

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);
  const closeSendModal = () => setSendOpen(false);

  const handleSwitchClick = () => {
    setPendingSwitchState(!isSwitchOn);
    openModal();
  };

  const confirmToggleSwitch = useCallback(async () => {
    setIsSwitchOn(pendingSwitchState);
    try {
      const status = isSwitchOn ? 'BLOCKED' : 'ACTIVE';
      await axios.put(
        `${client_block_put}`,
        { id: idMaster, status: status },
        config,
      );
      getFunc();
      toast.success(t('Switch toggled successfully'));
      setIsSwitchOn(!isSwitchOn);
    } catch (error) {
      toast.error(t('Error toggling switch'));
    }
    closeModal();
  }, [isSwitchOn, pendingSwitchState, idMaster, t]);

  const sendMessage = useCallback(async () => {
    try {
      await axios.post(
        client_send_message,
        {
          clientId: idMaster,
          masterId: null,
          adminId: null,
          message: message,
          messageStatus: 'ADMIN_MASTER_MESSAGE_FOR_WRITE',
          read: true,
        },
        config,
      );
      toast.success(t('Message sent successfully'));
      closeSendModal();
    } catch (error) {
      toast.error(t('Failed to send message'));
    }
  }, [idMaster, message, t]);

  const handleClickSendBtn = () => {
    setMessage('');
    setSendOpen(true);
  };

  const handlePostBtn = () => {
    if (!message) {
      toast.error(t('Information not entered'));
    } else {
      sendMessage();
    }
  };

  const openIsImageModal = () => setIsImageModal(!isImageModal);

  return (
    <div className="flex flex-col lg:flex-row-reverse gap-4 mt-4">
      <div className="w-full flex h-full flex-col items-center justify-center gap-4">
        <Skeleton loading={isLoading} active>
          <div className="bg-gray-100 dark:bg-boxdark text-black dark:text-white p-4 shadow-4 flex flex-col justify-between pl-10 py-10 border-black rounded-xl w-full lg:w-full">
            <div className="flex items-center justify-between">
              <p className="text-xl font-bold">{t('Profile')}:</p>
              <div
                onClick={handleClickSendBtn}
                className="bg-green-500 p-2 rounded-xl text-white px-3 cursor-pointer"
              >
                {t('Send Message')}
              </div>
            </div>
            <div className="w-full bg-black dark:bg-white border flex items-center mb-10 mt-3"></div>
            <p className="mb-10">
              <strong>{t('Name')}:</strong> {ClientName}
            </p>
            <p className="mb-10">
              <strong>{t('Surname')}:</strong> {SurName}
            </p>

            <p className="mb-10">
              <strong>{t('Gender')}:</strong> {Gender}
            </p>
            <p className="mb-10">
              <strong>{t('turnover')}:</strong> {turnover}
            </p>
            <p className="mb-10">
              <strong>{t('Age')}:</strong> {Age}
            </p>
            <p className="mb-10">
              <strong>{t('Region')}:</strong> {Region}
            </p>
            <p className="mb-10">
              <strong>{t('City')}:</strong> {City}
            </p>
            <p className="mb-10">
              <strong>{t('Location')}:</strong> {Location}
            </p>
          </div>
        </Skeleton>
      </div>
      <div className="flex flex-col h-full justify-between gap-4">
        <Skeleton loading={isLoading} active>
          <div className="flex flex-col dark:bg-boxdark text-black dark:text-white border-black w-full lg:w-[300px] shadow-3 p-3 rounded-xl">
            <div className="flex items-center gap-4">
              <div
                className={`rounded-full w-2 h-2 font-bold ${
                  StatusNow === 'OFFLINE' ? 'bg-red-500' : 'bg-green-500'
                }`}
              ></div>
              <p>{StatusNow}</p>
            </div>
            <div className="flex items-center justify-center border-black p-1 rounded-full">
              <LazyLoadImage
                alt="img"
                src={ClientImg}
                className={'w-40 border h-40 rounded-full object-cover hover:cursor-pointer'}
                effect="blur"
                onClick={() => {
                  openIsImageModal();
                  setImageID(ClientImg);
                }}
              />
            </div>
            <div className="flex items-center mt-3 justify-between">
              <p className="text-gray-600">{t('Rate')}:</p>
              <p className="text-gray-600">{StatusNow}</p>
            </div>
          </div>
        </Skeleton>
        <Skeleton loading={isLoading} active>
          <div className="flex flex-col dark:bg-boxdark text-black dark:text-white border-black w-full lg:w-[300px] shadow-3 p-3 rounded-xl">
            <div className="flex items-center justify-between">
              <p className="text-black dark:text-white font-bold">
                {t('Status')}:
              </p>
              <div
                className={`px-6 rounded-xl font-bold ${
                  Status === 'BLOCKED' ? 'bg-red-500' : 'bg-green-500'
                } text-white`}
              >
                {Status}
              </div>
            </div>
            <div className="flex items-center border bg-black dark:bg-white mt-2 mb-1"></div>
            <div className="flex items-center justify-between mt-4">
              <p>{Status === 'BLOCKED' ? t('Unblock') : t('Block')}</p>
              <div onClick={handleSwitchClick}>
                <Switch isOn={isSwitchOn} handleToggle={() => {}} />
              </div>
            </div>
          </div>
        </Skeleton>

        <Skeleton loading={isLoading} active>
          <div className="flex flex-col dark:bg-boxdark text-black dark:text-white border-black w-full lg:w-[300px] shadow-3 p-3 rounded-xl">
            <div className="flex items-center justify-between">
              <p className="text-black font-bold mb-2 mt-2">{t('Contacts')}:</p>
            </div>
            <div className="flex items-center justify-center w-full border bg-black dark:bg-white"></div>
            <div className="flex items-center justify-between mt-4">
              <strong>{t('Phone')} :</strong>
              <p>{Number}</p>
            </div>
            <div className="flex items-center justify-between mt-4">
              <strong>{t('Telegram')} :</strong>
              <p>{Telegram}</p>
            </div>
            <div className="flex items-center justify-between mt-4">
              <strong>{t('Instagram')} :</strong>
              <p>{Instagram}</p>
            </div>
          </div>
        </Skeleton>

        <Skeleton loading={isLoading} active>
          <div className="flex flex-col dark:bg-boxdark text-black dark:text-white border-black w-full lg:w-[300px] shadow-3 p-3 rounded-xl">
            <div className="flex items-center justify-between">
              <p className="text-black font-bold mb-2 mt-2">
                {t('Indicators')}:
              </p>
            </div>
            <div className="flex items-center justify-center w-full border bg-black dark:bg-white"></div>
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
      <Modal isOpen={isOpen} onClose={closeModal} mt="lg:w-[30%] w-[70%]">
        <div className="w-full dark:text-white text-black">
          <p className="text-2xl md:text-lg font-bold">
            {Status === 'BLOCKED' ? t('Unblock Master') : t('Modal answer')}
          </p>
          <div className="flex items-center gap-2 justify-end mt-3">
            <Buttons onClick={closeModal}>
              {t('No')}
            </Buttons>
            <Buttons onClick={confirmToggleSwitch}>
              {t('Ok')}
            </Buttons>
          </div>
        </div>
      </Modal>
      <Modal isOpen={sendOpen} onClose={closeSendModal} mt="w-[70%]">
        <div className="w-full">
          <p className="text-2xl text-black dark:text-white">
            {t('Send Message')}:
          </p>
          <TextArea
            required
            className="mt-4"
            rows={4}
            placeholder={t('Enter your message')}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <div className="flex items-center justify-center mt-5">
            <Buttons onClick={handlePostBtn} bWidth={`w-40`}>
              {t('Send')}
            </Buttons>
          </div>
        </div>
      </Modal>

      {isImageModal && (
        <div
          className={`fixed inset-0 z-999 flex items-center justify-center w-full h-full bg-black-2 bg-opacity-50`}
          onClick={openIsImageModal}
        >
          <p className={`absolute top-10 right-10 text-white`}>
            <IoMdCloseCircleOutline
              size={30}
              className="dark:text-white text-black hover:cursor-pointer opacity-80 duration-200"
              onClick={openIsImageModal} />
          </p>
          <div className="flex justify-center items-center">
            <LazyLoadImage
              alt="img"
              src={imageID}
              className="object-contain"
              effect="blur"
              style={{ maxWidth: '700px', maxHeight: '500px' }}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default MasterCardInfo;
