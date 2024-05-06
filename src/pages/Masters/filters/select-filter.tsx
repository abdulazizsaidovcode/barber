import React from 'react';
import { Select } from 'antd';
import { ISelectFilter } from '../../../types/master.ts';

const SelectFilter = () => {
  const option: ISelectFilter[] = [
    {
      value: 'toshkent',
      label: 'Toshkent'
    },
    {
      value: 'qarshi',
      label: 'Qarshi'
    }
  ];

  const handleChange = (value: { value: string; label: React.ReactNode }) => {
    console.log(value);
  };

  return (
    <Select
      labelInValue
      placeholder="Select a location"
      onChange={handleChange}
      className="w-full md:w-1/4 bg-white dark:bg-gray-800 dark:rounded-lg text-black dark:text-white border-none shadow-md"
      options={option}
    />
  );
};

export default SelectFilter;