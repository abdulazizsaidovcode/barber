import React, { useState } from 'react';
import { AutoComplete, Input, Select, DatePicker, Button } from 'antd';
import type { SelectProps, DatePickerProps } from 'antd';

const FirstTab = () => {
  const [options, setOptions] = useState<SelectProps<object>['options']>([]);

  const getRandomInt = (max: number, min = 0) =>
    Math.floor(Math.random() * (max - min + 1)) + min;

  const searchResult = (query: string) =>
    new Array(getRandomInt(5))
      .join('.')
      .split('.')
      .map((_, idx) => {
        const category = `${query}${idx}`;
        return {
          value: category,
          label: (
            <div className="flex justify-between">
              <span>
                Found {query} on{' '}
                <a
                  href={`https://s.taobao.com/search?q=${query}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-800"
                >
                  {category}
                </a>
              </span>
            </div>
          ),
        };
      });

  const handleSearch = (value: string) => {
    setOptions(value ? searchResult(value) : []);
  };

  const onSelect = (value: string) => {
    console.log('onSelect', value);
  };

  const handleChange = (value: { value: string; label: React.ReactNode }) => {
    console.log(value);
  };

  const onChange: DatePickerProps['onChange'] = (date, dateString) => {
    console.log(date, dateString);
  };

  return (
    <div className="p-4">
      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        <AutoComplete
          popupMatchSelectWidth={252}
          className="w-full md:w-1/3"
          options={options}
          onSelect={onSelect}
          onSearch={handleSearch}
          size="large"
        >
          <Input.Search
            size="large"
            placeholder="Search here"
            className="custom-search-input bg-white dark:bg-gray-800 dark:rounded-lg text-black dark:text-white"
          />
        </AutoComplete>

        <Select
          labelInValue
          defaultValue={{ value: 'toshkent' }}
          placeholder="Select a location"
          onChange={handleChange}
          className="w-full md:w-1/4 bg-white dark:bg-gray-800 dark:rounded-lg text-black dark:text-white border-none shadow-md"
          options={[
            {
              value: 'toshkent',
              label: 'Toshkent',
            },
            {
              value: 'qarshi',
              label: 'Qarshi',
            },
          ]}
        />

        <DatePicker
          onChange={onChange}
          picker="year"
          className="w-full md:w-1/4"
        />

        <Button type="primary" className="w-full md:w-auto">
          Download
        </Button>
      </div>
    </div>
  );
};

export default FirstTab;
