import React, { useState } from 'react';
import CardDataStats from '../../components/CardDataStats';
import ChartOne from '../../components/Charts/ChartOne';
import ChartThree from '../../components/Charts/ChartThree';
import ChartTwo from '../../components/Charts/ChartTwo';
import ChatCard from '../../components/Chat/ChatCard';
import MapOne from '../../components/Maps/MapOne';
import TableOne from '../../components/Tables/TableOne';
import DefaultLayout from '../../layout/DefaultLayout';
import { DatePicker, Select } from 'antd';
import { Option } from 'antd/es/mentions';
import { DatePickerType } from 'antd/es/date-picker';

const ECommerce: React.FC = () => {
  const [type, setType] = useState<string>('2024');
  return (
    <DefaultLayout>
      <div className= ' block mb-5 md:flex md:justify-between lg:flex lg:justify-between xl:flex xl:justify-between'>
        <h1 className='font-semibold text-black text-3xl dark:text-white'>General indicators</h1>
        <div className='gap-10 md:flex md:gap-10 lg:flex lg:gap-10 xl:flex xl:gap-10'>
          <Select value={type} onChange={setType} className='block w-full h-full md:w-30 lg:w-30 xl:w-30 mb-3  '>
            <Option value="year">2025</Option>
            <Option value="year">2026</Option>
            <Option value="year">2027</Option>
            <Option value="year">2028</Option>
            <Option value="year">2029</Option>
            <Option value="year">2030</Option>
          </Select>
          <DatePicker className='block mb-3 md:mb-0 ' />
          <DatePicker className='block mb-3 md:mb-0' />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-7.5">
        <CardDataStats title="Total views" total="$3.456K"  >
        </CardDataStats>
        <CardDataStats title="Total Profit" total="$45,2K"  >
        </CardDataStats>
      </div>

      <div className="mt-4 grid grid-cols-12 gap-4 md:mt-6 md:gap-6 2xl:mt-7.5 2xl:gap-7.5">
        <ChartOne />
        <ChartTwo />
        <ChartThree />
        <MapOne />
        <div className="col-span-12 xl:col-span-8">
          <TableOne />
        </div>
        <ChatCard />
      </div>
    </DefaultLayout>
  );
};

export default ECommerce;
