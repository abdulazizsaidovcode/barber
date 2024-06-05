import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { get_orders_list } from '../../helpers/api';
import { config } from '../../helpers/token';
import axios from 'axios';
import DefaultLayout from './../../layout/DefaultLayout';

const NotFound: React.FC = () => {
  const location = useLocation();
  const [orderDetails, setOrderDetails] = useState<any>(null);
  const [tableData, setTableData] = useState<any[]>([]);

  const id = location.pathname.substring(8);

  useEffect(() => {
    axios
      .get(`${get_orders_list}?status=COMPLETED&page=0&size=10`, config)
      .then((response) => {
        const orders = response.data.body.object;
        setTableData(orders);

        // Find the order that matches the ID from the URL
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
      <DefaultLayout>
        <div className="shadow-3 border-black rounded-xl border-solid border-1 p-3 flex items-center justify-between w-[100%]">
          <p>Детали записи</p>
          <div className="rounded-md bg-[#ffa723] p-1 flex items-center justify-center">
            Не начиналась
          </div>
        </div>
        {orderDetails ? (
          <div>
            <h2>Order Details</h2>
            <p>Order ID: {orderDetails.orderId}</p>
            <p>Customer Name: {orderDetails.clientFullName}</p>
            <p>Order Status: {orderDetails.orderStatus}</p>
            {/* Add more fields as necessary */}
          </div>
        ) : (
          <p>Loading order details...</p>
        )}
      </DefaultLayout>
    </div>
  );
};

export default NotFound;
