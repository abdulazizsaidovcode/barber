import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import { useTranslation } from 'react-i18next';
import userImg from '../../../images/user.png';
import { get_orders_list, getFileId } from '../../../helpers/api';
import { config } from '../../../helpers/token'; // Correct import for config
import MasterCardInfo from '../../../components/MastervsOrder/masterDetail';

const Rejacted: React.FC<{ status: string }> = ({ status }) => {
  const { t } = useTranslation();
  const location = useLocation();
  const [orderDetails, setOrderDetails] = useState<any>(null);

  const id = location.pathname.substring(18);

  useEffect(() => {
    axios
      .get(`${get_orders_list}?status=COMPLETED&page=0&size=10`, config)
      .then((response) => {
        const orders = response.data.body.object;
        const matchingOrder = orders.find((order: any) => order.orderId === id);
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
      {orderDetails ? (
        <div>
          <div className="shadow-3 dark:bg-[#ffffffdf] dark:text-black border-black rounded-xl border-solid border-1 p-3 flex items-center justify-between w-[100%] dark:bg-gray-800 dark:border-gray-700">
            <p className="dark:text-black">Детали записи</p>
            <div className="rounded-xl text-white bg-[#ffa723] p-1 px-4 flex items-center justify-center">
              {status}
            </div>
          </div>
          <div className="shadow-3 dark:bg-[#ffffffdf] dark:text-black mt-3 border-black rounded-xl border-solid border-1 p-3 flex flex-col lg:flex-row items-center justify-between w-[100%] dark:bg-gray-800 dark:border-gray-700">
            <div className="flex flex-col lg:flex-row items-center gap-4 lg:gap-10">
              <p className="font-bold text-xl dark:text-black">
                {orderDetails.serviceName}
              </p>
              <p className="dark:text-gray-300">{orderDetails.orderDate}</p>
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
              !orderDetails.paymentType || orderDetails.paymentType.length === 0
                ? 'Mavjud emas'
                : orderDetails.paymentType
            }
            Duration={orderDetails.serviceTime}
            RecNotification={
              orderDetails.recordDurationTime === null
                ? 'Mavjud emas'
                : orderDetails.recordDurationTime
            }
            MasterNumber={orderDetails.masterPhone}
            MasterStatus={orderDetails.masterSpecialist}
            Status=""
            isLoading={false}
            ToPay={orderDetails.toPay}
            MasterName={orderDetails.masterFullName}
            MasterType={orderDetails.serviceName}
            MasterImg={
              orderDetails.masterPhotoId
                ? `${getFileId}${orderDetails.masterPhotoId}`
                : userImg
            }
            ClientName={orderDetails.clientFullName}
            ClientPhoto={`${getFileId}${orderDetails.clientPhotoId}`}
            ClientNumber={orderDetails.clientPhone}
            masterFeedback={orderDetails.masterFeedback}
          />
        </div>
      ) : (
        <p className="dark:text-white">Loading order details...</p>
      )}
    </div>
  );
};

export default Rejacted;
