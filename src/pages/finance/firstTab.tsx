import React from 'react';
import { Select } from 'antd';

const { Option } = Select;

const FirstTab: React.FC = () => {
  // Handling changes for both selects
  const handleCountryChange = (value: string) => {
    console.log('Selected Country:', value);
  };

  const handleYearChange = (value: string) => {
    console.log('Selected Year:', value);
  };

  return (
    <div>
      {/* Top Section */}
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        {/* Left Section */}
        <div style={{ marginRight: '20px' }}>
          <div style={{ marginBottom: '10px' }}>
            <Select
              defaultValue="Select Country"
              style={{ width: '200px' }}
              onChange={handleCountryChange}
            >
              <Option value="uzbekistan">Uzbekistan</Option>
              <Option value="kazakhstan">Kazakhstan</Option>
              <Option value="kyrgyzstan">Kyrgyzstan</Option>
            </Select>
          </div>
          {[
            { label: 'Turnover', value: '49 000 000' },
            { label: 'Income', value: '60 500 000' },
            { label: 'Consumption', value: '30 500 000' },
            { label: 'Profit', value: '30 000 000' },
          ].map((item) => (
            <div
              key={item.label}
              style={{
                display: 'flex',
                marginBottom: '10px',
                alignItems: 'center',
              }}
            >
              <p style={{ marginRight: '10px' }}>{item.label}</p>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  border: '1px solid black',
                  padding: '10px 30px',
                }}
              >
                {item.value}
              </div>
            </div>
          ))}
        </div>
        {/* Right Section */}
        <div>
          <div style={{ marginBottom: '10px' }}>
            <Select
              defaultValue="Select Year"
              style={{ width: '200px' }}
              onChange={handleYearChange}
            >
              <Option value="2024">2024</Option>
              <Option value="2023">2023</Option>
              <Option value="2022">2022</Option>
            </Select>
          </div>
          {[
            { label: 'Turnover', value: '49 000 000' },
            { label: 'Income', value: '60 500 000' },
            { label: 'Consumption', value: '30 500 000' },
            { label: 'Profit', value: '30 000 000' },
          ].map((item) => (
            <div
              key={item.label}
              style={{
                display: 'flex',
                marginBottom: '10px',
                alignItems: 'center',
              }}
            >
              <p style={{ marginRight: '10px' }}>{item.label}</p>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  border: '1px solid black',
                  padding: '10px 30px',
                }}
              >
                {item.value}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FirstTab;
