import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { master_url } from '../../helpers/api';
import { config } from '../../helpers/token';
import axios from 'axios';
import { useTranslation } from 'react-i18next';
import MasterDetail from '../../components/MastervsOrder/masterDetail';
import DefaultLayout from '../../layout/DefaultLayout';
import MasterCardInfo from '../../components/MasterCard/MasterCardR';

const DetailMaster: React.FC = () => {
  const { t } = useTranslation();
  const location = useLocation();
  const [orderDetails, setOrderDetails] = useState<any>(null);

  const id = location.pathname.substring(8);
  console.log(id);
  useEffect(() => {
    axios
      .get(`${master_url}?page=0&size=10`, config)
      .then((response) => {
        const master = response.data.body.object;

        // Find the order that matches the ID from the URL
        const matchingOrder = master.find((order: any) => order.id === id);
        if (matchingOrder) {
          setOrderDetails(matchingOrder);
        }
      })
      .catch((error) => {
        console.error('There was an error fetching the data!', error);
      });
  }, [id]);

  return (
    <div>
      <DefaultLayout>
        <div className="shadow-3 dark:bg-[#ffffffdf] dark:text-black border-black rounded-xl border-solid border-1 p-3 flex items-center justify-between w-[100%] dark:bg-gray-800 dark:border-gray-700">
          <p className="dark:text-black">Детали записи</p>
          <div className="rounded-xl text-white bg-[#ffa723] p-1 px-4 flex items-center justify-center">
            {t('detail_payment_type')}
          </div>
        </div>
        {orderDetails ? (
          <div>
            <div className="shadow-3 dark:bg-[#ffffffdf] dark:text-black mt-3 border-black rounded-xl border-solid border-1 p-3 flex flex-col lg:flex-row items-center justify-between w-[100%] dark:bg-gray-800 dark:border-gray-700">
              <div className="flex flex-col lg:flex-row items-center gap-4 lg:gap-10">
                <p className="font-bold text-xl dark:text-black">
                  {orderDetails.serviceCategory}
                </p>
                <p className="dark:text-gray-300">{orderDetails.startedWork}</p>
                <div className="flex items-center gap-2 lg:gap-3 dark:text-gray-300">
                  <p>{orderDetails.orderFrom}</p>
                  <p>:</p>
                  <p>{orderDetails.orderTo}</p>
                </div>
              </div>
              <div className="mt-2 lg:mt-0 rounded-xl bg-[#0aa8da] p-1 px-4 flex items-center justify-center">
                {t('detail_type')}
              </div>
            </div>
            <MasterCardInfo
              OrderData={orderDetails.orderDate}
              OrderEnterTime={orderDetails.orderFrom}
              OrderEndTime={orderDetails.orderTo}
              price={orderDetails.price}
              Prepayment={orderDetails.prePayment}
              Paid={orderDetails.paid}
              PaymentType={
                orderDetails.paymentType === null
                  ? 'null'
                  : orderDetails.paymentType
              }
              Duration={orderDetails.serviceTime}
              RecNotification={
                orderDetails.orderRecordingTime === null
                  ? 'Null'
                  : orderDetails.orderRecordingTime
              }
              ToPay={orderDetails.toPay}
              MasterName={orderDetails.masterFullName}
              MasterType={orderDetails.serviceName}
              MasterImg={orderDetails.masterPhotoPath}
              definitionType={
                orderDetails.masterPhone === undefined
                  ? 'Mavjud emas'
                  : orderDetails.masterPhone
              }
              ClientName={orderDetails.clientFullName}
              ClientPhoto={orderDetails.clientPhotoPath}
              ClientNumber={orderDetails.clientPhone}
              Status={orderDetails.status}
            />
          </div>
        ) : (
          <p className="dark:text-white">Loading order details...</p>
        )}
      </DefaultLayout>
    </div>
  );
};

export default DetailMaster;
