import React, { useEffect, useState } from 'react';
import CardDataStats from '../../components/CardDataStats';
import ChartThree from '../../components/Charts/ChartThree';
import ChartTwo from '../../components/Charts/Connectingmastersandclients';
import DefaultLayout from '../../layout/DefaultLayout';
import { DatePicker, Skeleton } from 'antd';
import CardDataCharts from '../../components/CardDataCharts';
import ChartOne from '../../components/Charts/ChartOne';
import ChartFour from '../../components/Charts/ChartFour';
import ChartSeven from '../../components/Charts/ChartSeven';
import ChartEight from '../../components/Charts/ChartEight';
import ChartNine from '../../components/Charts/ChartNine';
import { useTranslation } from 'react-i18next';
import { DGeneralIndecators } from '../../helpers/api-function/dashboard/Generalindicators';
import dashboardStore from '../../helpers/state_managment/dashboard/dashboardStore';
import ChartMasterRate from '../../components/Charts/ChartSex';

const ECommerce: React.FC = () => {
  const { t } = useTranslation();
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
            <DatePicker placeholder={t("Select_year")} onChange={handleYearChange} picker="year" style={{ height: 35 }} />
            <DatePicker placeholder={t("Select_local_date")} onChange={handleLocalDateChange} />
            <RangePicker onChange={handleRangeChange} placeholder={[t("Select_start_date"), t("Select_end_date")]} />
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 flex-wrap xl:grid-cols-4 2xl:gap-7.5">
          {data.masterCount !== undefined ? <CardDataStats title={t("master")} total={data.masterCount} /> : <Skeleton.Input active />}
          {data.clientCount !== undefined ? <CardDataStats title={t("siderbar_client")} total={data.clientCount} /> : <Skeleton.Input active />}
          {data.orderCount !== undefined ? <CardDataStats title={t("Orders")} total={data.orderCount} /> : <Skeleton.Input active />}
          {data.clientCanselOrder !== undefined && data.masterCanselOrder !== undefined ? <CardDataStats title={t("Canceled_client_master")} total={`${data.clientCanselOrder} / ${data.masterCanselOrder}`} /> : <Skeleton.Input active />}
          {data.totalTurnover !== undefined ? <CardDataStats title={t("Total_turnover")} total={data.totalTurnover} /> : <Skeleton.Input active />}
          {data.income !== undefined ? <CardDataStats title={t("Income")} total={data.income} /> : <Skeleton.Input active />}
          {data.customerDissatisfaction !== undefined ? <CardDataStats title={t("Customer_churn")} total={data.customerDissatisfaction} /> : <Skeleton.Input active />}
          {data.masterDissatisfaction !== undefined ? <CardDataStats title={t("Master_churn")} total={data.masterDissatisfaction} /> : <Skeleton.Input active />}
          {data.masterAverageClient !== undefined ? <CardDataStats title={t("Clients_per_1_specialist_on_average")} total={data.masterAverageClient} /> : <Skeleton.Input active />}
          {data.positiveFeedbackInService !== undefined && data.negativeFeedbackInService !== undefined ? <CardDataCharts title={t("Clients_per_1_specialist_on_average")} firstTotal={data.positiveFeedbackInService} secondTotal={data.negativeFeedbackInService} /> : <Skeleton.Input active />}
        </div>
      </section>

      {/* generall indicators bolimi */}

      <section className='flex md:flex-row flex-col justify-between mt-20 gap-5'>
        <div className='flex md:w-1/2 w-full'>
          <ChartTwo />
        </div>
        <div className="flex md:w-1/2 w-full">
          <ChartThree />
        </div>
      </section>

      {/* Income dynamics */}

      <div className="mt-4 w-full gap-5 flex md:flex-row flex-col">
        <div className='md:w-1/2 w-full'>
          <ChartOne />
        </div>
        <div className='md:w-1/2 w-full'>
          <ChartFour />
        </div>
      </div>
      {/* Income dynamics */}

      <div className="mt-4 grid grid-cols-12 gap-4 md:mt-6 md:gap-6 2xl:mt-7.5 2xl:gap-7.5">
        <ChartMasterRate />
        <ChartSeven />
        <ChartEight />
      </div>

      <div className="mt-4 grid grid-cols-12 gap-4 md:mt-6 md:gap-6 2xl:mt-7.5 2xl:gap-7.5">
        <ChartNine />
      </div>
    </DefaultLayout>
  )
}

export default ECommerce;
