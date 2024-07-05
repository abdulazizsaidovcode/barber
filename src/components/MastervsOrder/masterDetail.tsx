import React, { useState } from 'react';
import { Skeleton, Button } from 'antd';
import Modal from '../modals/modal';
import { useTranslation } from 'react-i18next';

interface Props {
  OrderData: any;
  OrderEnterTime: string;
  OrderEndTime: string;
  price: any;
  Prepayment: any;
  Paid: any;
  PaymentType: any;
  Duration: string;
  RecNotification: string;
  ToPay: any;
  MasterName: string;
  MasterImg: string;
  MasterType: string;
  ClientName: string;
  ClientPhoto: string;
  ClientNumber: string;
  Status: string;
  MasterNumber: any;
  isLoading: boolean;
  masterFeedback: any;
  MasterStatus: any;
}

const MasterCardInfo: React.FC<Props> = ({
  OrderData,
  OrderEnterTime,
  OrderEndTime,
  price,
  Prepayment,
  Paid,
  PaymentType,
  Duration,
  RecNotification,
  ToPay,
  MasterNumber,
  MasterName,
  MasterImg,
  ClientName,
  ClientNumber,
  isLoading,
  ClientPhoto,
  MasterStatus,
}) => {
  const { t } = useTranslation();
  const [isSwitchOn, setIsSwitchOn] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const closeModal = () => setIsOpen(false);

  const toggleSwitch = () => {
    setIsSwitchOn(!isSwitchOn);
  };

  return (
    <div className="flex flex-col lg:flex-row gap-4 mt-4">
      <div className="flex flex-col h-full justify-between gap-4">
        <Skeleton loading={isLoading} active>
          <div className="flex flex-col dark:bg-[#ffffffdf] text-black dark:text-black border-black w-full lg:w-[300px] shadow-3 p-3 rounded-xl">
            <div className="flex items-center justify-between">
              <p className="font-bold">Master:</p>
              <p>{MasterName}</p>
            </div>
            <div className="flex items-center justify-center border-black p-1 rounded-full">
              <img
                src={MasterImg}
                alt="Master"
                className="w-40 border h-40 rounded-full"
              />
            </div>
            <div className="flex items-center mt-3 flex-col gap-1 justify-center">
              <p className="text-gray-600">{MasterStatus}</p>
              <p className="text-gray-600">{MasterNumber}</p>
            </div>
          </div>
        </Skeleton>
        <Skeleton loading={isLoading} active>
          <div className="flex flex-col dark:bg-[#ffffffdf] text-black dark:text-black border-black w-full lg:w-[300px] shadow-3 p-3 rounded-xl">
            <div className="flex items-center justify-between">
              <p className="font-bold">Client:</p>
              <p>{ClientName}</p>
            </div>
            <div className="flex items-center justify-center border-black p-1 rounded-full">
              <img
                src={ClientPhoto}
                alt="Master"
                className="w-40 border h-40 rounded-full"
              />
            </div>
            <div className="flex items-center mt-3 flex-col gap-1 justify-center">
              <p className="text-gray-600">{ClientNumber}</p>
            </div>
          </div>
        </Skeleton>
      </div>
      <div></div>
      <Skeleton loading={isLoading} active>
        <div className="bg-gray-100 dark:bg-[#ffffffdf] text-black dark:text-black p-4 shadow-4 flex flex-col justify-between pl-10 py-5 border-black rounded-xl w-full lg:w-[100%]">
          <p className="mb-2">
            <strong>Дата записи:</strong> {OrderData}
          </p>
          <p className="mb-2">
            <strong>Время записи:</strong> {OrderEnterTime} : {OrderEndTime}
          </p>
          <p className="mb-2">
            <strong>Стоимость:</strong> {price}
          </p>
          <p className="mb-2">
            <strong>Предоплата:</strong> {Prepayment}
          </p>
          <p className="mb-2">
            <strong>Оплачено:</strong> {Paid}
          </p>
          <p className="mb-2">
            <strong>Тип оплаты:</strong> {PaymentType}
          </p>
          <p className="mb-2">
            <strong>Длительность:</strong> {Duration}
          </p>
          <p className="mb-2">
            <strong>Уведомление о записи:</strong> {RecNotification}
          </p>

          <p className="mt-4 text-xl text-orange-600">
            <strong>К оплате:</strong> {ToPay}
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
    </div>
  );
};

export default MasterCardInfo;
