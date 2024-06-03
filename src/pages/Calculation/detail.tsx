import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { get_orders_list } from '../../helpers/api'; // Define this API endpoint as needed
import { config } from '../../helpers/token';

const OrderDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [orderDetails, setOrderDetails] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`${get_orders_list}/${id}`, config)
      .then((response) => {
        setOrderDetails(response.data.body);
        setLoading(false);
      })
      .catch((error) => {
        console.error('There was an error fetching the order details!', error);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!orderDetails) {
    return <div>No details found</div>;
  }

  return (
    <div className="p-5 rounded-lg shadow-md mb-5 dark:bg-boxdark bg-white">
      <h1>Order Details</h1>
      <p>Client Name: {orderDetails.clientFullName}</p>
      <p>Client Phone: {orderDetails.clientPhone}</p>
      <p>Service Name: {orderDetails.serviceName}</p>
      <p>Order Date: {orderDetails.orderDate}</p>
      <p>
        Order Time: {orderDetails.orderFrom} - {orderDetails.orderTo}
      </p>
      <p>Price: {orderDetails.price}</p>
      <p>PrePayment: {orderDetails.prePayment}</p>
      <p>Paid: {orderDetails.paid}</p>
      <p>Payment Type: {orderDetails.paymentType}</p>
      <p>To Pay: {orderDetails.toPay}</p>
      <p>Order Status: {orderDetails.orderStatus}</p>
      <p>Master Name: {orderDetails.masterFullName}</p>
      <p>Master Phone: {orderDetails.masterPhone}</p>
    </div>
  );
};

export default OrderDetails;
