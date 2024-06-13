import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { getFileId, master_service_id } from '../../../helpers/api';
import axios from 'axios';
import { config } from '../../../helpers/token';
import MasterProcedures from '../../../components/MasterCard/master_procedures';

const Service: React.FC = () => {
  const location = useLocation();
  const [orderDetails, setOrderDetails] = useState<any[]>([]);

  const id = location.pathname.substring(8);

  useEffect(() => {
    fetchData(id);
  }, [id]);

  const fetchData = (id: string) => {
    axios
      .get(`${master_service_id}${id}`, config)
      .then((response) => {
        const masterArray = response.data.body;
        console.log(`service id =>`, masterArray);
        setOrderDetails(masterArray);
      })
      .catch((error) => {
        console.error('There was an error fetching the data!', error);
      });
  };

  return (
    <div>
      <div>
        {orderDetails.map((orderDetail, index) => (
          <MasterProcedures
            key={index}
            servicesId={orderDetail.id}
             title={orderDetail.name}
            imgUrl={`${getFileId}${orderDetail.attachmentId}`}
            price={orderDetail.price}
            duration={orderDetail.serviceTime}
            description={orderDetail.description}
            serviceStatus={orderDetail.serviceStatus}
          />
        ))}
      </div>
    </div>
  );
};

export default Service;
