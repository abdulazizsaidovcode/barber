import React, { useEffect, useState } from 'react';
import CardDataStats from '../../components/CardDataStats';
import ChartThree from '../../components/Charts/ChartThree';
import ChartTwo from '../../components/Charts/Connectingmastersandclients';
import DefaultLayout from '../../layout/DefaultLayout';
import { DatePicker, Skeleton } from 'antd';
import CardDataCharts from '../../components/CardDataCharts';
import ChartOne from '../../components/Charts/ChartOne';
import ChartFour from '../../components/Charts/ChartFour';
import ChartSex from '../../components/Charts/ChartSex';
import ChartSeven from '../../components/Charts/ChartSeven';
import ChartEight from '../../components/Charts/ChartEight';
import ChartNine from '../../components/Charts/ChartNine';
import { useTranslation } from 'react-i18next';
import { DGeneralIndecators } from '../../helpers/api-function/dashboard/Generalindicators';
import dashboardStore from '../../helpers/state_managment/dashboard/dashboardStore';

const ECommerce: React.FC = () => {
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
            <DatePicker placeholder={t("Select_year")} onChange={handleYearChange} picker="year" style={{ height: 35 }} />
            <DatePicker placeholder={t("Select_local_date")} onChange={handleLocalDateChange} />
            <RangePicker onChange={handleRangeChange} placeholder={[t("Select_start_date"), t("Select_end_date")]} />
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 flex-wrap xl:grid-cols-4 2xl:gap-7.5">
<<<<<<< HEAD
          <CardDataStats title={t("master")} total={data.masterCount ? data.masterCount : 0} />
          <CardDataStats title={t("siderbar_client")} total={data.clientCount ? data.clientCount : 0} />
          <CardDataStats title={t("Orders")} total={data.orderCount ? data.orderCount : 0} />
          <CardDataStats title={t("Canceled_client_master")} total={`${data.clientCanselOrder ? data.clientCanselOrder : 0} / ${data.clientCanselOrder ? data.clientCanselOrder : 0}`} />
          <CardDataStats title={t("Total_turnover")} total={data.totalTurnover ? data.totalTurnover : 0} />
          <CardDataStats title={t("Income")} total={data.income ? data.income : 0} />
          <CardDataStats title={t("Customer_churn")} total={data.customerDissatisfaction ? data.customerDissatisfaction : 0} />
          <CardDataStats title={t("Master_churn")} total={data.masterDissatisfaction ? data.masterDissatisfaction : 0} />
          <CardDataStats title={t("Clients_per_1_specialist_on_average")} total={data.masterAverageClient ? data.masterAverageClient : 0} />
          <CardDataCharts title={t("Clients_per_1_specialist_on_average")} firstTotal={data.positiveFeedbackInService} secondTotal={data.negativeFeedbackInService} />
=======
          {data.masterCount !== undefined ? <CardDataStats title="Мастера" total={data.masterCount} /> : <Skeleton.Input active />}
          {data.clientCount !== undefined ? <CardDataStats title="Клиенты" total={data.clientCount} /> : <Skeleton.Input active />}
          {data.orderCount !== undefined ? <CardDataStats title="Заказы" total={data.orderCount} /> : <Skeleton.Input active />}
          {data.clientCanselOrder !== undefined && data.masterCanselOrder !== undefined ? <CardDataStats title="Отмененные клиент/мастер" total={`${data.clientCanselOrder} / ${data.masterCanselOrder}`} /> : <Skeleton.Input active />}
          {data.totalTurnover !== undefined ? <CardDataStats title="Оборот общий" total={data.totalTurnover} /> : <Skeleton.Input active />}
          {data.income !== undefined ? <CardDataStats title="Доход" total={data.income} /> : <Skeleton.Input active />}
          {data.customerDissatisfaction !== undefined ? <CardDataStats title="Отток клиентов" total={data.customerDissatisfaction} /> : <Skeleton.Input active />}
          {data.masterDissatisfaction !== undefined ? <CardDataStats title="Отток мастеров" total={data.masterDissatisfaction} /> : <Skeleton.Input active />}
          {data.masterAverageClient !== undefined ? <CardDataStats title="Клиентов на 1 мастера усредненно" total={data.masterAverageClient} /> : <Skeleton.Input active />}
          {data.positiveFeedbackInService !== undefined && data.negativeFeedbackInService !== undefined ? <CardDataCharts title="Клиентов на 1 мастера усредненно" firstTotal={data.positiveFeedbackInService} secondTotal={data.negativeFeedbackInService} /> : <Skeleton.Input active />}
>>>>>>> 52c43b15b92b00363fd93efe659188e645518d97
        </div>
      </section>

      {/* generall indicators bolimi */}

<<<<<<< HEAD
      <section className='flex justify-between mt-20 gap-5'>
        <div className='flex flex-col w-1/2'>
          <div className='flex justify-between items-center'>
            <h1 className='font-semibold w-75 text-black text-2xl dark:text-white'>{t("Dynamics_of_connecting_masters_and_clients")}</h1>
            <DatePicker picker="year" placeholder={t("Select_year")} style={{ height: 35 }} />
          </div>
          <div className="col-span-12 md:col-span-6 mt-5">
            <ChartTwo />
          </div>
        </div>
        <div className="mt-4 flex flex-col w-1/2">
          <div className='flex gap-2 justify-between items-center'>
            <h1 className='font-semibold text-black text-2xl dark:text-white'>{t("Subscription_rates_for_client_masters")}</h1>
            <DatePicker picker="year" placeholder={t("Select_year")} style={{ height: 35 }} />
            <DatePicker picker="month" placeholder={t("Select_month")} style={{ height: 35 }} />
          </div>
          <div className=" mt-5">
            <ChartThree />
          </div>
=======
      <section className='flex md:flex-row flex-col justify-between mt-20 gap-5'>
        <div className='flex md:w-1/2 w-full'>
          <ChartTwo />
        </div>
        <div className="flex md:w-1/2 w-full">
          <ChartThree />
>>>>>>> 52c43b15b92b00363fd93efe659188e645518d97
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
        <ChartSex />
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
