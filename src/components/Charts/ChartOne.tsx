import { DatePicker } from 'antd';
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import ReactApexChart from 'react-apexcharts';
import { dashboard_url } from '../../helpers/api';
import { config } from '../../helpers/token';
import { useTranslation } from 'react-i18next';

const ChartOne = () => {
  const { t } = useTranslation();
  // Necessary States
  const [series, setSeries] = useState([
    {
      name: 'Income',
      data: []
    }
  ]);

  const [options, setOptions] = useState<any>({
    chart: {
      type: 'line',
      height: 350,
      toolbar: {
        show: false,
      },
    },
    stroke: {
      curve: 'straight',
    },
    markers: {
      size: 4,
      colors: '#fff',
      strokeColors: ['#8005BA'],
      strokeWidth: 3,
    },
    xaxis: {
      categories: ['Янв', 'Февр', 'Март', 'Апр', 'Май', 'Июнь', 'Июль', 'Авг', 'Сен', 'Окт', 'Ноя', 'Дек'],
    },
    yaxis: {
      labels: {
        formatter: function (val: string) {
          return val.toLocaleString();
        }
      }
    },
    colors: ['#8005BA'],
  });

  const [year, setYear] = useState<string | number>(new Date().getFullYear());

  useEffect(() => {
    getData(year);
  }, [year]);

  const handleYearChange = (date: any, dateString: any) => {
    setYear(dateString);
  };

  function getData(value: string | number) {
    axios
      .get(`${dashboard_url}web/month-profit?year=${value}`, config)
      .then((response) => {
        const { data } = response;
        if (data && data.body) {
          const newData = data.body.map((item: any) => item.incomeTotal);
          const newCategories = data?.body?.map((item: any) => item.name);
          setSeries([{ name: 'Income', data: newData }]);
          setOptions((prevOptions: any) => ({
            ...prevOptions,
            xaxis: {
              ...prevOptions.xaxis,
              categories: newCategories,
            },
          }));
        }
      })
      .catch(() => {
        console.error('There was an error fetching the data!');
      });
  }

  return (
    <div>
      <div className='flex justify-between gap-3 mb-5'>
        <h1 className='font-semibold text-black text-xl dark:text-white'>{t("Income_dynamics")}</h1>
        <DatePicker onChange={handleYearChange} picker="year" placeholder={t("Select_year")} style={{ height: 35 }} />
      </div>
      <div className="rounded-3xl border border-stroke bg-white px-5 pt-7.5 pb-5 shadow-default dark:border-strokedark dark:bg-boxdark">
        <ReactApexChart options={options} series={series} type="line" height={350} />
      </div>
    </div>
  );
}

export default ChartOne;
