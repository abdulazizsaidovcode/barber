import { DatePicker, Input, Select, Space } from 'antd';
import React, { useEffect, useState } from 'react';
import { IoSearchOutline } from 'react-icons/io5';
import { Buttons } from '../../../components/buttons';
import { DownOutlined, UpOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import useReviewsStore from '../../../helpers/state_managment/reviews/reviews.tsx';
import masterStore from '../../../helpers/state_managment/master/masterStore.tsx';
import { fetchDataList, fetchMainData } from '../../../helpers/api-function/reviews/reviews.tsx';
import { getDistrict } from '../../../helpers/api-function/master/master.tsx';
import { reviews_main_data, reviews_list_data } from '../../../helpers/api.tsx';

const { Option } = Select;
const { RangePicker } = DatePicker;

const ReviewFilters: React.FC = () => {
  const { filterObj, filters, setFilters, setMainData, setListData, currentPage, pageSize, setTotalPage } = useReviewsStore();
  const { setDistrictData, districtData } = masterStore();
  const { regionData } = masterStore();
  const [showMore, setShowMore] = useState(false);
  const { t } = useTranslation();
  const queryParams: string = [
    filters.firstNameOrLastName ? `firstNameOrLastName=${filters.firstNameOrLastName}` : '',
    filters.GENDER ? `GENDER=${filters.GENDER}` : '',
    filters.regionId ? `regionId=${filters.regionId}` : '',
    filters.districtId ? `districtId=${filters.districtId}` : '',
    filters.rating ? `rating=${filters.rating}` : '',
    filters.MASTER_OR_CLIENT ? `MASTER_OR_CLIENT=${filters.MASTER_OR_CLIENT}` : '',
    filters.date ? `date=${filters.date.year()}-${filters.date.month() > 8 ? filters.date.month() + 1 : '0' + (filters.date.month() + 1)}-${filters.date.date() > 9 ? filters.date.date() : '0' + filters.date.date()}` : '',
    datePicker(0) ? `startDate=${datePicker(0)}` : '',
    datePicker(1) ? `endDate=${datePicker(1)}` : ''
  ].filter(Boolean).join('&');


  // filters urls
  const url_main: string = `${reviews_main_data}${queryParams ? '?' : ''}${queryParams}`;
  const url_list: string = `${reviews_list_data}?${queryParams}&page=${currentPage}&size=${pageSize}`;


  useEffect(() => {
    fetchMainData(setMainData, url_main);
    fetchDataList(setListData, setTotalPage, url_list);
    if (filters.regionId) getDistrict(setDistrictData, +filters.regionId);
  }, [filters]);

  const handleInputChange = (key: string, value: any) => setFilters({ ...filters, [key]: value });
  const resetFilters = (): void => setFilters(filterObj);
  const openShowMore = () => setShowMore(!showMore);

  function datePicker(num: number) {
    let date, month, year;

    if (filters.startDate && filters.startDate[0]) {
      date = filters.startDate[num].date();
      month = filters.startDate[num].month() + 1;
      year = filters.startDate[num].year();

      if (month > 0 && month < 10) month = `0${month}`;
      if (date > 0 && date < 10) date = `0${date}`;

      return `${year}-${month}-${date}`;
    }
  }

  return (
    <div className="flex flex-wrap gap-5">
      <Input
        placeholder={t('Search_by_name')}
        value={filters.firstNameOrLastName}
        prefix={<IoSearchOutline />}
        className="w-55"
        onChange={(e) => handleInputChange('firstNameOrLastName', e.target.value)}
      />
      <Select
        placeholder={t('Region')}
        className="w-55"
        value={filters.regionId}
        onChange={(e) => handleInputChange('regionId', e)}
      >
        {regionData.length > 0 && regionData.map(item => (
          <Option value={item.id} key={item.id}>{item.name}</Option>
        ))}
      </Select>
      <Select
        placeholder={t('City')}
        className="w-55"
        value={filters.districtId}
        onChange={(e) => handleInputChange('districtId', e)}
      >
        {districtData.length > 0 && districtData.map(item => (
          <Option value={item.id} key={item.id}>{item.name}</Option>
        ))}
      </Select>
      <Select
        placeholder={t('Gender')}
        className="w-55"
        value={filters.GENDER}
        onChange={e => handleInputChange('GENDER', e)}
      >
        <Option value={`MALE`}>{t("Male")}</Option>
        <Option value={`FEMALE`}>{t("female")}</Option>
      </Select>
      <Buttons onClick={openShowMore}>
        {showMore ? <UpOutlined /> : <DownOutlined />}
      </Buttons>
      <Buttons onClick={resetFilters}>Reset</Buttons>
      {showMore && (
        <div className="flex flex-wrap gap-5 mt-5">
          <Select
            placeholder={'Rating'}
            className="w-55"
            value={filters.rating}
            onChange={e => handleInputChange('rating', e)}
          >
            <Option value={1}>1</Option>
            <Option value={2}>2</Option>
            <Option value={3}>3</Option>
            <Option value={4}>4</Option>
            <Option value={5}>5</Option>
          </Select>
          <Select
            placeholder={'From_whom'}
            className="w-55"
            value={filters.MASTER_OR_CLIENT}
            onChange={e => handleInputChange('MASTER_OR_CLIENT', e)}
          >
            <Option value={`MASTER`}>Master</Option>
            <Option value={`CLIENT`}>Client</Option>
          </Select>
          <DatePicker
            className="w-55"
            placeholder={'Date'}
            value={filters.date}
            onChange={e => handleInputChange('date', e)}
          />
          <Space direction="vertical" size={12}>
            <RangePicker
              placeholder={[t('Select_start_date'), t('Select_end_date')]}
              value={filters.startDate}
              onChange={(date) => handleInputChange('startDate', date)}
            />
          </Space>
        </div>
      )}
    </div>
  );
};

export default ReviewFilters