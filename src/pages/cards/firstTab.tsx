import React, { useState } from 'react';
// import { useHistory } from 'react-router-dom';
import { Select, Input, Button, Row, Col, Popover } from 'antd';
import { DownOutlined, UpOutlined } from '@ant-design/icons';
import { IoSearchOutline } from 'react-icons/io5';
import MasterTable from '../../components/Tables/MasterTable';
import { Link } from 'react-router-dom';

const { Option } = Select;

const FilterComponent: React.FC = () => {
  const [showExtraFilters, setShowExtraFilters] = useState(false);
  const [activeMenu, setActiveMenu] = useState<number | null>(null);
  const [open, setOpen] = useState(false);
  const hide = () => {
    setOpen(false);
  };
  const handleOpenChange = (newOpen: boolean) => {
    setOpen(newOpen);
  };


  const toggleExtraFilters = () => setShowExtraFilters(!showExtraFilters);

  const toggleContextMenu = (id: number) => {
    setActiveMenu(activeMenu === id ? null : id);
  };



  const styles = {
    mainContainer: {
      padding: '20px ',
      backgroundColor: '#fff',
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
      backgroundColor: '#f0f0f0', // Light gray
    },
    toggleButton: {
      width: '13%',
      backgroundColor: '#f0f0f0',
    },
    extraButton: {
      backgroundColor: '#f0f0f0',
    },
    contextMenu: {
      position: 'absolute',
      backgroundColor: '#fff',
      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
      borderRadius: '8px',
      padding: '10px',
      zIndex: 1000,
    },
  };

  const tableHeaders = [
    { id: 1, name: 'Фото' },
    { id: 2, name: 'Мастер' },
    { id: 3, name: 'Спеиализация' },
    { id: 4, name: 'Тариф' },
    { id: 5, name: 'Цена' },
    { id: 6, name: 'Оплачено"' },
    { id: 7, name: 'Способ оплаты' },
    { id: 8, name: 'Дата оплаты' },
    { id: 9, name: 'Срок подписки' },
    { id: 10, name: 'Дата начала' },
    { id: 11, name: 'Статус' },
    { id: 12, name: 'Дата окончания' },
    { id: 13, name: '' },
  ];

  const tableData = [
    {
      id: 1,
      nonCashTurnover: 'Имя, Фамилия\n99893 258 36 52',
      allTurnover: 'Парихмахер, барбер',
      totalIncome: 'Premium',
      incomeSimple: '2 000 000',
      incomePremium: 'Карта',
      incomeVip: '25.04.2024',
      masterTotal: '3 месяца',
      anotherSimple: '25.04.2024',
      familyIncome: 'Активана',
      totalClients: '25.07.2024',
      totalStatus: 'Nima',
      totalIcon: ':',
    },
  ];

  const statusData = [
    {
      id: 1,
      name: 'wsad'
    },
    {
      id: 2,
      name: 'asfd'
    },
    {
      id: 3,
      name: 'asdf'
    },
  ]

  return (
    <div style={styles.mainContainer}>
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
          <Select defaultValue="2024" style={styles.filterInput} placeholder="Select Year">
            <Option value="2024">2024</Option>
            <Option value="2023">2023</Option>
          </Select>
        </Col>
        <Col xs={24} sm={12} md={6} style={styles.filterGroup} className="flex gap-4">
          <Button
            className="flex items-center justify-center"
            type="primary"
            onClick={toggleExtraFilters}
            style={styles.toggleButton}
          >
            {showExtraFilters ? <UpOutlined /> : <DownOutlined />}
          </Button>
          <Button style={styles.extraButton}>Download</Button>
        </Col>
      </Row>

      {showExtraFilters && (
        <Row gutter={[16, 16]} style={{ marginBottom: '10px' }}>
          <Col xs={24} sm={12} md={6} style={styles.filterGroup}>
            <Input placeholder="Status" style={styles.filterInput} />
          </Col>
          <Col xs={24} sm={12} md={6} style={styles.filterGroup}>
            <Select defaultValue="Service category" style={styles.filterInput}>
              <Option value="toshkent">Toshkent</Option>
              <Option value="qarshi">Qarshi</Option>
            </Select>
          </Col>
          <Col xs={24} sm={12} md={6} style={styles.filterGroup}>
            <Select defaultValue="Tarif" style={styles.filterInput} placeholder="Tariff">
              <Option value="free">Free</Option>
              <Option value="premium">Premium</Option>
              <Option value="Exclusive">Exclusive</Option>
            </Select>
          </Col>
          <Col xs={24} sm={12} md={6} style={styles.filterGroup}>
            <Button style={styles.extraButton}>Сбросить</Button>
          </Col>
        </Row>
      )}

      <div>
        <MasterTable thead={tableHeaders}>
          {tableData.map((data, index) => (
            <tr key={index} className="dark:text-white text-center">
              <td className="p-5">{ }</td>
              <td className="p-5">{data.nonCashTurnover}</td>
              <td className="p-5">{data.allTurnover}</td>
              <td className="p-5">{data.totalIncome}</td>
              <td className="p-5">{data.incomeSimple}</td>
              <td className="p-5">{data.incomePremium}</td>
              <td className="p-5">{data.incomeVip}</td>
              <td className="p-5">{data.masterTotal}</td>
              <td className="p-5">{data.anotherSimple}</td>
              <td className="p-5">{data.familyIncome}</td>
              <td className="p-5">{data.totalClients}</td>
              <td className="p-5">{data.totalClients}</td>
              <td className="relative p-5">
                <Popover
                  content={
                    <>
                      {statusData && statusData.map(item => (
                        <Link to='/MasterDatail' key={item.id} className='block'>{item.name}</Link>
                      ))}
                    </>
                  }
                  trigger="click"
                  open={open}
                  onOpenChange={handleOpenChange}
                >
                  <Button>:</Button>
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
