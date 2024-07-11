import React, { useState } from 'react';
import { Skeleton, Rate, Input } from 'antd';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import axios from 'axios';
import {
  master_block_put,
  master_send_message_master
} from '../../helpers/api';
import { config } from '../../helpers/token';
import Switch from './../settings/details/TableSwitcher';
import Modal from '../modals/modal';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { IoMdCloseCircleOutline } from 'react-icons/io';
import { Buttons } from '../buttons';

const { TextArea } = Input;

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
  Specialization: string;
  scheduleType: string;
  StatusNow: string;
  getFunc: () => void;
};

const MasterCardInfo: React.FC<MasterCardInfoProps> = ({
                                                         getFunc,
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
                                                         StatusNow
                                                       }) => {
  const { t } = useTranslation();
  const location = useLocation();
  const idMaster = location.pathname.substring(8);

  const [isSwitchOn, setIsSwitchOn] = useState(Status == 'ACTIVE');
  const [isOpen, setIsOpen] = useState(false);
  const [SendOpen, setSendOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [pendingSwitchState, setPendingSwitchState] = useState(true);
  const [isImageModal, setIsImageModal] = useState<boolean>(false);
  const [imageID, setImageID] = useState<string>('');

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);
  const closeSendModal = () => setSendOpen(false);
  const openIsImageModal = () => setIsImageModal(!isImageModal);

  const handleSwitchClick = () => {
    setPendingSwitchState(!isSwitchOn);
    openModal();
  };

  const confirmToggleSwitch = async () => {
    setIsSwitchOn(pendingSwitchState);
    try {
      const status = isSwitchOn ? 'BLOCKED' : 'ACTIVE';
      await axios.put(master_block_put, { id: idMaster, status }, config);
      toast.success(t('Switch_toggled_successfully'));
      setIsSwitchOn(!isSwitchOn);
      getFunc();
      // setTimeout(() => {
      //   window.location.href = `/master/${idMaster}`;
      // }, 2000);
    } catch (error) {
      toast.error(t('Error_toggling_switch'));
    }
    closeModal();
  };

  const sendMessage = async () => {
    try {
      await axios.post(
        master_send_message_master,
        {
          clientId: null,
          masterId: idMaster,
          adminId: null,
          message,
          messageStatus: 'ADMIN_MASTER_MESSAGE_FOR_WRITE',
          read: true
        },
        config
      );
      toast.success(t('Message_sent_successfully'));
      closeSendModal();
    } catch (error) {
      toast.error(t('Failed_to_send_message'));
    }
  };

  const handleClickSendBtn = () => {
    setMessage('');
    setSendOpen(true);
  };

  const handlePostBtn = () => {
    if (!message) {
      toast.error(t('information_not_entered'));
    } else {
      sendMessage();
    }
  };

  return (
    <div className="flex flex-col lg:flex-row-reverse gap-4 mt-4">
      <div className="w-full flex flex-col items-center justify-center gap-4">
        <Skeleton loading={isLoading} active>
          <div
            className="bg-gray-100 dark:bg-boxdark text-black dark:text-white p-4 shadow-4 flex flex-col justify-between pl-10 py-10 border-black rounded-xl w-full lg:w-full">
            <div className="flex items-center justify-between">
              <p className="text-xl font-bold">{t('Profile')}:</p>
              <div
                onClick={handleClickSendBtn}
                className="bg-green-500 p-2 rounded-xl text-white px-3 cursor-pointer"
              >
                {t('Send_Message')}
              </div>
            </div>
            <div className="w-full bg-black dark:bg-white border flex items-center mb-4 mt-3"></div>
            <p className="mb-5">
              <strong>{t('Name')}:</strong> {MasterName}
            </p>
            <p className="mb-5">
              <strong>{t('Surname')}:</strong> {SurName}
            </p>
            <p className="mb-5">
              <strong>{t('User_Name')}:</strong> {UserName}
            </p>
            <p className="mb-5">
              <strong>{t('Gender')}:</strong> {Gender}
            </p>
            <p className="mb-5">
              <strong>{t('Age')}:</strong> {Age}
            </p>
            <p className="mb-5">
              <strong>{t('Regions')}:</strong> {Region}
            </p>
            <p className="mb-5">
              <strong>{t('City')}:</strong> {City}
            </p>
            <p className="mb-5">
              <strong>{t('Location')}:</strong> {Location}
            </p>
          </div>
        </Skeleton>
        <Skeleton loading={isLoading} active>
          <div
            className="bg-gray-100 dark:bg-boxdark text-black dark:text-white p-4 shadow-4 flex flex-col justify-between pl-10 py-10 border-black rounded-xl w-full lg:w-full">
            <div className="flex items-center">
              <p className="text-xl font-bold">
                {t('Profession_information')}:
              </p>
            </div>
            <div className="w-full bg-black dark:bg-white border flex items-center mb-4 mt-3"></div>
            <p className="mb-5">
              <strong>{t('Place_of_work')}:</strong> {PlaceOfWork}
            </p>
            <p className="mb-5">
              <strong>{t('Direction_by_gender')}:</strong> {GenderType}
            </p>
            <p className="mb-5">
              <strong>{t('Service_category')}:</strong> {ServiceCategory}
            </p>
            <p className="mb-5">
              <strong>{t('Specialization')}:</strong> {Specialization}
            </p>
            <p className="mb-5">
              <strong>{t('Schedule_Type')}:</strong> {scheduleType}
            </p>
          </div>
        </Skeleton>
      </div>
      <div className="flex flex-col h-full justify-between gap-4">
        <Skeleton loading={isLoading} active>
          <div
            className="flex flex-col dark:bg-boxdark text-black dark:text-white border-black w-full lg:w-[300px] shadow-3 p-3 rounded-xl">
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
                src={MasterImg}
                className={'w-40 border h-40 rounded-full object-cover hover:cursor-pointer'}
                effect="blur"
                onClick={() => {
                  openIsImageModal();
                  setImageID(MasterImg);
                }}
              />
            </div>
            <div className="flex items-center mt-3 justify-between">
              <p className="text-gray-600">{t('Rate')}:</p>
              <p className="text-gray-600">{definitionType}</p>
            </div>
          </div>
        </Skeleton>
        <Skeleton loading={isLoading} active>
          <div
            className="flex flex-col dark:bg-boxdark text-black dark:text-white border-black w-full lg:w-[300px] shadow-3 p-3 rounded-xl">
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
            <div className="flex items-center justify-between mt-4">
              <p>{Status == 'BLOCKED' ? 'Blokdan Chiqarish' : t('Block')}</p>
              <div onClick={handleSwitchClick}>
                <Switch isOn={isSwitchOn} handleToggle={() => {
                }} />
              </div>
            </div>
          </div>
        </Skeleton>
        <Skeleton loading={isLoading} active>
          <div
            className="flex flex-col dark:bg-boxdark text-black dark:text-white border-black w-full lg:w-[300px] shadow-3 p-3 rounded-xl">
            <div className="flex items-center justify-between">
              <p className="text-black dark:text-white font-bold mb-2 mt-2">
                {t('Contacts')}:
              </p>
              <p className="text-black dark:text-white font-bold mb-2 mt-2">
                {t('Contacts')}:
              </p>
            </div>
            <div className="flex items-center justify-center w-full h-1 bg-black dark:bg-white"></div>
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
          <div
            className="flex flex-col dark:bg-boxdark text-black dark:text-white border-black w-full lg:w-[300px] shadow-3 p-3 rounded-xl">
            <div className="flex items-center justify-between">
              <p className="text-black dark:text-white font-bold mb-2 mt-2">
                {t('Indicators')}:
              </p>
              <p className="text-black dark:text-white font-bold mb-2 mt-2">
                {t('Indicators')}:
              </p>
            </div>
            <div className="flex items-center justify-center w-full h-1 bg-black dark:bg-white"></div>
            <div className="flex items-center justify-between mt-4">
              <strong>{t('Completed_Orders')}:</strong>
              <p>{CompOrders}</p>
            </div>
            <div className="flex items-center justify-between mt-4">
              <strong>{t('Cancelled_orders')}:</strong>
              <p>{rejectedOrderCount}</p>
            </div>
            <div className="flex items-center justify-between mt-4">
              <strong>{t('Clients')}:</strong>
              <p>{Clients}</p>
            </div>
            <div className="flex items-center justify-between mt-4">
              <strong>{t('Level')}:</strong>
              <Rate disabled defaultValue={Level} />
            </div>
            <div className="flex items-center justify-between mt-4">
              <strong>{t('Start_work')}:</strong>
              <p>{StartData}</p>
            </div>
          </div>
        </Skeleton>
      </div>
      <Modal isOpen={isOpen} onClose={closeModal} mt="lg:w-[30%] w-[70%]">
        <div className="w-full dark:text-white text-black">
          <p className="text-2xl md:text-lg font-bold">
            {Status === 'BLOCKED'
              ? 'Master Blokdan chiqarilsinmi'
              : t('Modal_answer')}
          </p>
          <div className="flex items-center gap-2 justify-end mt-3">
            <Buttons onClick={closeModal}>
              {t('No')}
            </Buttons>
            <Buttons onClick={confirmToggleSwitch}>{t('Ok')}</Buttons>
          </div>
        </div>
      </Modal>
      <Modal isOpen={SendOpen} onClose={closeSendModal} mt="w-[70%]">
        <div className="w-full">
          <p className="text-2xl text-black dark:text-white">
            {t('Send_Message')}:
          </p>
          <TextArea
            required
            className="mt-4"
            rows={4}
            placeholder="Enter your message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <div className="flex items-center justify-center mt-5">
            <Buttons onClick={handlePostBtn} bWidth={`w-40`}>{t('Send')}</Buttons>
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
          <div className={`w-[85vw] h-[90vh] flex justify-center items-center`}>
            <LazyLoadImage
              alt="img"
              src={imageID}
              className={'w-full h-full object-cover'}
              effect="blur"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default MasterCardInfo;
