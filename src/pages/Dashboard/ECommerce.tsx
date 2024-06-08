import React, { useEffect, useState } from 'react';
import CardDataStats from '../../components/CardDataStats';
import ChartThree from '../../components/Charts/ChartThree';
import ChartTwo from '../../components/Charts/Connectingmastersandclients';
import DefaultLayout from '../../layout/DefaultLayout';
import { DatePicker, Input, Select } from 'antd';
import CardDataCharts from '../../components/CardDataCharts';
import ChartOne from '../../components/Charts/ChartOne';
import ChartFour from '../../components/Charts/ChartFour';
import ChartSex from '../../components/Charts/ChartSex';
import ChartSeven from '../../components/Charts/ChartSeven';
import ChartEight from '../../components/Charts/ChartEight';
import ChartNine from '../../components/Charts/ChartNine';
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import { dashboard_url } from '../../helpers/api';
import { config } from '../../helpers/token';
import { DGeneralIndecators } from '../../helpers/api-function/dashboard/Generalindicators';
import dashboardStore from '../../helpers/state_managment/dashboard/dashboardStore';

const ECommerce: React.FC = () => {
  const [datas, setDatas] = useState(
    {
      "clientCanselOrder": 0,
      "clientCount": 0,
      "customerDissatisfaction": 0,
      "income": 0,
      "masterAverageClient": 0,
      "masterCanselOrder": 0,
      "masterCount": 0,
      "masterDissatisfaction": 0,
      "negativeFeedbackInService": 0,
      "orderCount": 0,
      "positiveFeedbackInService": 0,
      "theOutgoingClient": 0,
      "theOutgoingMaster": 0,
      "totalTurnover": 0
    }
  );
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

  const { t, i18n } = useTranslation();
  const { RangePicker } = DatePicker;
  const { data, setData } = dashboardStore();

  const [year, setYear] = useState<string | undefined>(undefined);
  const [localDate, setLocalDate] = useState<string | undefined>(undefined);
  const [startDate, setStartDate] = useState<string | undefined>(undefined);
  const [endDate, setEndDate] = useState<string | undefined>(undefined);

  const handleYearChange = (date: any, dateString: any) => {
    setYear(dateString);
  };

  const handleLocalDateChange = (date: any, dateString: any) => {
    setLocalDate(dateString);
  };

  const handleRangeChange = (dates: any, dateStrings: [string, string]) => {
    setStartDate(dateStrings[0]);
    setEndDate(dateStrings[1]);
  };

  useEffect(() => {
    DGeneralIndecators({
      year,
      localDate,
      starDate: startDate,
      endDate,
      setDashdata: setData
    });
  }, [year, localDate, startDate, endDate]);




  return (
    <DefaultLayout>
      {/* generall indicators bolimi */}
      <section>
        <div className='block mb-5 md:flex md:justify-between lg:flex lg:justify-between xl:flex xl:justify-between'>
          <h1 className='font-semibold text-black text-xl dark:text-white'>
            {t("dashboard_main_text")}
          </h1>
          <div className='gap-5 flex flex-col md:flex-row md:gap-10 lg:flex-row lg:gap-10 xl:flex-row xl:gap-5'>
            <DatePicker onChange={handleYearChange} picker="year" style={{ height: 35 }} />
            <DatePicker placeholder="Select local date" onChange={handleLocalDateChange} />
            <RangePicker onChange={handleRangeChange} />
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 flex-wrap xl:grid-cols-4 2xl:gap-7.5">
          <CardDataStats title="Мастера" total={data.masterCount ? data.masterCount : 0} />
          <CardDataStats title="Клиенты" total={data.clientCount ? data.clientCount : 0} />
          <CardDataStats title="Заказы" total={data.orderCount ? data.orderCount : 0} />
          <CardDataStats title="Отмененные клиент/мастер" total={`${data.clientCanselOrder ? data.clientCanselOrder : 0} / ${data.clientCanselOrder ? data.clientCanselOrder : 0}`} />
          <CardDataStats title="Оборот общий" total={data.totalTurnover ? data.totalTurnover : 0} />
          <CardDataStats title="Доход" total={data.income ? data.income : 0} />
          <CardDataStats title="Отток клиентов" total={data.customerDissatisfaction ? data.customerDissatisfaction : 0} />
          <CardDataStats title="Отток мастеров" total={data.masterDissatisfaction ? data.masterDissatisfaction : 0} />
          <CardDataStats title="Клиентов на 1 мастера усредненно" total={data.masterAverageClient ? data.masterAverageClient : 0} />
          <CardDataCharts title="Клиентов на 1 мастера усредненно" firstTotal={data.positiveFeedbackInService} secondTotal={data.negativeFeedbackInService} />
        </div>
      </section>

      {/* generall indicators bolimi */}

      <section className='flex justify-between mt-20 gap-5'>
        <div className='flex flex-col w-1/2'>
          <div className='flex justify-between items-center'>
            <h1 className='font-semibold w-75 text-black text-2xl dark:text-white'>Dynamics of connecting masters and clients</h1>
            <DatePicker picker="year" style={{ height: 35 }} />
          </div>
          <div className="col-span-12 md:col-span-6 mt-5">
            <ChartTwo />
          </div>
        </div>
        <div className="mt-4 flex flex-col w-1/2">
          <div className='flex gap-2 justify-between items-center'>
            <h1 className='font-semibold text-black text-2xl dark:text-white'>Subscription rates for client masters</h1>
            <DatePicker picker="year" style={{ height: 35 }} />
            <DatePicker picker="month" style={{ height: 35 }} />
          </div>
          <div className=" mt-5">
            <ChartThree />
          </div>
        </div>
      </section>

      <div className='flex justify-between flex-wrap mt-5'>
        <div className='flex justify-between gap-3 '>
          <h1 className='font-semibold text-black text-xl dark:text-white'>Income dynamics</h1>
          <DatePicker picker="year" style={{ height: 35 }} />
        </div>
        <div className='flex gap-3 '>
          <h1 className='font-semibold text-black text-xl dark:text-white'>Profit dynamics</h1>
          <DatePicker picker="year" style={{ height: 35 }} />
        </div>
      </div>
      <div className="mt-4 grid grid-cols-12 gap-4 md:mt-6 md:gap-6 2xl:mt-7.5 2xl:gap-7.5 ">
        <ChartOne />
        <ChartFour />
      </div>
      <div className="mt-4 grid grid-cols-12 gap-4 md:mt-6 md:gap-6 2xl:mt-7.5 2xl:gap-7.5">
        <ChartSex />
        <ChartSeven />
        <ChartEight />
      </div>
      <div className="mt-4 grid grid-cols-12 gap-4 md:mt-6 md:gap-6 2xl:mt-7.5 2xl:gap-7.5">
      </div>
      <div className="mt-4 grid grid-cols-12 gap-4 md:mt-6 md:gap-6 2xl:mt-7.5 2xl:gap-7.5">
        <ChartNine />
      </div>
    </DefaultLayout>
  )
}

export default ECommerce
