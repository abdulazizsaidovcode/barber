import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { master_url } from '../../../helpers/api';
import { config } from '../../../helpers/token';
import axios from 'axios';
import { useTranslation } from 'react-i18next';
import DefaultLayout from '../../../layout/DefaultLayout';
import MasterCardInfo from '../../../components/MasterCard/MasterCardR';

const DetailMaster: React.FC = () => {
  const { t } = useTranslation();
  const location = useLocation();
  const [orderDetails, setOrderDetails] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true); // Add loading state

  const id = location.pathname.substring(8);
  console.log(id);

  useEffect(() => {
    setIsLoading(true); // Set loading to true when fetching starts
    axios
      .get(`${master_url}?page=0&size=10`, config)
      .then((response) => {
        const master = response.data.body.object;

        // Find the order that matches the ID from the URL
        const matchingOrder = master.find((order: any) => order.id === id);
        if (matchingOrder) {
          setOrderDetails(matchingOrder);
        }
        setIsLoading(false); // Set loading to false when fetching is done
      })
      .catch((error) => {
        console.error('There was an error fetching the data!', error);
        setIsLoading(false); // Set loading to false in case of error
      });
  }, [id]);

  return (
    <div>
      {orderDetails ? (
        <div>
          <MasterCardInfo
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
        <p className="dark:text-white">Loading order details...</p>
      )}
    </div>
  );
};

export default DetailMaster;
