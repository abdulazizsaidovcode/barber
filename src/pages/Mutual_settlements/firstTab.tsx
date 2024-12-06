// FilterComponent.tsx
import React, { useEffect, useState } from 'react';
import { Select, Input, Row, Col, Popover, Pagination } from 'antd';
import { DownOutlined, UpOutlined } from '@ant-design/icons';
import { IoSearchOutline } from 'react-icons/io5';
import MasterTable from '../../components/Tables/MasterTable';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import masterStore from '../../helpers/state_managment/master/masterStore';
import { Buttons } from '../../components/buttons';
import { downloadExcelFile } from '../../helpers/attachment/file-download';
import { getFileId, service_category_list, subs_list } from '../../helpers/api';
import { getDistrict, getRegion } from '../../helpers/api-function/master/master';
import defaultImg from '../../images/user.png'
import { getMutuals } from '../../helpers/api-function/mutual_set/mutual_set';
import { IoMdMore } from 'react-icons/io';
import axios from 'axios';
import { config } from '../../helpers/token';
import { clearFunction } from '../../common/clear-function/clear-function';

const { Option } = Select;
interface Data {
  masterId: string,
  attachmentId: string | null,
  firstName: string,
  lastName: string,
  phoneNumber: string,
  masterSpecialization: string | null,
  subscriptionPeriod: string,
  price: number,
  startDate: string,
  masterStatus: string,
  endDate: string
}

const FilterComponent: React.FC = () => {
  const { t } = useTranslation()
  const [showExtraFilters, setShowExtraFilters] = useState(false);
  const [totalElements, setTotalElements] = useState(0)
  const [tableData, setTableData] = useState<Data[]>([])
  const {
    districtData,
    regionData,
    filters,
    filterObj,
    category,
    size,
    isLoading,
    page,
    setIsLoading,
    setFilters,
    setRegionData,
    setDistrictData,
    setPage,
    setSize,
    setCategory
  } = masterStore();

  const queryParams: string = [
    filters.searchValue ? `fullName=${filters.searchValue}` : '',
    filters.regionValue ? `regionId=${filters.regionValue}` : '',
    filters.cityValue ? `districtId=${filters.cityValue}` : '',
    filters.serviceCategoryValue ? `categoryId=${filters.serviceCategoryValue}` : '',
    filters.statusValue ? `status=${filters.statusValue}` : '',
    filters.tariffStatus ? `tariffStatus=${filters.tariffStatus}` : ''
  ].filter(Boolean).join('&');

  const url: string = `${subs_list}?${queryParams}${queryParams ? '&' : ''}page=${page}&size=${size}`;

  const toggleExtraFilters = () => setShowExtraFilters(!showExtraFilters);
  const resetFilters = (): void => setFilters(filterObj);
  const handleInputChange = (key: string, value: any) => {
    if (key === 'regionValue') setFilters({ ...filters, [key]: value, cityValue: null })
    else setFilters({ ...filters, [key]: value })
  };
  const onPageChange = (page: number, pageSize: number) => {
    setPage(page - 1);
    setSize(pageSize);
  };

  useEffect(() => {
    getRegion(setRegionData);
    const getCategory = async () => {
      try {
        const { data } = await axios.get(service_category_list, config)
        if (data.success === true) setCategory(data.body)
      } catch { }
      finally {
        clearFunction()
      }
    }

    getCategory()
  }, [])

  useEffect(() => {
    getMutuals(url, setPage, setSize, setTotalElements, setTableData)
  }, [url])

  useEffect(() => {
    getDistrict(setDistrictData, filters.regionValue ? filters.regionValue : '');
  }, [filters.regionValue])

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

  const tableHeaders = [
    { id: 1, name: t("Photo") },
    { id: 2, name: t("master") },
    { id: 3, name: t("Категория") },
    { id: 4, name: t("Срок подписки") },
    { id: 4, name: t("order_table_cost") },
    { id: 7, name: t("Select_start_date") },
    { id: 11, name: t("Status") },
    { id: 13, name: t("Select_end_date") },
    { id: 13, name: '' },
  ];

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
            onChange={(value) => {
              handleInputChange('regionValue', value)
            }}
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
            <Col xs={24} sm={12} md={6} className={`mb-[16px]`}>
              <Select
                placeholder={t('Date')}
                value={filters.tariffStatus}
                className={`w-full bg-white rounded-[8px]`}
                allowClear
                onChange={(value) => handleInputChange('tariffStatus', value)}
              >
                <Option value="STANDARD">10 {t('day')}</Option>
                <Option value="MONTH">1 {t('month')}</Option>
                <Option value="YEAR">{t('year')}</Option>
              </Select>
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
        {tableData.length !== 0 ? tableData.map((data, index) => (
          <tr key={index} className="dark:text-white text-center">
            <td className="text-center rounded-full p-2">
              <img src={data.attachmentId ? getFileId + data.attachmentId : defaultImg} alt="Img" className='w-12 rounded-full' /></td>
            <td className="p-2">{data.firstName + ' ' + data.lastName}</td>
            <td className="p-2">{data.masterSpecialization}</td>
            <td className="p-2">{data.subscriptionPeriod}</td>
            <td className="p-2">{data.price}</td>
            <td className="p-2">{data.startDate}</td>
            <td className="p-2">
              <button className="bg-blue-500 text-white px-8 py-1 rounded-lg hover:bg-blue-600">
                {data.masterStatus}
              </button>
            </td>
            <td className="p-2">{data.endDate}</td>
            <td className="p-2">
              <Popover
                content={
                  <>
                    <Link to={`/master-detail/${data.masterId}`} className='block '>{t("Open")}</Link>
                  </>
                }
              >
                <button><IoMdMore size={24} /></button>
              </Popover></td>
          </tr>
        )) :
          <tr className={`border-b border-[#eee] dark:text-white dark:border-strokedark`}>
            <td
              className="min-w-full text-center py-10 text-xl font-bold"
              colSpan={tableHeaders.length}
            >
              {t('Information_not_available')}
            </td>
          </tr>
        }
      </MasterTable>
      <div className='mt-5'>
        {tableData.length !== 0 && <Pagination
          showSizeChanger
          current={page + 1}
          pageSize={size}
          total={totalElements}
          onChange={onPageChange}
        />}
      </div>
    </div>
  );
};

export default FilterComponent;
