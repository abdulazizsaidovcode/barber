import React, { useState, useEffect } from 'react';
import { Col, DatePicker, Input, Row, Select } from 'antd';
import { IoSearchOutline } from 'react-icons/io5';
import { DownOutlined, UpOutlined } from '@ant-design/icons';
import clientFilterStore from '../../../helpers/state_managment/client/clientFilterStore.tsx';
import { getClients } from '../../../helpers/api-function/client/client.tsx';
import { getDistrict } from '../../../helpers/api-function/master/master.tsx';
import { useTranslation } from 'react-i18next';
import { client_download } from '../../../helpers/api.tsx';
import { downloadExcelFile } from '../../../helpers/attachment/file-download.tsx';
import { Buttons } from '../../../components/buttons';

const { Option } = Select;

const Filters: React.FC = () => {
  const { t } = useTranslation();
  const [showExtraFilters, setShowExtraFilters] = useState(false);
  const {
    setClientFilterData,
    setClientTotalPage,
    setDistrictData,
    regionData,
    districtData,
    setIsLoading,
    isLoading,
    page
  } = clientFilterStore();
  const [filters, setFilters] = useState({
    fullName: '',
    regionId: null,
    districtId: null,
    startDate: null,
    endDate: null,
    status: ''
  });

  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const toggleExtraFilters = () => setShowExtraFilters(!showExtraFilters);

  useEffect(() => {
    const params: any = {
      setData: setClientFilterData,
      setTotalPage: setClientTotalPage,
      ...filters
    };

    // Remove empty filter values
    Object.keys(params).forEach((key) => {
      if (params[key] === '' || params[key] === null) {
        delete params[key];
      }
    });

    // Fetch clients data
    getClients(params);
    if (filters.regionId) getDistrict(setDistrictData, +filters.regionId);
  }, [filters]);

  useEffect(() => {
    setFilters((prevFilters) => ({ ...prevFilters, districtId: null }));

    const params: any = {
      setData: setClientFilterData,
      setTotalPage: setClientTotalPage,
      ...filters
    };

    // Remove empty filter values
    Object.keys(params).forEach((key) => {
      if (params[key] === '' || params[key] === null) {
        delete params[key];
      }
    });

    // Fetch clients data
    getClients(params);
  }, [filters.regionId]);

  const handleInputChange = (key: string, value: any) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [key]: value
    }));
  };

  const handleDateChange = (key: string, date: any) => {
    const formattedDate = date ? formatDate(new Date(date)) : null;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [key]: formattedDate
    }));

    if (key === 'startDate') {
      setStartDate(date);
    } else if (key === 'endDate') {
      setEndDate(date);
    }
  };

  const formatDate = (date: Date | null) => {
    if (!date) return null;

    const year = date.getFullYear();
    const month = padNumber(date.getMonth() + 1);
    const day = padNumber(date.getDate());

    return `${year}-${month}-${day}`;
  };
  const padNumber = (number: number) => {
    return number.toString().padStart(2, '0');
  };

  const queryParams: string = [
    filters.fullName ? `fullName=${filters.fullName}` : '',
    filters.regionId ? `regionId=${filters.regionId}` : null,
    filters.districtId ? `districtId=${filters.districtId}` : null,
    filters.startDate ? `startDate=${filters.startDate}` : null,
    filters.endDate ? `endDate=${filters.endDate}` : null,
    filters.status ? `status=${filters.status}` : ''
  ]
    .filter(Boolean)
    .join('&');
  const url: string = `${client_download}?${queryParams}&page=${page}&size=10`;

  const resetFilters = () => {
    setFilters({
      fullName: '',
      regionId: null,
      districtId: null,
      startDate: null,
      endDate: null,
      status: ''
    });
    setStartDate(null);
    setEndDate(null);
  };

  const styles = {
    mainContainer: {
      padding: '0 30px',
      marginBottom: '20px'
    },
    filterGroup: {
      marginBottom: '16px'
    },
    filterTitle: {
      marginBottom: '5px',
      fontWeight: 'bold'
    },
    filterInput: {
      width: '100%',
      backgroundColor: '#fff',
      borderRadius: '8px'
    },
    toggleButton: {
      width: '13%',
      backgroundColor: '#f0f0f0'
    },
    extraButton: {
      backgroundColor: '#f0f0f0'
    }
  };

  return (
    <div style={styles.mainContainer}>
      <Row gutter={[16, 16]} style={{ marginTop: '1rem' }}>
        <Col xs={24} sm={12} md={6} style={styles.filterGroup}>
          <Input
            placeholder={t('Search_F_I_O')}
            prefix={<IoSearchOutline />}
            allowClear
            style={styles.filterInput}
            value={filters.fullName}
            onChange={(e) => handleInputChange('fullName', e.target.value)}
          />
        </Col>
        <Col xs={24} sm={12} md={6} style={styles.filterGroup}>
          <Select
            placeholder={t('Select_region')}
            allowClear
            style={styles.filterInput}
            value={filters.regionId}
            onChange={(value) => {
              handleInputChange('regionId', value);
            }}
          >
            {regionData.length > 0 && (
              regionData.map((item) => (
                <Option value={item.id} key={item.id}>
                  {item.name}
                </Option>
              ))
            )}
          </Select>
        </Col>
        <Col xs={24} sm={12} md={6} style={styles.filterGroup}>
          <Select
            placeholder={t('Select_district')}
            allowClear
            style={styles.filterInput}
            value={filters.districtId || null}
            onChange={(value) => handleInputChange('districtId', value)}
          >
            {districtData.length > 0 && (
              districtData.map((item) => (
                <Option value={item.id} key={item.id}>
                  {item.name}
                </Option>
              ))
            )}
          </Select>
        </Col>
        <Col
          xs={24}
          sm={12}
          md={6}
          style={styles.filterGroup}
          className="flex gap-4"
        >
          <Buttons onClick={toggleExtraFilters}>
            {showExtraFilters ? <UpOutlined /> : <DownOutlined />}
          </Buttons>
          <Buttons
            onClick={() =>
              downloadExcelFile(
                url,
                setIsLoading,
                t('File_downloaded_successfully'),
                t('There_was_an_error_fetching_the_data'),
                page
              )
            }
          >
            {isLoading ? t('Loading') : t('Download')}
          </Buttons>
        </Col>
      </Row>

      {showExtraFilters && (
        <>
          <Row gutter={[16, 16]} style={{ marginTop: '10px' }}>
            <Col xs={24} sm={12} md={6} style={styles.filterGroup}>
              <DatePicker
                placeholder={t('Select_start_date')}
                style={styles.filterInput}
                value={startDate}
                onChange={(date) => {
                  handleDateChange('startDate', date);

                }}
              />
            </Col>
            <Col xs={24} sm={12} md={6} style={styles.filterGroup}>
              <DatePicker
                placeholder={t('Select_end_date')}
                style={styles.filterInput}
                value={endDate}
                onChange={(date) => handleDateChange('endDate', date)}
              />
            </Col>
            <Col xs={24} sm={12} md={6} style={styles.filterGroup}>
              <Select
                placeholder={t('Status')}
                allowClear
                style={styles.filterInput}
                value={filters.status || null}
                onChange={(value) => handleInputChange('status', value)}
              >
                <Option value="ACTIVE">{t('Active')}</Option>
                <Option value="BLOCK">{t('Locked')}</Option>
                <Option value="DELETED">{t('Deleted')}</Option>
              </Select>
            </Col>
            <Col xs={24} sm={12} md={6} style={styles.filterGroup}>
              <Buttons onClick={resetFilters}>
                {t('Reset')}
              </Buttons>
            </Col>
          </Row>
        </>
      )}
    </div>
  );
};

export default Filters;
