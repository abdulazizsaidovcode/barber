import { Button, Col, DatePicker, Input, Row, Select, Space } from 'antd';
import { IoSearchOutline } from 'react-icons/io5';
import { DownOutlined, UpOutlined } from '@ant-design/icons';
import React, { useEffect, useState } from 'react';
import MasterModal from '../master-modal.tsx';
import { getMasters } from '../../../helpers/api-function/master/master.tsx';
import masterStore from '../../../helpers/state_managment/master/masterStore.tsx';

interface FilterTypes {
  searchValue: string;
  regionValue: string | null;
  cityValue: string | null;
  registrationPeriodValue: string | null;
  serviceCategoryValue: string | null;
  scheduleTypeValue: string | null;
  selfEmployedStatusValue: string | null;
  statusValue: string | null;
  placeOfWorkValue: string | null;
}

const { RangePicker } = DatePicker;
const { Option } = Select;
const filterObj = {
  searchValue: '',
  regionValue: '',
  cityValue: '',
  registrationPeriodValue: null,
  serviceCategoryValue: '',
  scheduleTypeValue: '',
  selfEmployedStatusValue: '',
  statusValue: '',
  placeOfWorkValue: ''
};

const Filters: React.FC = () => {
  const [showExtraFilters, setShowExtraFilters] = useState<boolean>(false);
  const [filters, setFilters] = useState<FilterTypes>(filterObj);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const { setData, setTotalPage, regionData } = masterStore();

  useEffect(() => {
    getMasters({
      fullName: filters.searchValue ? filters.searchValue : '',
      regionId: filters.regionValue ? filters.regionValue : '',
      setData,
      setTotalPage
    });
  }, [filters]);
  console.log(regionData);

  const toggleExtraFilters = (): void => setShowExtraFilters(!showExtraFilters);
  const resetFilters = (): void => setFilters(filterObj);
  const handleInputChange = (key: string, value: any) => setFilters({ ...filters, [key]: value });
  const openModal = (): void => setIsModalOpen(!isModalOpen);

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
            placeholder="Поиск по ФИО"
            prefix={<IoSearchOutline />}
            style={styles.filterInput}
            value={filters.searchValue}
            onChange={(e) => handleInputChange('searchValue', e.target.value)}
          />
        </Col>
        <Col xs={24} sm={12} md={6} style={styles.filterGroup}>
          <Select
            defaultValue="Регион"
            style={styles.filterInput}
            onChange={(value) => handleInputChange('regionValue', value)}
          >
            {regionData.length > 0 &&
              regionData.map(item => (
                <Option value={item.id} key={item.id}>{item.name}</Option>
              ))}
          </Select>
        </Col>
        <Col xs={24} sm={12} md={6} style={styles.filterGroup}>
          <Select
            defaultValue="Город"
            style={styles.filterInput}
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
              <Space direction="vertical" size={12}>
                <RangePicker
                  style={styles.filterInput}
                  onChange={(date) => handleInputChange('registrationPeriodValue', date)}
                />
              </Space>
            </Col>
            <Col xs={24} sm={12} md={6} style={styles.filterGroup}>
              <Select
                defaultValue="Категория услуг"
                style={styles.filterInput}
                onChange={(value) => handleInputChange('serviceCategoryValue', value)}
              >
                <Option value="toshkent">Toshkent</Option>
                <Option value="qarshi">Qarshi</Option>
              </Select>
            </Col>
            <Col xs={24} sm={12} md={6} style={styles.filterGroup}>
              <Select
                defaultValue="Тип расписания"
                style={styles.filterInput}
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
                defaultValue="Статус самозанятых"
                style={styles.filterInput}
                onChange={(value) => handleInputChange('selfEmployedStatusValue', value)}
              >
                <Option value="toshkent">Toshkent</Option>
                <Option value="qarshi">Qarshi</Option>
              </Select>
            </Col>
            <Col xs={24} sm={12} md={6} style={styles.filterGroup}>
              <Select
                defaultValue="Статус"
                style={styles.filterInput}
                onChange={(value) => handleInputChange('statusValue', value)}
              >
                <Option value="toshkent">Toshkent</Option>
                <Option value="qarshi">Qarshi</Option>
              </Select>
            </Col>
            <Col xs={24} sm={12} md={6} style={styles.filterGroup}>
              <Select
                defaultValue="Место работы"
                style={styles.filterInput}
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
