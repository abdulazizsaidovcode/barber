import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import {  master_gallery_id } from '../../../helpers/api';
import axios from 'axios';
import { config } from '../../../helpers/token';
import ProcedureItem from '../../../components/MasterCard/master_galery';

const Gallery: React.FC = () => {
  const location = useLocation();
  const [orderDetails, setOrderDetails] = useState<any[]>([]);

  const id = location.pathname.substring(8);

  useEffect(() => {
    fetchData(id);
  }, [id]);

  const fetchData = (id: string) => {
    axios
      .get(`${master_gallery_id}${id}`, config)
      .then((response) => {
        const masterArray = response.data.body;
        console.log(`service id =>`, masterArray);
        setOrderDetails(masterArray);
      })
      .catch((error) => {
        console.error('Gallery ga oid malumotlar topilmadi', error);
      });
  };

  return (
    <div>
      <div>
        {orderDetails.map((orderDetail, index) => (
          <ProcedureItem
            key={index}
            imgUrl={``}
            buttonText=""
            buttonColor=""
            icon={''}
          />
        ))}
      </div>
    </div>
  );
};

export default Gallery;
