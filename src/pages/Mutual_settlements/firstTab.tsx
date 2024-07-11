// FilterComponent.tsx
import React, { useState } from 'react';
import { Select, Input, Button, Row, Col, Popover } from 'antd';
import { DownOutlined, UpOutlined } from '@ant-design/icons';
import { IoSearchOutline } from 'react-icons/io5';
import MasterTable from '../../components/Tables/MasterTable';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const { Option } = Select;

const FilterComponent: React.FC = () => {
  const [showExtraFilters, setShowExtraFilters] = useState(false);
  const [activeMenu, setActiveMenu] = useState<number | null>(null);
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation()
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

  // Inline styles for the component
  const styles = {
    mainContainer: {
      padding: '15px',
      borderRadius: '8px',
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
      backgroundColor: '#9C0936',
      color: '#fff',
      border: 'none',
      fontWeight: '500',
    },
  };

  const tableData = [
    {
      img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQYxuazQ7_RGUp4WrKx41JwXBlZ0Xr818VVPQuqcHgzWQ&s',
      master: "Имя, Фамилия 99893 258 36 52",
      Спеиализация: 'Парихмахер, барбер',
      Тариф: 'Premiup',
      Цена: 'Цена',
      Оплачено: 'Оплачено',
      Способоплаты: 'Способ оплаты',
      Датаоплаты: 'Дата оплаты',
      Срокподписки: 'Срок подписки',
      Датаначала: 'Дата начала',
      Статус: 'Статус',
      Датаокончания: 'Дата окончания',
      icon: ':'

    },
  ];
  const { t } = useTranslation()
  const tableHeaders = [
    { id: 1, name: t("Photo") },
    { id: 2, name: t("master") },
    { id: 3, name: t("Specialization") },
    { id: 4, name: t("Tarif") },
    { id: 5, name: t("order_table_cost") },
    { id: 6, name: t("order_table_paid") },
    { id: 7, name: t("Reasonably_priced") },
    { id: 8, name: t("date_of_payment") },
    { id: 9, name: t("Subscription_period") },
    { id: 10, name: t("Select_start_date") },
    { id: 11, name: t("Status") },
    { id: 13, name: t("Select_end_date") },
    { id: 13, name: '' },
  ];
  const statusData = [
    {
      id: 1,
      name: t("Open"),
      category: 'open'
    },
    {
      id: 2,
      name: t("Extend"),
      category: 'close'
    },
    {
      id: 3,
      name: t("Stop_subscription"),
      category: 'close'
    },
  ]

  return (
    <div style={styles.mainContainer} className="dark:bg-boxdark">
      {/* Top filters row */}
      <Row gutter={[16, 16]} style={{ marginBottom: '10px' }}>
        <Col xs={24} sm={12} md={6} style={styles.filterGroup}>
          <Input
            placeholder={t("Search_by_name")}
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
            placeholder={t("Select_year")}
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
          <Button style={styles.extraButton}>{t("Download")}</Button>
        </Col>
      </Row>

      {/* Extra filters row */}
      {showExtraFilters && (
        <Row gutter={[16, 16]} style={{ marginBottom: '10px' }}>
          <Col xs={24} sm={12} md={6} style={styles.filterGroup}>
            <Input placeholder={t("Status")} style={styles.filterInput} />
          </Col>
          <Col xs={24} sm={12} md={6} style={styles.filterGroup}>
            <Select defaultValue={t("Service_category")} style={styles.filterInput}>
              <Option value="toshkent">Toshkent</Option>
              <Option value="qarshi">Qarshi</Option>
            </Select>
          </Col>
          <Col xs={24} sm={12} md={6} style={styles.filterGroup}>
            <Select
              defaultValue="2024"
              style={styles.filterInput}
              placeholder={t("Tarif")}
            >
              <Option value="2024">2024</Option>
              <Option value="2023">2023</Option>
            </Select>
          </Col>
          <Col xs={24} sm={12} md={6} style={styles.filterGroup}>
            <Button style={styles.extraButton}>{t("Reset")}</Button>
          </Col>
        </Row>
      )}
      {/* Table */}
      <div>
        <MasterTable thead={tableHeaders}>
          {tableData.map((data, index) => (
            <tr key={index} className="dark:text-white text-center">
              <td className="text-center rounded-full p-2">
                <img src={data.img} alt="Img" className='w-12 rounded-full' /></td>
              <td className="p-2">{data.master}</td>
              <td className="p-2">{data.Спеиализация}</td>
              <td className="p-2">{data.Тариф}</td>
              <td className="p-2">{data.Цена}</td>
              <td className="p-2">{data.Оплачено}</td>
              <td className="p-2">{data.Способоплаты}</td>
              <td className="p-2">{data.Датаоплаты}</td>
              <td className="p-2">{data.Срокподписки}</td>
              <td className="p-2">{data.Датаначала}</td>
              <td className="p-2">{data.Статус}</td>
              <td className="p-2">{data.Датаокончания}</td>
              <td className="p-2">
                <Popover
                  content={
                    <>
                      {statusData && statusData.map(item => (
                        <Link to={`${item.category === 'open' ? '/MasterDatail' : pathname}`} key={item.id} className='block '>{item.name}</Link>
                      ))}

                    </>
                  }

                  onOpenChange={handleOpenChange}
                >
                  <Button>:</Button>
                </Popover></td>
            </tr>
          ))}
        </MasterTable>
      </div>
    </div>
  );
};

export default FilterComponent;
