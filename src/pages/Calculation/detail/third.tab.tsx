import { useTranslation } from 'react-i18next';
import { getFileId } from '../../../helpers/api';
import orderStore from '../../../helpers/state_managment/order/orderStore';
import userImg from '../../../images/user.png';
import DetailOrder from '../../../components/orders/detail';

const FirstDetail: React.FC = () => {
  const { t } = useTranslation();
  const { orderDetail } = orderStore();

  return (
    <>
      {orderDetail ? (
        <div>
          <div className="shadow-3 dark:bg-[#ffffffdf] dark:text-black mt-3 border-black rounded-xl border-solid border-1 p-3 flex flex-col lg:flex-row items-center justify-between w-[100%] dark:bg-gray-800 dark:border-gray-700">
            <div className="flex flex-col lg:flex-row items-center gap-4 lg:gap-10">
              <p className="font-bold text-xl dark:text-black">
                {orderDetail
                  ? orderDetail.serviceName
                    ? orderDetail.serviceName
                    : ''
                  : ''}
              </p>
              <p className="dark:text-gray-300">{orderDetail.orderDate}</p>
              <div className="flex items-center gap-2 lg:gap-3 dark:text-gray-300">
                <p>{orderDetail.orderFrom}</p>
                <p>:</p>
                <p>{orderDetail.orderTo}</p>
              </div>
            </div>
            <div className="mt-2 lg:mt-0 rounded-xl bg-[#0aa8da] p-1 px-4 flex items-center justify-center">
              {t('detail_type')}
            </div>
          </div>
          <DetailOrder
            OrderEnterTime={orderDetail.orderFrom}
            OrderEndTime={orderDetail.orderTo}
            Prepayment={orderDetail.prePayment}
            MasterNumber={orderDetail.masterPhone}
             MasterName={orderDetail.masterFullName}
            MasterStatus={'sd'}
            MasterImg={
              orderDetail.masterPhotoId
                ? getFileId + orderDetail.masterPhotoId
                : userImg
            }
            ClientName={orderDetail.clientFullName}
            ClientPhoto={getFileId + orderDetail.clientPhotoId}
            ClientNumber={orderDetail.clientPhone}
          />
        </div>
      ) : (
        <p className="dark:text-white">Loading order details...</p>
      )}
    </>
  );
};

export default FirstDetail;
