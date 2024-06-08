import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { master_full_data } from '../../../helpers/api';
import axios from 'axios';
import MasterCardInfo from '../../../components/MasterCard/MasterCardR';
import { config } from '../../../helpers/token';
import toast from 'react-hot-toast';

const Reviews: React.FC = () => {
  const location = useLocation();
  const [orderDetails, setOrderDetails] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true); // Add loading state

  const id = location.pathname.substring(8);
  console.log(id);

  const MasterImgFake = '/path/to/fake-image.png'; // Replace with your actual path
  useEffect(() => {
    if (!id) {
      toast.error('Id topilamdi !');
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
        <div className="flex flex-col gap-3 ">
          <div className="flex flex-col dark:bg-[#ffffffdf] text-black dark:text-black border-black w-full lg:w-[100%] shadow-3 p-3 rounded-xl"></div>
          <div className="flex flex-col dark:bg-[#ffffffdf] text-black dark:text-black border-black w-full lg:w-[100%] shadow-3 p-3 rounded-xl"></div>
        </div>
      ) : (
        <p className="dark:text-white">No order details found.</p>
      )}
    </div>
  );
};

export default Reviews;
