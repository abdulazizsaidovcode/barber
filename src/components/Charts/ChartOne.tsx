import React, { useState } from 'react';
import ReactApexChart from 'react-apexcharts';

const ChartOne = () => {
  const [data , setData] = useState([
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

  ])
  const [series, setSeries] = useState([
    {
      name: 'Income',
      data: [350, 330, 320, 340, 360, 360, 340, 320]
    }
  ]);

  
  const [options, setOptions] = useState({
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
      categories: ['Янв', 'февр', 'март', 'апр', 'май', 'июнь', 'июль', 'авг'],
    },
    yaxis: {
      labels: {
        formatter: function (val) {
          return val.toLocaleString();
        }
      }
    },
    colors: ['#8005BA'],
  });

  return (
    <div className="col-span-12 rounded-3xl border border-stroke bg-white px-5 pt-7.5 pb-5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:col-span-6">
      <ReactApexChart options={options} series={series} type="line" height={350} />
    </div>
  );
}

export default ChartOne;
