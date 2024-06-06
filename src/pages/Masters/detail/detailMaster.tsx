import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { master_full_data } from '../../../helpers/api';
import axios from 'axios';
import { useTranslation } from 'react-i18next';
import MasterCardInfo from '../../../components/MasterCard/MasterCardR';
import { config } from '../../../helpers/token';

const DetailMaster: React.FC = () => {
  const { t } = useTranslation();
  const location = useLocation();
  const [orderDetails, setOrderDetails] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true); // Add loading state

  const id = location.pathname.substring(8);
  console.log(id);

  useEffect(() => {
    if (!id) {
      console.error('ID is required!');
      return;
    }

    setIsLoading(true); // Set loading to true when fetching starts

    axios
      .get(`${master_full_data}${id}`, config)
      .then((response) => {
        const master = response.data.body;
        console.log(master);
        setOrderDetails(master);
        setIsLoading(false); // Set loading to false when data is fetched
      })
      .catch((error) => {
        console.error('There was an error fetching the data!', error);
        setIsLoading(false); // Set loading to false in case of error
      });
  }, [id]);

  return (
    <div>
      {isLoading ? (
        <p className="dark:text-white">Loading order details...</p>
      ) : orderDetails ? (
        <div>
          <MasterCardInfo
            Telegram={
              orderDetails.telegramLink === null
                ? 'Mavjud emas'
                : orderDetails.telegramLink
            }
            Clients={
              orderDetails.clientCount === null
                ? 'Mavjud emas'
                : orderDetails.clientCount
            }
            rejectedOrderCount={
              orderDetails.rejectedOrderCount === null
                ? 'Mavjud emas'
                : orderDetails.rejectedOrderCount
            }
            CompOrders={
              orderDetails.completedOrderCount === null
                ? 'Mavjud emas'
                : orderDetails.completedOrderCount
            }
            Instagram={
              orderDetails.instagramLink === null
                ? 'Mavjud emas'
                : orderDetails.instagramLink
            }
            Number={orderDetails.phoneNumber}
            Region={orderDetails.region}
            City={orderDetails.city}
            Age={orderDetails.age}
            Gender={orderDetails.Gender}
            UserName={orderDetails.Username}
            SurName={orderDetails.surname}
            Location={orderDetails.location}
            MasterName={orderDetails.masterFullName}
            MasterImg={orderDetails.masterPhotoPath}
            definitionType={
              orderDetails.masterPhone === undefined
                ? 'Mavjud emas'
                : orderDetails.masterPhone
            }
            Status={orderDetails.status}
            isLoading={isLoading}
          />
        </div>
      ) : (
        <p className="dark:text-white">No order details found.</p>
      )}
    </div>
  );
};

export default DetailMaster;
