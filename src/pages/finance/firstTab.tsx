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
    <div className='flex justify-center'>
      {/* Top Section */}
      <div className='flex sm:justify-between w-[700px] flex-wrap justify-center'>
        {/* Left Section */}
        <div>
          <div className='mb-[10px] flex justify-center'>
            <Select
              defaultValue="Select Country"
              className="w-[200px]"
              onChange={handleCountryChange}
            >
              <Option value="uzbekistan">Uzbekistan</Option>
              <Option value="kazakhstan">Kazakhstan</Option>
              <Option value="kyrgyzstan">Kyrgyzstan</Option>
            </Select>
          </div>
          <div className=''>
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
                  alignItems: 'center',
                  marginBottom: '10px',
                }}
              >
                <p className='w-[100px] ml-[10px] dark:text-white'>{item.label}:</p>
                <div className='border-2 border-black px-[50px] dark:border-white py-[10px]'
                >
                  <p className='dark:text-white'>{item.value}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        {/* Right Section */}
        <div>
          <div className='mb-[10px] flex justify-center'>
            <Select
              className='w-[200px]'
              defaultValue="Select Year"
              onChange={handleYearChange}
            >
              <Option value="2024">2024</Option>
              <Option value="2023">2023</Option>
              <Option value="2022">2022</Option>
            </Select>
          </div>
          <div>
            {[
              { label: 'Turnover', value: '49 000 000' },
              { label: 'Income', value: '60 500 000' },
              { label: 'Consumption', value: '30 500 000' },
              { label: 'Profit', value: '30 000 000' },
            ].map((item) => (
              <div
                key={item.label}
                className='flex items-center mb-[10px]'>
                <p className='mr-[10px] w-[100px] dark:text-white'>{item.label}:</p>
                <div className='border-2 border-black px-[50px] dark:border-white py-[10px]'>
                  <p className='dark:text-white'>{item.value}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FirstTab;