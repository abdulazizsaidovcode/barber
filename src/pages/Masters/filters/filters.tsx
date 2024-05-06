import { Button, Col, DatePicker, Input, Row, Select } from 'antd';
import { IoSearchOutline } from 'react-icons/io5';
import { DownOutlined, UpOutlined } from '@ant-design/icons';
import React, { useState } from 'react';
import MasterModal from '../master-modal.tsx';

const { Option } = Select;
const filterObj = {
  searchValue: '',
  regionValue: 'Region',
  cityValue: 'City',
  registrationPeriodValue: null,
  serviceCategoryValue: 'Service category',
  scheduleTypeValue: 'Schedule type',
  selfEmployedStatusValue: 'Self-employed status',
  statusValue: 'Status',
  placeOfWorkValue: 'Place of work'
};

const Filters: React.FC = () => {
  const [showExtraFilters, setShowExtraFilters] = useState(false);
  const [filters, setFilters] = useState(filterObj);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleExtraFilters = () => setShowExtraFilters(!showExtraFilters);
  const resetFilters = (): void => setFilters(filterObj);
  const handleInputChange = (key: string, value: any) => setFilters({ ...filters, [key]: value });
  const openModal = () => setIsModalOpen(!isModalOpen);

  const styles = {
    mainContainer: {
      padding: '20px',
      backgroundColor: '#fff',
      borderRadius: '8px',
      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
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
      backgroundColor: '#fff'
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
            placeholder="Search F.I.O"
            prefix={<IoSearchOutline />}
            style={styles.filterInput}
            value={filters.searchValue}
            onChange={(e) => handleInputChange('searchValue', e.target.value)}
          />
        </Col>
        <Col xs={24} sm={12} md={6} style={styles.filterGroup}>
          <Select
            defaultValue="Region"
            style={styles.filterInput}
            value={filters.regionValue}
            onChange={(value) => handleInputChange('regionValue', value)}
          >
            <Option value="toshkent">Toshkent</Option>
            <Option value="qashqadaryo">Qashqadaryo</Option>
            <Option value="surxandaryo">Surxandaryo</Option>
          </Select>
        </Col>
        <Col xs={24} sm={12} md={6} style={styles.filterGroup}>
          <Select
            defaultValue="City"
            style={styles.filterInput}
            value={filters.cityValue}
            onChange={(value) => handleInputChange('cityValue', value)}
          >
            <Option value="toshkent">Toshkent</Option>
            <Option value="qarshi">Qarshi</Option>
            <Option value="boysun">Boysun</Option>
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
          <Button style={styles.extraButton} onClick={openModal}>Download</Button>
          <MasterModal isModalOpen={isModalOpen} openModal={openModal} />
        </Col>
      </Row>

      {showExtraFilters && (
        <>
          <Row gutter={[16, 16]} style={{ marginTop: '10px' }}>
            <Col xs={24} sm={12} md={6} style={styles.filterGroup}>
              <DatePicker
                placeholder={'Registration period for masters'}
                style={styles.filterInput}
                value={filters.registrationPeriodValue}
                onChange={(date) => handleInputChange('registrationPeriodValue', date)}
              />
            </Col>
            <Col xs={24} sm={12} md={6} style={styles.filterGroup}>
              <Select
                defaultValue="Service category"
                style={styles.filterInput}
                value={filters.serviceCategoryValue}
                onChange={(value) => handleInputChange('serviceCategoryValue', value)}
              >
                <Option value="toshkent">Toshkent</Option>
                <Option value="qarshi">Qarshi</Option>
              </Select>
            </Col>
            <Col xs={24} sm={12} md={6} style={styles.filterGroup}>
              <Select
                defaultValue="Schedule type"
                style={styles.filterInput}
                value={filters.scheduleTypeValue}
                onChange={(value) => handleInputChange('scheduleTypeValue', value)}
              >
                <Option value="2024">2024</Option>
                <Option value="2023">2023</Option>
              </Select>
            </Col>
          </Row>
          <Row gutter={[16, 16]} style={{ marginTop: '10px' }}>
            <Col xs={24} sm={12} md={6} style={styles.filterGroup}>
              <Select
                defaultValue="Self-employed status"
                style={styles.filterInput}
                value={filters.selfEmployedStatusValue}
                onChange={(value) => handleInputChange('selfEmployedStatusValue', value)}
              >
                <Option value="toshkent">Toshkent</Option>
                <Option value="qarshi">Qarshi</Option>
              </Select>
            </Col>
            <Col xs={24} sm={12} md={6} style={styles.filterGroup}>
              <Select
                defaultValue="Status"
                style={styles.filterInput}
                value={filters.statusValue}
                onChange={(value) => handleInputChange('statusValue', value)}
              >
                <Option value="toshkent">Toshkent</Option>
                <Option value="qarshi">Qarshi</Option>
              </Select>
            </Col>
            <Col xs={24} sm={12} md={6} style={styles.filterGroup}>
              <Select
                defaultValue="Place of work"
                style={styles.filterInput}
                value={filters.placeOfWorkValue}
                onChange={(value) => handleInputChange('placeOfWorkValue', value)}
              >
                <Option value="2024">2024</Option>
                <Option value="2023">2023</Option>
              </Select>
            </Col>
            <Col xs={24} sm={12} md={6} style={styles.filterGroup}>
              <Button onClick={resetFilters} style={styles.extraButton}>Reset</Button>
            </Col>
          </Row>
        </>
      )}
    </div>
  );
};

export default Filters;
