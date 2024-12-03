// FilterComponent.tsx
import React, { useState } from 'react';
import { Select, Input, Button, Row, Col, Popover, Space, DatePicker } from 'antd';
import { DownOutlined, UpOutlined } from '@ant-design/icons';
import { IoSearchOutline } from 'react-icons/io5';
import MasterTable from '../../components/Tables/MasterTable';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import masterStore from '../../helpers/state_managment/master/masterStore';
import { Buttons } from '../../components/buttons';
import { downloadExcelFile } from '../../helpers/attachment/file-download';
import { master_download } from '../../helpers/api';

const { Option } = Select;
const { RangePicker } = DatePicker;

const FilterComponent: React.FC = () => {
  const {
    setFilters,
    regionData,
    districtData,
    filters,
    filterObj,
    category,
    isLoading,
    setIsLoading,
    page,
    size
  } = masterStore();
  const queryParams: string = [
    filters.searchValue ? `fullName=${filters.searchValue}` : '',
    filters.regionValue ? `regionId=${filters.regionValue}` : '',
    filters.cityValue ? `districtId=${filters.cityValue}` : '',
    // datePicker(0) ? `startDate=${datePicker(0)}` : '',
    // datePicker(1) ? `endDate=${datePicker(1)}` : '',
    filters.serviceCategoryValue ? `categoryId=${filters.serviceCategoryValue}` : '',
    filters.statusValue ? `statusName=${filters.statusValue}` : '',
    filters.selfEmployedStatusValue === true ? `selfEmployed=true` : filters.selfEmployedStatusValue === false ? `selfEmployed=false` : '',
    filters.placeOfWorkValue ? `workPlace=${filters.placeOfWorkValue}` : ''
  ].filter(Boolean).join('&');
  const url: string = `${master_download}?${queryParams}${queryParams ? '&' : ''}page=${page}&size=${size}`;
  const [showExtraFilters, setShowExtraFilters] = useState(false);
  // const [activeMenu, setActiveMenu] = useState<number | null>(null);
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation()
  // const hide = () => {
  //   setOpen(false);
  // };
  const handleOpenChange = (newOpen: boolean) => {
    setOpen(newOpen);
  };


  const toggleExtraFilters = () => setShowExtraFilters(!showExtraFilters);
  const resetFilters = (): void => setFilters(filterObj);
  const handleInputChange = (key: string, value: any) => setFilters({ ...filters, [key]: value });
  // const toggleContextMenu = (id: number) => {
  //   setActiveMenu(activeMenu === id ? null : id);
  // };

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
      backgroundColor: '#f0f0f0',
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
      Тариф: '3 месяца',
      Цена: '2 100 000',
      // Оплачено: 'Оплачено',
      Способоплаты: 'Способ оплаты',
      // Датаоплаты: 'Дата оплаты',
      // Срокподписки: 'Срок подписки',
      Датаначала: '25.04.2024',
      Статус: 'Статус',
      Датаокончания: 'Дата окончания',
      icon: ':'

    },
  ];
  const { t } = useTranslation()
  const tableHeaders = [
    { id: 1, name: t("Photo") },
    { id: 2, name: t("master") },
    { id: 3, name: t("Категория") },
    { id: 4, name: t("Срок подписки") },
    // { id: 4, name: t("Tarif") },
    { id: 4, name: t("order_table_cost") },
    // { id: 6, name: t("Дата начала") },
    { id: 7, name: t("Select_start_date") },
    // { id: 8, name: t("date_of_payment") },
    // { id: 9, name: t("Subscription_period") },
    // { id: 10, name: t("Select_start_date") },
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
        <Row gutter={[16, 16]} style={{ marginTop: '1rem' }}>
          <Col xs={24} sm={12} md={6} className={`mb-[16px]`}>
            <Input
              placeholder={t('Search_by_name')}
              value={filters.searchValue}
              prefix={<IoSearchOutline />}
              allowClear
              className={`w-full bg-white rounded-[8px]`}
              onChange={(e) => handleInputChange('searchValue', e.target.value)}
            />
          </Col>
          <Col xs={24} sm={12} md={6} className={`mb-[16px]`}>
            <Select
              placeholder={t('Region')}
              value={filters.regionValue}
              className={`w-full bg-white rounded-[8px]`}
              allowClear
              onChange={(value) => handleInputChange('regionValue', value)}
            >
              {regionData.length > 0 && regionData.map(item => (
                <Option value={item.id} key={item.id}>{item.name}</Option>
              ))}
            </Select>
          </Col>
          <Col xs={24} sm={12} md={6} className={`mb-[16px]`}>
            <Select
              placeholder={t('City')}
              value={filters.cityValue}
              className={`w-full bg-white rounded-[8px]`}
              allowClear
              onChange={(value) => handleInputChange('cityValue', value)}
            >
              {districtData.length > 0 && districtData.map(item => (
                <Option value={item.id} key={item.id}>{item.name}</Option>
              ))}
            </Select>
          </Col>
          <Col xs={24} sm={12} md={6} className="flex gap-4 mb-[16px]">
            <Buttons onClick={toggleExtraFilters}>
              {showExtraFilters ? <UpOutlined /> : <DownOutlined />}
            </Buttons>
            <Buttons
              onClick={() => downloadExcelFile(url, setIsLoading, t('File_downloaded_successfully'), t('There_was_an_error_fetching_the_data'), page)}>
              {isLoading ? t('Loading') : t('Download')}
            </Buttons>
          </Col>
        </Row>
        {showExtraFilters && (
          <>
            <Row gutter={[16, 16]} style={{ marginTop: '10px' }}>
              <Col xs={24} sm={12} md={6} className={`mb-[16px] w-full`}>
                <Space direction="vertical" size={14}>
                  <RangePicker
                    placeholder={[t('Select_start_date'), t('Select_end_date')]}
                    value={filters.registrationPeriodValue}
                    className={`w-full`}
                    onChange={(date) => handleInputChange('registrationPeriodValue', date)}
                  />
                </Space>
              </Col>
              <Col xs={24} sm={12} md={6} className={`mb-[16px]`}>
                <Select
                  placeholder={t('Service_category')}
                  value={filters.serviceCategoryValue}
                  className={`w-full bg-white rounded-[8px]`}
                  allowClear
                  onChange={(value) => handleInputChange('serviceCategoryValue', value)}
                >
                  {category.length > 0 && category.map(item => (
                    <Option value={item.id} key={item.id}>{item.name}</Option>
                  ))}
                </Select>
              </Col>
              <Col xs={24} sm={12} md={6} className={`mb-[16px]`}>
                <Select
                  placeholder={t('Status')}
                  value={filters.statusValue}
                  className={`w-full bg-white rounded-[8px]`}
                  allowClear
                  onChange={(value) => handleInputChange('statusValue', value)}
                >
                  <Option value="ACTIVE">{t('Active')}</Option>
                  <Option value="BLOCKED">{t('Locked')}</Option>
                </Select>
              </Col>
              <Col xs={24} sm={12} md={6} className={`mb-[16px]`}>
                <Buttons onClick={resetFilters}>{t('Reset')}</Buttons>
              </Col>
            </Row>
          </>
        )}
        <MasterTable thead={tableHeaders}>
          {tableData.map((data, index) => (
            <tr key={index} className="dark:text-white text-center">
              <td className="text-center rounded-full p-2">
                <img src={data.img} alt="Img" className='w-12 rounded-full' /></td>
              <td className="p-2">{data.master}</td>
              <td className="p-2">{data.Спеиализация}</td>
              <td className="p-2">{data.Тариф}</td>
              <td className="p-2">{data.Цена}</td>
              {/* <td className="p-2">{data.Оплачено}</td> */}
              {/* <td className="p-2">{data.Способоплаты}</td> */}
              {/* <td className="p-2">{data.Датаоплаты}</td> */}
              {/* <td className="p-2">{data.Срокподписки}</td> */}
              <td className="p-2">{data.Датаначала}</td>
              <td className="p-2">
                <button className="bg-blue-500 text-white px-8 py-1 rounded-lg hover:bg-blue-600">
                  {data.Статус}
                </button>
              </td>
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
  );
};

export default FilterComponent;
