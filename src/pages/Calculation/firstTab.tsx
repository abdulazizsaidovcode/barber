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
import { Link } from 'react-router-dom';
import { get_orders_list } from '../../helpers/api';

const { Option } = Select;

const FilterComponent: React.FC = () => {
  const [showExtraFilters, setShowExtraFilters] = useState(false);
  const [tableData, setTableData] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const toggleExtraFilters = () => setShowExtraFilters(!showExtraFilters);

  const tableHeaders = [
    { id: 1, name: 'Клиент' },
    { id: 2, name: 'Процедура' },
    { id: 3, name: 'Дата записи' },
    { id: 4, name: 'Время' },
    { id: 5, name: 'Стимость' },
    { id: 6, name: 'Предоплата' },
    { id: 7, name: 'Оплачено' },
    { id: 8, name: 'Тип оплаты' },
    { id: 9, name: 'К оплате' },
    { id: 10, name: 'Статус записи' },
    { id: 11, name: 'Мастер' },
    { id: 12, name: '' },
  ];

  const onChange: DatePickerProps['onChange'] = (date, dateString) => {
    console.log(date, dateString);
  };

  const renderPopoverContent = (id: number) => (
    <div>
      <Link to={`/orders/${id}`}>
        <p>Открыть</p>
      </Link>
    </div>
  );

  useEffect(() => {
    // Fetch data from API
    axios
      .get(`${get_orders_list}?status=COMPLETED&page=0&size=10`)
      .then((response) => {
        setTableData(response.data);
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

      {/* Extra filters row */}
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
                <td className="p-5">{data.client}</td>
                <td className="p-5">{data.procedure}</td>
                <td className="p-5">{data.date}</td>
                <td className="p-5">{data.time}</td>
                <td className="p-5">{data.cost}</td>
                <td className="p-5">{data.prepayment}</td>
                <td className="p-5">{data.paid}</td>
                <td className="p-5">{data.paymentType}</td>
                <td className="p-5">{data.toPay}</td>
                <td className="p-5">{data.status}</td>
                <td className="p-5">{data.master}</td>
                <td className="flex items-center justify-center">
                  <Popover
                    content={renderPopoverContent(data.id)}
                    placement="bottomRight"
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
