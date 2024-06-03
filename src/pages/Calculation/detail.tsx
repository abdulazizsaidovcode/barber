import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { get_orders_list } from '../../helpers/api';
import { config } from '../../helpers/token';
import axios from 'axios';
import { Button, Popover } from 'antd';

const NotFound: React.FC = () => {
  const location = useLocation();
  const [data, setData] = useState<any>(null);
  const [tableData, setTableData] = useState<any[]>([]);

  const id = location.pathname.substring(8);

  useEffect(() => {
    axios
      .get(`${get_orders_list}?status=COMPLETED&page=0&size=10`, config)
      .then((response) => {
        setTableData(response.data.body.object);
        console.log(tableData);
      })
      .catch((error) => {
        console.error('There was an error fetching the data!', error);
      });
  }, []);

  return (
    <div>
      <div>
        {tableData.map((data) => (
          <tr key={data.id} className="dark:text-white">
            <td className="p-5">
              <div className="flex flex-col justify-start gap-1">
                <p>{data.clientFullName}</p>
                <p>{data.clientPhone}</p>
              </div>
            </td>
            <td className="p-5">{data.serviceName}</td>
            <td className="p-5">{data.orderDate}</td>
            <td className="p-5">
              <div className="bg-blue-500 rounded-md flex items-center gap-2 justify-center p-1">
                <p>{data.orderFrom}</p>
                <p>-</p>
                <p>{data.orderTo}</p>
              </div>
            </td>
            <td className="p-5">{data.price}</td>
            <td className="p-5">{data.prePayment}</td>
            <td className="p-5">{data.paid}</td>
            <td className="p-5">
              {data.paymentType === null ? 'Mavjud emas' : data.paymentType}
            </td>
            <td className="p-5">{data.toPay}</td>
            <td className="p-5">
              {data.orderStatus === 'COMPLETED' ? 'true' : 'false'}
            </td>
            <td className="p-5">
              <div className="flex flex-col justify-start gap-1">
                <p>{data.masterFullName}</p>
                <p>{data.masterPhone}</p>
              </div>
            </td>
          </tr>
        ))}
      </div>
    </div>
  );
};

export default NotFound;
