// FilterComponent.tsx
import React, { useState } from 'react';
import { Select, Input, Button, Row, Col } from 'antd';
import { DownOutlined, UpOutlined } from '@ant-design/icons';
import { IoSearchOutline } from 'react-icons/io5';

const { Option } = Select;

const FilterComponent: React.FC = () => {
  const [showExtraFilters, setShowExtraFilters] = useState(false);

  // Toggle visibility of extra filters
  const toggleExtraFilters = () => setShowExtraFilters(!showExtraFilters);

  // Inline styles for the component
  const styles = {
    mainContainer: {
      padding: '20px',
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
  };

  return (
    <div style={styles.mainContainer}>
      {/* Top filters row */}
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
          <Select
            defaultValue="2024"
            style={styles.filterInput}
            placeholder="Select Year"
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

      {/* Extra filters row */}
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
            <Select
              defaultValue="2024"
              style={styles.filterInput}
              placeholder="Tariff"
            >
              <Option value="2024">2024</Option>
              <Option value="2023">2023</Option>
            </Select>
          </Col>
          <Col xs={24} sm={12} md={6} style={styles.filterGroup}>
            <Button style={styles.extraButton}>Reset</Button>
          </Col>
        </Row>
      )}
    </div>
  );
};

export default FilterComponent;
