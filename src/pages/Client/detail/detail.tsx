import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import { Skeleton, Button, Input } from 'antd';
import { useTranslation } from 'react-i18next';
import Switch from '../../../components/settings/details/TableSwitcher';
import toast, { Toaster } from 'react-hot-toast';
import Modal from '../../../components/modals/modal';
import {
  client_block_put,
  client_full_data,
  client_send_message,
  getFileId,
} from '../../../helpers/api';
import userImg from '../../../images/user.png';
import DefaultLayout from '../../../layout/DefaultLayout';
import { config } from '../../../helpers/token';

const { TextArea } = Input;

const DetailMaster: React.FC = () => {
  const { t } = useTranslation();
  const location = useLocation();
  const [orderDetails, setOrderDetails] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSwitchOn, setIsSwitchOn] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [SendOpen, setSendOpen] = useState(false);
  const [pendingSwitchState, setPendingSwitchState] = useState(false);
  const [message, setMessage] = useState('');

  const id = location.pathname.substring(11);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(`${client_full_data}${id}`, config);
      const master = response.data.body;
      setOrderDetails(master);
      setIsSwitchOn(master.status !== 'BLOCKED');
      setPendingSwitchState(master.status !== 'BLOCKED');
      setIsLoading(false);
    } catch (error) {
      console.error('There was an error fetching the data!', error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [id]);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);
  const closeSendModal = () => setSendOpen(false);
  const openSendModal = () => {
    setMessage('');
    setSendOpen(true);
  };

  const handleSwitchClick = () => {
    setPendingSwitchState(!isSwitchOn);
    openModal();
  };

  const confirmToggleSwitch = async () => {
    try {
      await axios.put(
        `${client_block_put}`,
        {
          id: id,
          status: pendingSwitchState ? 'BLOCKED' : 'ACTIVE',
        },
        config,
      );
      setIsSwitchOn(pendingSwitchState);
      toast.success(t('Switch toggled successfully'));
      fetchData();
    } catch (error) {
      console.error('Error toggling switch:', error);
      toast.error(t('Error toggling switch'));
    }
    closeModal();
  };

  const handleSendMessage = async () => {
    if (
      message.trim() === '' ||
      message === '/' ||
      message === '&' ||
      message === `""` ||
      message === `"`
    ) {
      toast.error(t('Message cannot be empty'));
      return;
    }

    try {
      await axios.post(
        client_send_message,
        {
          clientId: id,
          masterId: null,
          adminId: null,
          message: message,
          messageStatus: 'MASTER_CLIENT_MESSAGE_FOR_WRITE',
          read: true,
        },
        config,
      );

      toast.success(t('Message sent successfully'));
      closeSendModal();
    } catch (error) {
      console.error('Error sending message:', error);
      toast.error(t('Failed to send message'));
    }
  };

  return (
    <DefaultLayout>
      <div>
        {isLoading ? (
          <p className="dark:text-white">Loading order details...</p>
        ) : orderDetails ? (
          <div className="flex flex-col lg:flex-row gap-4 mt-4">
            <div className="flex flex-col h-full justify-between gap-4">
              <Skeleton loading={isLoading} active>
                <div className="flex flex-col dark:bg-boxdark text-black dark:text-white border-black w-full lg:w-[300px] shadow-3 p-3 rounded-xl">
                  <div className="flex gap-3 items-center">
                    <div
                      className={`bg-${
                        orderDetails.StatusNow === 'ACTIVE' ? 'green' : 'red'
                      }-500 rounded-[50%] w-3 h-3`}
                    ></div>
                    <p>{orderDetails.chatStatus}</p>
                  </div>
                  <div className="flex items-center justify-center border-black p-1 rounded-full">
                    <img
                      src={
                        orderDetails.image
                          ? getFileId + orderDetails.image
                          : userImg
                      }
                      alt="Client"
                      className="w-40 border h-40 rounded-full"
                    />
                  </div>
                  <div className="flex items-center mt-3 justify-between">
                    <p className="text-gray-600">{t('Description')}:</p>
                    <p className="text-gray-600">
                      {orderDetails.turnover ?? 'Mavjud emas'}
                    </p>
                  </div>
                </div>
              </Skeleton>
              <Skeleton loading={isLoading} active>
                <div className="flex flex-col dark:bg-[#ffffffdf] dark:bg-boxdark dark:text-white border-black w-full lg:w-[300px] shadow-3 p-3 rounded-xl">
                  <div className="flex items-center justify-between">
                    <p className="font-bold">{t('Status')}:</p>
                    <div
                      className={`px-6 rounded-xl font-bold ${
                        orderDetails.status === 'BLOCKED'
                          ? 'bg-red-500'
                          : 'bg-green-500'
                      }`}
                    >
                      {orderDetails.status}
                    </div>
                  </div>
                  <div className="flex items-center justify-between mt-4 ">
                    <p>{t('Block')}</p>
                    <div onClick={handleSwitchClick}>
                      <Switch isOn={isSwitchOn} handleToggle={() => {}} />
                    </div>
                  </div>
                </div>
              </Skeleton>
              <Skeleton loading={isLoading} active>
                <div className="flex flex-col dark:bg-[#ffffffdf] text-black dark:bg-boxdark dark:text-white border-black w-full lg:w-[300px] shadow-3 p-3 rounded-xl">
                  <div className="flex items-center justify-between">
                    <p className="font-bold mb-2 mt-2">{t('Contacts')}:</p>
                  </div>
                  <div className="flex items-center justify-center w-[100%] h-[1px] bg-black dark:bg-white"></div>
                  <div className="flex items-center justify-between mt-4">
                    <strong>{t('Phone')}:</strong>
                    <p>{orderDetails.phoneNumber ?? 'Mavjud emas'}</p>
                  </div>
                  <div className="flex items-center justify-between mt-4 ">
                    <strong>{t('Telegram')}:</strong>
                    <p>{orderDetails.telegram ?? 'Mavjud emas'}</p>
                  </div>
                  <div className="flex items-center justify-between mt-4">
                    <strong>{t('Instagram')}:</strong>
                    <p>{orderDetails.instagram ?? 'Mavjud emas'}</p>
                  </div>
                </div>
              </Skeleton>
              <Skeleton loading={isLoading} active>
                <div className="flex flex-col dark:bg-[#ffffffdf] text-black w-full dark:bg-boxdark dark:text-white border-black lg:w-[300px] shadow-3 p-3 rounded-xl">
                  <div className="flex items-center justify-between">
                    <p className="font-bold mb-2 mt-2">{t('Indicators')}:</p>
                  </div>
                  <div className="flex items-center justify-center w-[100%] h-[1px] bg-black dark:bg-white"></div>
                  <div className="flex items-center justify-between mt-4">
                    <strong>{t('Completed Orders')}:</strong>
                    <p>{orderDetails.completedOrder ?? 'Mavjud emas'}</p>
                  </div>
                  <div className="flex items-center justify-between mt-4">
                    <strong>{t('Cancelled Orders')}:</strong>
                    <p>{orderDetails.canceledOrder ?? 'Mavjud emas'}</p>
                  </div>
                  <div className="flex items-center justify-between mt-4">
                    <strong>{t('Clients')}:</strong>
                    <p>{orderDetails.masterCount ?? 'Mavjud emas'}</p>
                  </div>
                  <div className="flex items-center justify-between mt-4">
                    <strong>{t('Start Work')}:</strong>
                    <p>{orderDetails.registrationDate ?? 'Mavjud emas'}</p>
                  </div>
                </div>
              </Skeleton>
            </div>
            <Skeleton loading={isLoading} active>
              <div className="bg-gray-100 text-black dark:bg-boxdark dark:text-white p-4 shadow-4 flex flex-col justify-between pl-10 py-10 border-black rounded-xl w-full lg:w-[100%]">
                <div className="flex items-center justify-between">
                  <p className="text-xl font-bold">{t('Profile')}:</p>
                  <div
                    onClick={openSendModal}
                    className="bg-green-500 p-2 rounded-xl text-white px-3 cursor-pointer"
                  >
                    {t('Send Message')}
                  </div>
                </div>
                <div className="w-[100%] bg-black dark:bg-white h-[1px] flex items-center mb-4 mt-3"></div>
                <p className="mb-5">
                  <strong>{t('Name')}:</strong>{' '}
                  {orderDetails.firstName ?? 'Mavjud emas'}
                </p>
                <p className="mb-5">
                  <strong>{t('Surname')}:</strong>{' '}
                  {orderDetails.lastName ?? 'Mavjud emas'}
                </p>
                <p className="mb-5">
                  <strong>{t('Gender')}:</strong>{' '}
                  {orderDetails.gender ?? 'Mavjud emas'}
                </p>
                <p className="mb-5">
                  <strong>{t('Age')}:</strong>{' '}
                  {orderDetails.age ?? 'Mavjud emas'}
                </p>
                <p className="mb-5">
                  <strong>{t('Region')}:</strong>{' '}
                  {orderDetails.region ?? 'Mavjud emas'}
                </p>
                <p className="mb-5">
                  <strong>{t('City')}:</strong>{' '}
                  {orderDetails.district ?? 'Mavjud emas'}
                </p>
                <p className="mb-5">
                  <strong>{t('Location')}:</strong>{' '}
                  {orderDetails.address ?? 'Manzil Mavjud emas'}
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
            <Modal isOpen={SendOpen} onClose={closeSendModal} mt={'w-[70%]'}>
              <div className="w-[100%]">
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
                  <Button
                    key="submit"
                    type="primary"
                    onClick={handleSendMessage}
                    className="bg-boxdark px-12 dark:text-white"
                  >
                    {t('Send')}
                  </Button>
                </div>
              </div>
            </Modal>
            <Toaster position="top-center" reverseOrder={false} />
          </div>
        ) : (
          <p className="dark:text-white">No order details found.</p>
        )}
      </div>
    </DefaultLayout>
  );
};

export default DetailMaster;
