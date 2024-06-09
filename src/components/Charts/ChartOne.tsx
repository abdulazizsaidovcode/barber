import { DatePicker } from 'antd';
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import ReactApexChart from 'react-apexcharts';
import { dashboard_url } from '../../helpers/api';
import { config } from '../../helpers/token';

const ChartOne = () => {
  const [data, setData] = useState([
    {
      "name": "JANUARY",
      "incomeTotal": 0
    },
    {
      "name": "FEBRUARY",
      "incomeTotal": 0
    },
    {
      "name": "MARCH",
      "incomeTotal": 0
    },
    {
      "name": "APRIL",
      "incomeTotal": 0
    },
    {
      "name": "MAY",
      "incomeTotal": 0
    },
    {
      "name": "JUNE",
      "incomeTotal": 0
    },
    {
      "name": "JULY",
      "incomeTotal": 0
    },
    {
      "name": "AUGUST",
      "incomeTotal": 0
    },
    {
      "name": "SEPTEMBER",
      "incomeTotal": 0
    },
    {
      "name": "OCTOBER",
      "incomeTotal": 0
    },
    {
      "name": "NOVEMBER",
      "incomeTotal": 0
    },
    {
      "name": "DECEMBER",
      "incomeTotal": 0
    }
  ]);

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
          setSeries([{ name: 'Income', data: newData }]);
        }
      })
      .catch(() => {
        console.error('There was an error fetching the data!');
      });
  }

  return (
    <div>
      <div className='flex justify-between gap-3 mb-5'>
        <h1 className='font-semibold text-black text-xl dark:text-white'>Income dynamics</h1>
        <DatePicker onChange={handleYearChange} picker="year" style={{ height: 35 }} />
      </div>
      <div className="col-span-12 rounded-3xl border border-stroke bg-white px-5 pt-7.5 pb-5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:col-span-6">
        <ReactApexChart options={options} series={series} type="line" height={350} />
      </div>
    </div>
  );
}

export default ChartOne;
