import { Button, Col, DatePicker, Input, Row, Select, Space } from 'antd';
import { IoSearchOutline } from 'react-icons/io5';
import { DownOutlined, UpOutlined } from '@ant-design/icons';
import React, { useEffect, useState } from 'react';
import { getDistrict, getMasters } from '../../../helpers/api-function/master/master.tsx';
import masterStore from '../../../helpers/state_managment/master/masterStore.tsx';
import { useTranslation } from 'react-i18next';
import { downloadExcelFile } from '../../../helpers/attachment/file-download.tsx';
import { master_download } from '../../../helpers/api.tsx';

const { RangePicker } = DatePicker;
const { Option } = Select;

const Filters: React.FC = () => {
  const {
    setData,
    setTotalPage,
    setDistrictData,
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
  const [showExtraFilters, setShowExtraFilters] = useState<boolean>(false);
  const { t } = useTranslation();
  const queryParams: string = [
    filters.searchValue ? `fullName=${filters.searchValue}` : '',
    filters.regionValue ? `regionId=${filters.regionValue}` : '',
    filters.cityValue ? `districtId=${filters.cityValue}` : '',
    datePicker(0) ? `startDate=${datePicker(0)}` : '',
    datePicker(1) ? `endDate=${datePicker(1)}` : '',
    filters.serviceCategoryValue ? `categoryId=${filters.serviceCategoryValue}` : '',
    filters.statusValue ? `statusName=${filters.statusValue}` : '',
    filters.selfEmployedStatusValue === true ? `selfEmployed=true` : filters.selfEmployedStatusValue === false ? `selfEmployed=false` : '',
    filters.placeOfWorkValue ? `workPlace=${filters.placeOfWorkValue}` : ''
  ].filter(Boolean).join('&');
  const url: string = `${master_download}?${queryParams}${queryParams ? '&' : ''}page=${page}&size=${size}`;

  useEffect(() => {
    getMasters({
      fullName: filters.searchValue ? filters.searchValue : '',
      regionId: filters.regionValue ? filters.regionValue : '',
      districtId: filters.cityValue ? filters.cityValue : '',
      startDate: datePicker(0) ? datePicker(0) : '',
      endDate: datePicker(1) ? datePicker(1) : '',
      categoryId: filters.serviceCategoryValue ? filters.serviceCategoryValue : '',
      statusName: filters.statusValue ? filters.statusValue : '',
      selfEmployed: filters.selfEmployedStatusValue === true ? true : filters.selfEmployedStatusValue === false ? false : '',
      workPlace: filters.placeOfWorkValue ? filters.placeOfWorkValue : '',
      page: validateObject(filters) ? page : 0,
      size: validateObject(filters) ? size : 0,
      setData,
      setTotalPage,
    });
    if (filters.regionValue) getDistrict(setDistrictData, +filters.regionValue);
  }, [filters]);

  useEffect(() => {
    filters.cityValue = null;
    getMasters({
      fullName: filters.searchValue ? filters.searchValue : '',
      regionId: filters.regionValue ? filters.regionValue : '',
      districtId: filters.cityValue ? filters.cityValue : '',
      startDate: datePicker(0) ? datePicker(0) : '',
      endDate: datePicker(1) ? datePicker(1) : '',
      categoryId: filters.serviceCategoryValue ? filters.serviceCategoryValue : '',
      statusName: filters.statusValue ? filters.statusValue : '',
      selfEmployed: filters.selfEmployedStatusValue === true ? true : filters.selfEmployedStatusValue === false ? false : '',
      workPlace: filters.placeOfWorkValue ? filters.placeOfWorkValue : '',
      setData,
      setTotalPage
    });
  }, [filters.regionValue]);

  const toggleExtraFilters = (): void => setShowExtraFilters(!showExtraFilters);
  const resetFilters = (): void => setFilters(filterObj);
  const handleInputChange = (key: string, value: any) => setFilters({ ...filters, [key]: value });

  function datePicker(num: number) {
    let date, month, year;

    if (filters.registrationPeriodValue && filters.registrationPeriodValue[0]) {
      date = filters.registrationPeriodValue[num].date();
      month = filters.registrationPeriodValue[num].month() + 1;
      year = filters.registrationPeriodValue[num].year();

      if (month > 0 && month < 10) month = `0${month}`;
      if (date > 0 && date < 10) date = `0${date}`;

      return `${year}-${month}-${date}`;
    }
  }

  function validateObject(obj: any) {
    for (let key in obj) {
      if (obj[key]) {
        return false;
      }
    }
    return true;
  }

  return (
    <div className={`px-[30px] mb-[20px]`}>
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
          <Button
            className="flex items-center justify-center bg-[#f0f0f0] w-[13%]"
            onClick={toggleExtraFilters}
          >
            {showExtraFilters ? <UpOutlined /> : <DownOutlined />}
          </Button>
          <Button
            className={`bg-[#f0f0f0]`}
            onClick={() => downloadExcelFile(url, setIsLoading, t('File_downloaded_successfully'), t('There_was_an_error_fetching_the_data'), page)}
          >
            {isLoading ? t('Loading') : t('Download')}
          </Button>
        </Col>
      </Row>

      {showExtraFilters && (
        <>
          <Row gutter={[16, 16]} style={{ marginTop: '10px' }}>
            <Col xs={24} sm={12} md={6} className={`mb-[16px]`}>
              <Space direction="vertical" size={12}>
                <RangePicker
                  placeholder={[t('Select_start_date'), t('Select_end_date')]}
                  value={filters.registrationPeriodValue}
                  // className={`w-full bg-white rounded-[8px]} s.filterInput}
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

            {/*reels two*/}
            {/*<Col xs={24} sm={12} md={6} className={`mb-[16px]`}>*/}
            {/*  <Select*/}
            {/*    defaultValue="Тип расписания"*/}
            {/*    style={styles.filterInput}*/}
            {/*    onChange={(value) => handleInputChange('scheduleTypeValue', value)}*/}
            {/*  >*/}
            {/*    <Option value="2024">2024</Option>*/}
            {/*    <Option value="2023">2023</Option>*/}
            {/*  </Select>*/}
            {/*</Col>*/}
            <Col xs={24} sm={12} md={6} className={`mb-[16px]`}>
              <Select
                placeholder={t('Self_employed_status')}
                value={filters.selfEmployedStatusValue}
                className={`w-full bg-white rounded-[8px]`}
                allowClear
                onChange={(value) => handleInputChange('selfEmployedStatusValue', value)}
              >
                <Option value={true}>{t('Yeah')}</Option>
                <Option value={false}>{t('Not')}</Option>
              </Select>
            </Col>
          </Row>
          <Row gutter={[16, 16]} style={{ marginTop: '10px' }}>
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
              <Select
                placeholder={t('Place_of_work')}
                value={filters.placeOfWorkValue}
                className={`w-full bg-white rounded-[8px]`}
                allowClear
                onChange={(value) => handleInputChange('placeOfWorkValue', value)}
              >
                <Option value="SALON">{t('Salon')}</Option>
                <Option value="TO_HOME">{t('Yes_to_home')}</Option>
                <Option value="ON_SITE">{t('On_site')}</Option>
              </Select>
            </Col>
            <Col xs={24} sm={12} md={6} className={`mb-[16px]`}>
              <Button
                onClick={resetFilters}
                className={`bg-[#f0f0f0]`}
              >{t('Reset')}</Button>
            </Col>
          </Row>
        </>
      )}
    </div>
  );
};

export default Filters;
