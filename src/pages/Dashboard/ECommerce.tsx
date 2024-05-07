import React, { useState } from 'react';
import CardDataStats from '../../components/CardDataStats';
// import ChartOne from '../../components/Charts/ChartOne';
import ChartThree from '../../components/Charts/ChartThree';
import ChartTwo from '../../components/Charts/ChartTwo';
import ChatCard from '../../components/Chat/ChatCard';
import MapOne from '../../components/Maps/MapOne';
import TableOne from '../../components/Tables/TableOne';
import DefaultLayout from '../../layout/DefaultLayout';
import { DatePicker, Select } from 'antd';
import ReactApexChart from 'react-apexcharts';
// import { Option } from 'antd/es/mentions';

const handleChange = (value: string) => {
  console.log(`selected ${value}`);
};

const ECommerce: React.FC = () => {
  // const [type, setType] = useState<string>('2024');
  return (
    <DefaultLayout>
      <div className=' block mb-5 md:flex md:justify-between lg:flex lg:justify-between xl:flex xl:justify-between'>
        <h1 className='font-semibold text-black text-xl dark:text-white'>General indicators</h1>
        <div className='gap-10 md:flex md:gap-10 lg:flex lg:gap-10 xl:flex xl:gap-10'>
          <Select
            className='mb-3'
            defaultValue="2024"
            style={{ width: 120 }}
            onChange={handleChange}
            options={[
              { value: '2024', label: '2024' },
              { value: '2025', label: '2025' },
              { value: '2026', label: '2026' },
            ]}
          />
          <DatePicker className='block mb-3 md:mb-0  dark:border-none  ' />
          <DatePicker className='block mb-3 md:mb-0' />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-7.5">
        <CardDataStats title="Мастера" total="1 684"  >
        </CardDataStats>
        <CardDataStats title="Total Profit" total="3 545"  >
        </CardDataStats>
        <CardDataStats title="Заказы" total="10 845"  >
        </CardDataStats>
        <CardDataStats title="Отмененные клиент/мастер" total="152 / 253"  >
        </CardDataStats>
        <CardDataStats title="Оборот общий" total="100 545 000"  >
        </CardDataStats>
        <CardDataStats title="Доход" total="20 785 500"  >
        </CardDataStats>
        <CardDataStats title="Отток клиентов" total="1 684"  >
        </CardDataStats>
        <CardDataStats title="Отток мастеров" total="10"  >
        </CardDataStats>
        <CardDataStats title="Отток клиентов" total="27"  >
        </CardDataStats>
        <CardDataStats title="Клиентов на 1 мастера усредненно" total="1 684"  >
          
        </CardDataStats>
        <CardDataStats title="Клиентов на 1 мастера усредненно" total="1 684"  >
       
        </CardDataStats>
          

      </div>
      <div className='flex mt-7 justify-between flex-wrap gap-2'>
        <h1 className='font-semibold text-black text-xl dark:text-white'>Dynamics of connecting masters and clients</h1>
        <Select
          defaultValue="2024"
          style={{ width: 120 }}
          onChange={handleChange}
          options={[
            { value: '2024', label: '2024' },
            { value: '2025', label: '2025' },
            { value: '2026', label: '2026' },
          ]}
        />
        <h1 className='font-semibold text-black text-xl dark:text-white'>Subscription rates for client masters</h1>
        <div className='flex gap-2'>
          <Select
            defaultValue="2024"
            style={{ width: 120 }}
            onChange={handleChange}
            options={[
              { value: '2024', label: '2024' },
              { value: '2025', label: '2025' },
              { value: '2026', label: '2026' },
            ]}
          />
          <Select
            defaultValue="May"
            style={{ width: 120 }}
            onChange={handleChange}
            options={[
              { value: 'January', label: 'January' },
              { value: 'February', label: 'February' },
              { value: 'March', label: 'March' },
              { value: 'Aprel', label: 'Aprel' },
              { value: 'May', label: 'May' },
            ]}
          />
        </div>
       </div>

      <div className="mt-4 grid grid-cols-12 gap-4 md:mt-6 md:gap-6 2xl:mt-7.5 2xl:gap-7.5">
        {/* <ChartOne /> */}
        <ChartTwo />
        <ChartThree />
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
