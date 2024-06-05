import React, { useState } from 'react';
import Switch from './../settings/details/TableSwitcher';
import Modal from '../modals/modal';
import { useTranslation } from 'react-i18next';
import Buttons from './../../pages/UiElements/Buttons';
import { Button } from 'antd';

interface Props {
  OrderData: string;
  OrderEnterTime: string;
  OrderEndTime: string;
  price: string;
  Prepayment: string;
  Paid: string;
  PaymentType: string;
  Duration: string;
  RecNotification: string;
  ToPay: string;
  MasterName: string;
  MasterType: string;
  MasterImg: string;
  definitionType: string;
  ClientName: string;
  ClientPhoto: string;
  ClientNumber: string;
  Status: string;
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
  MasterName,

  MasterImg,
  definitionType,
  Status,
}) => {
  const { t } = useTranslation();
  const [isSwitchOn, setIsSwitchOn] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  const toggleSwitch = () => {
    setIsSwitchOn(!isSwitchOn);
  };

  return (
    <div className="flex flex-col lg:flex-row gap-4 mt-4">
      <div className="flex flex-col h-full justify-between gap-4">
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
      </div>
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
        <p className="mt-4 text-xl text-yellow-600">
          <strong>К оплате:</strong> {ToPay}
        </p>
      </div>
      <Modal isOpen={isOpen} onClose={closeModal}>
        <p className="text-2xl font-bold">{t('Modal_answer')}</p>
        <div className="flex items-center justify-end  mt-10  gap-4">
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
