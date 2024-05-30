import React, { useState } from 'react';
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

const { Option } = Select;

const FilterComponent: React.FC = () => {
  const [showExtraFilters, setShowExtraFilters] = useState(false);

  // Toggle visibility of extra filters
  const toggleExtraFilters = () => setShowExtraFilters(!showExtraFilters);

  // Inline styles for the component
  const styles = {
    mainContainer: {
      padding: '20px',
      borderRadius: '8px',
      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
      marginBottom: '20px',
    },
    filterGroup: {
      marginBottom: '16px',
    },
    filterTitle: {
      marginBottom: '5px',
      fontWeight: 'bold',
    },
    filterInput: {
      width: '100%',
      borderRadius: '8px',
      backgroundColor: '#f0f0f0', // Light gray
    },
    toggleButton: {
      width: '13%',
      backgroundColor: '#f0f0f0',
    },
    extraButton: {
      backgroundColor: '#f0f0f0',
    },
  };

  const tableData = [
    {
      id: 1,
      country: "O'zbekistan",
      nonCashTurnover: '50 000 000',
      allTurnover: '250 000 000',
      enterTime: '0',
      leftTime: '0',
      incomeSimple: '0',
      incomePremium: '5 000 000',
      incomeVip: '12 000 000',
      masterTotal: '25 000 000',
      anotherSimple: 'Одобнена',
      familyIncome: 'j',
      totalClients: '0',
    },
    // Add more objects as needed
  ];

  const Status = () => (
    <div className="w-[100%]">
      <p>Одобнена</p>
    </div>
  );

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

  return (
    <div style={styles.mainContainer} className="dark:bg-boxdark">
      {/* Top filters row */}
      <Row gutter={[16, 16]} style={{ marginBottom: '10px' }}>
        <Col xs={24} sm={12} md={6} style={styles.filterGroup}>
          <Input
            placeholder="Search by name"
            prefix={<IoSearchOutline />}
            style={styles.filterInput}
          />
        </Col>
        <Col xs={24} sm={12} md={6} style={styles.filterGroup}>
          <Select defaultValue="Country" style={styles.filterInput}>
            <Option value="toshkent">Toshkent</Option>
            <Option value="qarshi">Qarshi</Option>
          </Select>
        </Col>
        <Col xs={24} sm={12} md={6} style={styles.filterGroup}>
          <Select
            defaultValue="2024"
            style={styles.filterInput}
            placeholder="Select Year"
          >
            <Option value="2024">2024</Option>
            <Option value="2023">2023</Option>
          </Select>
        </Col>
        <Col
          xs={24}
          sm={12}
          md={6}
          style={styles.filterGroup}
          className="flex gap-4"
        >
          <Button
            className="flex items-center justify-center dark:bg-black"
            onClick={toggleExtraFilters}
            style={styles.toggleButton}
          >
            {showExtraFilters ? <UpOutlined /> : <DownOutlined />}
          </Button>
          <Button style={styles.extraButton}>Download</Button>
        </Col>
      </Row>

      {/* Extra filters row */}
      {showExtraFilters && (
        <Row gutter={[29, 16]} style={{ marginBottom: '10px' }}>
          <Col xs={14} sm={7} md={4} style={styles.filterGroup}>
            <DatePicker onChange={onChange} />
          </Col>
          <Col xs={24} sm={12} md={6} style={styles.filterGroup}>
            <Select defaultValue="Категория услуг" style={styles.filterInput}>
              <Option value="toshkent">100</Option>
              <Option value="qarshi">200</Option>
            </Select>
          </Col>
          <Col xs={24} sm={12} md={6} style={styles.filterGroup}>
            <Select
              defaultValue="Статус записи"
              style={styles.filterInput}
              placeholder="Tariff"
            >
              <Option value="Одобрена">Одобрена √</Option>
              <Option value="На_одобрении">На одобрении !</Option>
            </Select>
          </Col>
          <Col xs={24} sm={12} md={5} style={styles.filterGroup}>
            <Select
              defaultValue="Статус записи"
              style={styles.filterInput}
              placeholder="Tariff"
            >
              <Option value="Карта">Карта</Option>
              <Option value="Наличные">Наличные</Option>
            </Select>
          </Col>
          <Col xs={24} sm={12} md={3} style={styles.filterGroup}>
            <Button style={styles.extraButton}>Reset</Button>
          </Col>
        </Row>
      )}
      {/* Table */}
      <div>
        <MasterTable thead={tableHeaders}>
          {tableData.map((data) => (
            <tr key={data.id} className="dark:text-white">
              <td className="p-5">{data.country}</td>
              <td className="p-5">{data.nonCashTurnover}</td>
              <td className="p-5">{data.allTurnover}</td>
              <td className="p-5 flex items-center justify-center">
                <div className="bg-blue-400 p-1 flex items-center justify-center rounded-xl w-[90%]">
                  {data.enterTime} - {data.leftTime}
                </div>
              </td>
              <td className="p-5">{data.incomeSimple}</td>
              <td className="p-5">{data.incomePremium}</td>
              <td className="p-5">{data.incomeVip}</td>
              <td className="p-5">{data.masterTotal}</td>
              <td className="p-5 ">
                <div className="bg-blue-500 p-1 flex rounded-md items-center justify-center">
                  {data.anotherSimple}
                </div>
              </td>
              <td className="p-5">{data.familyIncome}</td>
              <td className="p-5">{data.totalClients}</td>
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
          ))}
        </MasterTable>
      </div>
    </div>
  );
};

export default FilterComponent;
