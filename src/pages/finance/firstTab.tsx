import { Button, Select } from 'antd';
import React, { useState } from 'react';

const FirstTab = () => {
  const handleChange = (value: { value: string; label: React.ReactNode }) => {
    console.log(value);
  };

  return (
    <div className="p-4">
      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex flex-col items-end justify-end w-[30%]">
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
          <div>
            {/* oporto */}
            <div className="flex items-center gap-2">
              <p className="dark:text-white">Turnover</p>
              <div className=" p-2 px-6 border-[1px] border-solid dark:border-white dark:text-white">
                490 000 000
              </div>
            </div>
            {/* oporto */}
            <div className="flex items-center gap-2">
              <p className="dark:text-white">Income</p>
              <div className=" p-2 px-6 border-[1px] border-solid dark:border-white dark:text-white">
                490 000 000
              </div>
            </div>
            {/* oporto */}
            <div className="flex items-center gap-2">
              <p className="dark:text-white">Consumption</p>
              <div className=" p-2 px-6 border-[1px] border-solid dark:border-white dark:text-white">
                490 000 000
              </div>
            </div>
            {/* oporto */}
            <div className="flex items-center gap-2">
              <p className="dark:text-white">Прибыль</p>
              <div className=" p-2 px-6 border-[1px] border-solid dark:border-white dark:text-white">
                490 000 000
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col items-end justify-end w-[30%]">
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
          <div>
            {/* oporto */}
            <div className="flex items-center gap-2">
              <p className="dark:text-white">Turnover</p>
              <div className=" p-2 px-6 border-[1px] border-solid dark:border-white dark:text-white">
                490 000 000
              </div>
            </div>
            {/* oporto */}
            <div className="flex items-center gap-2">
              <p className="dark:text-white">Income</p>
              <div className=" p-2 px-6 border-[1px] border-solid dark:border-white dark:text-white">
                490 000 000
              </div>
            </div>
            {/* oporto */}
            <div className="flex items-center gap-2">
              <p className="dark:text-white">Consumption</p>
              <div className=" p-2 px-6 border-[1px] border-solid dark:border-white dark:text-white">
                490 000 000
              </div>
            </div>
            {/* oporto */}
            <div className="flex items-center gap-2">
              <p className="dark:text-white">Прибыль</p>
              <div className=" p-2 px-6 border-[1px] border-solid dark:border-white dark:text-white">
                490 000 000
              </div>
            </div>
          </div>
        </div>
        <Button type="primary" className="w-full md:w-auto">
          Download
        </Button>
      </div>
    </div>
  );
};

export default FirstTab;
