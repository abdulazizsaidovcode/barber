import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Select,
  Input,
  Button,
  Row,
  Col,
  DatePicker,
  DatePickerProps,
  Popover,
} from 'antd';
import { DownOutlined, UpOutlined } from '@ant-design/icons';
import { IoSearchOutline } from 'react-icons/io5';
import MasterTable from '../../components/Tables/MasterTable';
import { useNavigate } from 'react-router-dom';
import { get_orders_list } from '../../helpers/api';
import { config } from '../../helpers/token';
import { useTranslation } from 'react-i18next';

const { Option } = Select;

const FilterComponent: React.FC = () => {
  const [showExtraFilters, setShowExtraFilters] = useState(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [tableData, setTableData] = useState<any[]>([]);
  const { t } = useTranslation();
  const navigate = useNavigate();

  const tableHeaders = [
    { id: 1, name: t('order_table_client') },
    { id: 2, name: t('order_table_procedure') },
    { id: 3, name: t('order_table_date') },
    { id: 4, name: t('order_table_time') },
    { id: 5, name: t('order_table_cost') },
    { id: 6, name: t('order_table_prepayment') },
    { id: 7, name: t('order_table_paid') },
    { id: 8, name: t('order_table_paymentType') },
    { id: 9, name: t('order_table_pay') },
    { id: 10, name: t('order_table_status') },
    { id: 11, name: t('order_table_master') },
    { id: 12, name: '' },
  ];

  const toggleExtraFilters = () => setShowExtraFilters(!showExtraFilters);

  const onChange: DatePickerProps['onChange'] = (date, dateString) => {
    console.log(date, dateString);
  };

  const handleOpenOrderDetails = (id: number) => {
    navigate(`/orders/${id}`);
  };

  useEffect(() => {
    axios
      .get(`${get_orders_list}?status=COMPLETED&page=0&size=10`, config)
      .then((response) => {
        setTableData(response.data.body.object);
        setLoading(false);
      })
      .catch((error) => {
        console.error('There was an error fetching the data!', error);
        setLoading(false);
      });
  }, []);

  return (
    <div className="p-5 rounded-lg shadow-md mb-5 dark:bg-boxdark bg-white">
      {/* Top filters row */}
      <Row gutter={[16, 16]} className="mb-2">
        <Col xs={24} sm={12} md={6} className="mb-4">
          <Input
            placeholder="Search by name"
            prefix={<IoSearchOutline />}
            className="w-full rounded-lg bg-gray-200 dark:bg-gray-800"
          />
        </Col>
        <Col xs={24} sm={12} md={6} className="mb-4">
          <Select
            defaultValue="Country"
            className="w-full rounded-lg bg-gray-200 dark:bg-gray-800"
          >
            <Option value="toshkent">Toshkent</Option>
            <Option value="qarshi">Qarshi</Option>
          </Select>
        </Col>
        <Col xs={24} sm={12} md={6} className="mb-4">
          <Select
            defaultValue="2024"
            className="w-full rounded-lg bg-gray-200 dark:bg-gray-800"
            placeholder="Select Year"
          >
            <Option value="2024">2024</Option>
            <Option value="2023">2023</Option>
          </Select>
        </Col>
        <Col xs={24} sm={12} md={6} className="mb-4 flex gap-4">
          <Button
            className="flex items-center justify-center w-full rounded-lg bg-gray-200 dark:bg-gray-800"
            onClick={toggleExtraFilters}
          >
            {showExtraFilters ? <UpOutlined /> : <DownOutlined />}
          </Button>
          <Button className="bg-gray-200 dark:bg-gray-800 rounded-lg">
            Download
          </Button>
        </Col>
      </Row>

      {showExtraFilters && (
        <Row gutter={[29, 16]} className="mb-2">
          <Col xs={14} sm={7} md={4} className="mb-4">
            <DatePicker
              onChange={onChange}
              className="w-full rounded-lg bg-gray-200 dark:bg-gray-800"
            />
          </Col>
          <Col xs={24} sm={12} md={6} className="mb-4">
            <Select
              defaultValue="Категория услуг"
              className="w-full rounded-lg bg-gray-200 dark:bg-gray-800"
            >
              <Option value="toshkent">100</Option>
              <Option value="qarshi">200</Option>
            </Select>
          </Col>
          <Col xs={24} sm={12} md={6} className="mb-4">
            <Select
              defaultValue="Статус записи"
              className="w-full rounded-lg bg-gray-200 dark:bg-gray-800"
              placeholder="Tariff"
            >
              <Option value="Одобрена">Одобрена √</Option>
              <Option value="На_одобрении">На одобрении !</Option>
            </Select>
          </Col>
          <Col xs={24} sm={12} md={5} className="mb-4">
            <Select
              defaultValue="Статус записи"
              className="w-full rounded-lg bg-gray-200 dark:bg-gray-800"
              placeholder="Tariff"
            >
              <Option value="Карта">Карта</Option>
              <Option value="Наличные">Наличные</Option>
            </Select>
          </Col>
          <Col xs={24} sm={12} md={3} className="mb-4">
            <Button className="bg-gray-200 dark:bg-gray-800 rounded-lg w-full">
              Reset
            </Button>
          </Col>
        </Row>
      )}

      {/* Table */}
      <div>
        <MasterTable thead={tableHeaders}>
          {loading ? (
            <tr>
              <td colSpan={tableHeaders.length} className="text-center p-5">
                Loading...
              </td>
            </tr>
          ) : (
            tableData.map((data) => (
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
                <td className="flex items-center justify-center">
                  <Popover
                    content={
                      <div>
                        <Button onClick={() => handleOpenOrderDetails(data.id)}>
                          Открыть
                        </Button>
                      </div>
                    }
                    placement="bottomRight"
                    className="flex items-center justify-center"
                    title="Title"
                    trigger="click"
                  >
                    <Button> . . . </Button>
                  </Popover>
                </td>
              </tr>
            ))
          )}
        </MasterTable>
      </div>
    </div>
  );
};

export default FilterComponent;
