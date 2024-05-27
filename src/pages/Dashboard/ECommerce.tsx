  import React from 'react';
import CardDataStats from '../../components/CardDataStats';
import ChartThree from '../../components/Charts/ChartThree';
import ChartTwo from '../../components/Charts/ChartTwo';
import DefaultLayout from '../../layout/DefaultLayout';
import { DatePicker, Select } from 'antd';
import CardDataCharts from '../../components/CardDataCharts';
import ChartOne from '../../components/Charts/ChartOne';
import ChartFour from '../../components/Charts/ChartFour';
import ChartFive from '../../components/Charts/ChartFive';
import ChartSex from '../../components/Charts/ChartSex';
import ChartSeven from '../../components/Charts/ChartSeven';
import ChartEight from '../../components/Charts/ChartEight';
import ChartNine from '../../components/Charts/ChartNine';
import { useTranslation } from 'react-i18next';

const ECommerce: React.FC = () => {
  const { t, i18n } = useTranslation();

  return (
    <DefaultLayout>
      <div className='block mb-5 md:flex md:justify-between lg:flex lg:justify-between xl:flex xl:justify-between'>
        <h1 className='font-semibold text-black text-xl dark:text-white'>{t("dashboard_main_text")}</h1>
        <div className='gap-5 md:flex md:gap-10 lg:flex lg:gap-10 xl:flex xl:gap-5'>
          <Select
            className='w-40'
            defaultValue="2024"
            style={{ width: 120 }}
            options={[
              { value: '2024', label: '2024' },
              { value: '2025', label: '2025' },
              { value: '2026', label: '2026' },
            ]}
          />
          <DatePicker className='h-8 w-50' placeholder='Дата'/>
          <DatePicker className='h-8 w-50' placeholder='Период'/>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 flex-wrap xl:grid-cols-4 2xl:gap-7.5">
        <CardDataStats title="Мастера" total="1 684"  />
        <CardDataStats title="Total Profit" total="3 545"  />
        <CardDataStats title="Заказы" total="10 845"  />
        <CardDataStats title="Отмененные клиент/мастер" total="152 / 253"  />
        <CardDataStats title="Оборот общий" total="100 545 000"  />
        <CardDataStats title="Доход" total="20 785 500"  />
        <CardDataStats title="Отток клиентов" total="1 684"  />
        <CardDataStats title="Отток мастеров" total="10"  />
        <CardDataStats title="Отток клиентов" total="27" />
        <CardDataStats title="Клиентов на 1 мастера усредненно" total="1 684"  />
      </div>
      <div className='flex gap-5 mt-5 flex-wrap'>
        <CardDataCharts title="Клиентов на 1 мастера усредненно" firstTotal={1000} secondTotal={870} />
        <CardDataCharts title="Клиентов на 1 мастера усредненно" firstTotal={1000} secondTotal={870} />
      </div>
      <div className='flex mt-7 justify-between flex-wrap gap-2'>
        <h1 className='font-semibold text-black text-xl dark:text-white'>Dynamics of connecting masters and clients</h1>
        <Select
          defaultValue="2024"
          style={{ width: 120 }}
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
            options={[
              { value: '2024', label: '2024' },
              { value: '2025', label: '2025' },
              { value: '2026', label: '2026' },
            ]}
          />
          <Select
            defaultValue="May"
            style={{ width: 120 }}
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
        <ChartTwo />
        <ChartThree />
        <ChartFive />
      </div>
      <div className='flex justify-between flex-wrap mt-5'>
        <div className='flex justify-between gap-3 '>
          <h1 className='font-semibold text-black text-xl dark:text-white'>Income dynamics</h1>
          <Select
            defaultValue="2024"
            style={{ width: 120 }}
            options={[
              { value: '2024', label: '2024' },
              { value: '2025', label: '2025' },
              { value: '2026', label: '2026' },
            ]}
          />
        </div>
        <div className='flex gap-3 '>
          <h1 className='font-semibold text-black text-xl dark:text-white'>Profit dynamics</h1>
          <Select
            defaultValue="2024"
            style={{ width: 120 }}
            options={[
              { value: '2024', label: '2024' },
              { value: '2025', label: '2025' },
              { value: '2026', label: '2026' },
            ]}
          />
        </div>
      </div>
      <div className="mt-4 grid grid-cols-12 gap-4 md:mt-6 md:gap-6 2xl:mt-7.5 2xl:gap-7.5">
        <ChartOne />
        <ChartFour />
      </div>
      <div className="mt-4 grid grid-cols-12 gap-4 md:mt-6 md:gap-6 2xl:mt-7.5 2xl:gap-7.5">
        <ChartSex/>
        <ChartSeven/>
        <div className='w-80  grid gap-6'>
          <h1 className=' grid items-center font-semibold text-black text-xl dark:text-white'>Value</h1>
        <CardDataStats title="Клиентов на 1 мастера усредненно" total="1 684"  />
        <CardDataStats title="Клиентов на 1 мастера усредненно" total="1 684"  />
        </div>
      </div>
      <div className="mt-4 grid grid-cols-12 gap-4 md:mt-6 md:gap-6 2xl:mt-7.5 2xl:gap-7.5">
        <ChartEight/>
      </div>
      <div className="mt-4 grid grid-cols-12 gap-4 md:mt-6 md:gap-6 2xl:mt-7.5 2xl:gap-7.5">
        <ChartNine/>
      </div>
    </DefaultLayout>
  )
}

export default ECommerce
