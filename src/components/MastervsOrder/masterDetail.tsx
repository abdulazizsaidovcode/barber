import React from 'react';

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
  MasterPhone: string;
  ClientName: string;
  ClientPhoto: string;
  ClientNumber: string;
}

const MasterDetail: React.FC<Props> = ({
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
  MasterType,
  MasterImg,
  MasterPhone,
  ClientName,
  ClientPhoto,
  ClientNumber,
}) => {
  return (
    <div className="flex gap-4 mt-4 ">
      <div className="flex flex-col h-[100%] justify-between gap-4">
        <div className="flex flex-col border-1 dark:bg-[#ffffffdf] text-black dark:text-black  border-black w-[300px] shadow-3 p-3 rounded-xl ">
          <div className="flex items-center justify-between">
            <p>Master</p>
            <p>{MasterName}</p>
          </div>
          <div className="flex items-center justify-center border-1 border-black p-1 rounded-[50%]">
            <img
              src={MasterImg}
              alt="Master"
              className="w-40 border-1  h-40 rounded-[50%]"
            />
          </div>
          <div className="flex items-center justify-center ">
            <p className="text-gray-600">{MasterPhone}</p>
          </div>
        </div>
        <div className="flex flex-col border-1 dark:bg-[#ffffffdf]  text-black dark:text-black border-black w-[300px] shadow-3 p-3 rounded-xl ">
          <div className="flex items-center justify-between">
            <p>Master</p>
            <p>{ClientName}</p>
          </div>
          <div className="flex items-center justify-center border-1 border-black p-1 rounded-[50%]">
            <img
              src={ClientPhoto}
              alt="Master"
              className="w-40 border-1  h-40 rounded-[50%]"
            />
          </div>
          <div className="flex items-center justify-center ">
            <p className="text-gray-600">{ClientNumber}</p>
          </div>
        </div>
      </div>
      <div className="bg-gray-100 dark:bg-[#ffffffdf]  text-black dark:text-black p-4 shadow-4 border-1 flex flex-col justify-between pl-10 py-5  border-black rounded-xl w-[100%] ">
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
    </div>
  );
};

export default MasterDetail;
