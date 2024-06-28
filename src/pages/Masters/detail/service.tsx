import React, { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { getFileId, master_service_id } from '../../../helpers/api';
import axios from 'axios';
import { config } from '../../../helpers/token';
import MasterProcedures from '../../../components/MasterCard/master_procedures';

const Service: React.FC = () => {
  const [orderDetails, setOrderDetails] = useState<any[]>([]);

  const { id } = useParams();

  const fetchData = () => {
    axios
      .get(`${master_service_id}${id}`, config)
      .then((response) => {
        const masterArray = response.data.body;
        console.log(`aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa =>`, masterArray);
        setOrderDetails(masterArray);
      })
      .catch((error) => {
        console.error('There was an error fetching the data!', error);
      });
  };

  useEffect(() => {
    fetchData();
  }, [id]);

  return (
    <div>
      <div>
        {orderDetails.map((orderDetail, index) => (
          <MasterProcedures
            getFunc={fetchData}
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
