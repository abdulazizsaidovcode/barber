import { ApexOptions } from 'apexcharts';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import ReactApexChart from 'react-apexcharts';
import { dashboard_url } from '../../helpers/api';
import { DatePicker, Skeleton } from 'antd';
import { config } from '../../helpers/token';
import { useTranslation } from 'react-i18next';

const ChartTwo: React.FC = () => {
  const { t } = useTranslation();
  const [clientData, setClientData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [dates, setDates] = useState<string | number>(new Date().getFullYear());
  console.log();

  const [series, setSeries] = useState([
    { name: 'MasterCount', data: [] },
    { name: 'Client Count', data: [] },
  ]);

  const options: ApexOptions = {
    colors: ['#000000', '#D9D9D9'],
    chart: {
      fontFamily: 'Satoshi, sans-serif',
      type: 'bar',
      height: 335,
      stacked: true,
      toolbar: {
        show: false,
      },
      zoom: {
        enabled: false,
      },
    },
    responsive: [
      {
        breakpoint: 1536,
        options: {
          plotOptions: {
            bar: {
              borderRadius: 0,
              columnWidth: '59%',
            },
          },
        },
      },
    ],
    plotOptions: {
      bar: {
        horizontal: false,
        borderRadius: 0,
        columnWidth: '25%',
        borderRadiusApplication: 'end',
        borderRadiusWhenStacked: 'last',
      },
    },
    dataLabels: {
      enabled: false,
    },
    xaxis: {
      categories: [
        t('january'),
        t('february'),
        t('march'),
        t('april'),
        t('may'),
        t('june'),
        t('july'),
        t('august'),
        t('september'),
        t('october'),
        t('november'),
        t('december'),
      ],
    },
    legend: {
      position: 'top',
      horizontalAlign: 'left',
      fontFamily: 'Satoshi',
      fontWeight: 500,
      fontSize: '14px',
      markers: {
        radius: 99,
      },
    },
    fill: {
      opacity: 1,
    },
  };

  useEffect(() => {
    getData(dates);
  }, [dates]);

  const handleYearChange = (date: any, dateString: any) => {
    setDates(dateString);
    console.log(dateString);
        
  };

  function getData(value: string | number) {
    setLoading(true);
    axios
      .get(`${dashboard_url}web/masterVsClient?year=${value}`, config)
      .then((response) => {
        const { data } = response;
        if (data?.body) {
          const newData = data

          setClientData(newData);

          setSeries([
            {
              name: t('MasterCount'),
              data: data?.body?.map((item: any) => item.masterCount),
            },
            {
              name: t('Client_Count'),
              data: data?.body?.map((item: any) => item.clientCount),
            },
          ]);
        }
      })
      .catch(() => {
        console.error('There was an error fetching the data!');
      })
      .finally(() => {
        setLoading(false);
      });
  }
  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-5">
        <h1 className="font-semibold w-75 text-black text-2xl dark:text-white">
          {t('Dynamics_of_connecting_masters_and_clients')}
        </h1>
        <DatePicker
          onChange={handleYearChange}
          picker="year"
          // value={dates}
          placeholder={t('Select_year')}
          style={{ height: 35 }}
        />
      </div>
      <div className="rounded-3xl border border-stroke bg-white p-7.5 shadow-default dark:border-strokedark dark:bg-boxdark">
        <div id="chartTwo" className="-ml-5 -mb-9 mx-auto">
          {loading ? (
            <Skeleton active paragraph={{ rows: 10 }} />
          ) : (
            <div>
              <div id="chartOne" className="-ml-5">
                <ReactApexChart
                  options={options}
                  series={series}
                  type="bar"
                  height={350}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChartTwo;
