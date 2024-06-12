import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import { master_default_values } from '../../../helpers/api';
import { config } from '../../../helpers/token';
import Review from '../../../components/MasterCard/rewiev';

const DetailMaster: React.FC = () => {
  const location = useLocation();
  const [orderDetails, setOrderDetails] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  const id = location.pathname.substring(8);
  console.log(id);

  useEffect(() => {
    setIsLoading(true);

    axios
      .get(`${master_default_values}${id}`, config)
      .then((response) => {
        const master = response.data.body;
        console.log(`Detail page with id: ${master}`);
        setOrderDetails(master);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error('There was an error fetching the data!', error);
        setIsLoading(false);
      });
  }, [id]);

  return (
    <div>
      {isLoading ? (
        <p className="dark:text-white">Loading order details...</p>
      ) : orderDetails ? (
        <div>
          <Review
            isLoading={false}
            goodLev={orderDetails.overallRating}
            simpleLev={orderDetails.reviewCount}
            badLev={orderDetails.reviewCount}
            verBadLev={orderDetails.reviewCount}
            normLev={orderDetails.reviewCount}
          />
        </div>
      ) : (
        <p className="dark:text-white">No order details found.</p>
      )}
    </div>
  );
};

export default DetailMaster;
