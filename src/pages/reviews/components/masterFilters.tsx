import { DatePicker, Input, Select, Space } from 'antd';
import React, { useEffect, useState } from 'react';
import { IoSearchOutline } from 'react-icons/io5';
import { Buttons } from '../../../components/buttons';
import { DownOutlined, UpOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import useReviewsStore from '../../../helpers/state_managment/reviews/reviews';
import masterStore from '../../../helpers/state_managment/master/masterStore';
import { fetchMasterDataList } from '../../../helpers/api-function/reviews/reviews';
import { getDistrict } from '../../../helpers/api-function/master/master';
import { reviews_list_master_data } from '../../../helpers/api';

const { Option } = Select;
const { RangePicker } = DatePicker;

const ReviewMastersFilters: React.FC = () => {
  const { masterFilters, setMasterFilters, setListMasterData, currentPage, pageSize, setMasterTotalPage } = useReviewsStore();
  const { setDistrictData, districtData } = masterStore();
  const { regionData } = masterStore();
  const [showMore, setShowMore] = useState(false);
  const { t } = useTranslation();

  function datePicker(num: number) {
    let date, month, year;

    if (masterFilters.startDate && masterFilters.startDate[0]) {
      date = masterFilters.startDate[num].date();
      month = masterFilters.startDate[num].month() + 1;
      year = masterFilters.startDate[num].year();

      if (month > 0 && month < 10) month = `0${month}`;
      if (date > 0 && date < 10) date = `0${date}`;

      return `${year}-${month}-${date}`;
    }
    return '';
  }

  // Construct query parameters from filters
  const queryParams: string = [
    masterFilters.firstNameOrLastName ? `firstNameOrLastName=${masterFilters.firstNameOrLastName}` : '',
    masterFilters.regionId ? `regionId=${masterFilters.regionId}` : '',
    masterFilters.districtId ? `districtId=${masterFilters.districtId}` : '',
    masterFilters.startRating ? `startRating=${masterFilters.startRating}` : '',
    masterFilters.endRating ? `endRating=${masterFilters.endRating}` : '',
    masterFilters.date ? `date=${masterFilters.date.year()}-${masterFilters.date.month() > 8 ? masterFilters.date.month() + 1 : '0' + (masterFilters.date.month() + 1)}-${masterFilters.date.date() > 9 ? masterFilters.date.date() : '0' + masterFilters.date.date()}` : '',
    datePicker(0) ? `startDate=${datePicker(0)}` : '',
    datePicker(1) ? `endDate=${datePicker(1)}` : ''
  ].filter(Boolean).join('&');

  const url_master_list: string = `${reviews_list_master_data}?${queryParams}&page=${currentPage}&size=${pageSize}`;

  useEffect(() => {
    fetchMasterDataList(setListMasterData, url_master_list, setMasterTotalPage);
    if (masterFilters.regionId) getDistrict(setDistrictData, +masterFilters.regionId);
  }, [masterFilters]);

  // Handle input changes
  const handleInputChange = (key: string, value: any) => setMasterFilters({ ...masterFilters, [key]: value });

  // Handle combined rating change
  const handleCombinedRatingChange = (value: string) => {
    const [startRating, endRating] = value.split('-').map(Number);
    setMasterFilters({ ...masterFilters, startRating, endRating, combinedRating: value });
  };

  const resetFilters = (): void => setMasterFilters({
    firstNameOrLastName: '',
    regionId: null,
    districtId: null,
    startRating: null,
    endRating: null,
    combinedRating: null,
    date: null,
    startDate: null,
    endDate: null,
  });

  const openShowMore = () => setShowMore(!showMore);

  return (
    <div className="flex flex-wrap gap-5">
      <Input
        placeholder={t('Search_by_name')}
        value={masterFilters.firstNameOrLastName}
        prefix={<IoSearchOutline />}
        className="w-55"
        onChange={(e) => handleInputChange('firstNameOrLastName', e.target.value)}
      />
      <Select
        placeholder={t('Region')}
        className="w-55"
        value={masterFilters.regionId}
        onChange={(e) => handleInputChange('regionId', e)}
      >
        {regionData.length > 0 && regionData.map(item => (
          <Option value={item.id} key={item.id}>{item.name}</Option>
        ))}
      </Select>
      <Select
        placeholder={t('City')}
        className="w-55"
        value={masterFilters.districtId}
        onChange={(e) => handleInputChange('districtId', e)}
      >
        {districtData.length > 0 && districtData.map(item => (
          <Option value={item.id} key={item.id}>{item.name}</Option>
        ))}
      </Select>
      <Buttons onClick={openShowMore}>
        {showMore ? <UpOutlined /> : <DownOutlined />}
      </Buttons>
      <Buttons onClick={resetFilters}>{t("Reset")}</Buttons>
      {showMore && (
        <div className="flex flex-wrap gap-5 mt-5">
          <Select
            placeholder={t('Rating')}
            className="w-55"
            value={masterFilters.combinedRating}
            onChange={handleCombinedRatingChange}
          >
            <Option value="1-2">1-2</Option>
            <Option value="2-3">2-3</Option>
            <Option value="3-4">3-4</Option>
            <Option value="4-5">4-5</Option>
            <Option value="5-5">5-5</Option>
          </Select>
          <DatePicker
            className="w-55"
            placeholder={t('Date')}
            value={masterFilters.date}
            onChange={e => handleInputChange('date', e)}
          />
          <Space direction="vertical" size={12}>
            <RangePicker
              placeholder={[t('Select_start_date'), t('Select_end_date')]}
              value={masterFilters.startDate}
              className='w-90'
              onChange={(date) => handleInputChange('startDate', date)}
            />
          </Space>
        </div>
      )}
    </div>
  );
};

export default ReviewMastersFilters;