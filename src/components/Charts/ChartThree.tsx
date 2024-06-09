import { DatePicker } from 'antd';
import { ApexOptions } from 'apexcharts';
import React, { useState } from 'react';
import ReactApexChart from 'react-apexcharts';

interface ChartThreeState {
  series: number[];
}

const options: ApexOptions = {
  chart: {
    fontFamily: 'Satoshi, sans-serif',
    type: 'donut',
  },
  colors: ['#000000', '#D9D9D9', '#E4E8EF',],
  labels: ['Desktop', 'Tablet', 'Mobile',],
  legend: {
    show: true,
    position: 'bottom',
  },

  plotOptions: {
    pie: {
      donut: {
        size: '55%',
        background: 'transparent',
      },
    },
  },
  dataLabels: {
    enabled: false,
  },
  responsive: [
    {
      breakpoint: 2600,
      options: {
        chart: {
          width: 380,
        },
      },
    },
    {
      breakpoint: 640,
      options: {
        chart: {
          width: 200,
        },
      },
    },
  ],
};

const ChartThree: React.FC = () => {
  const [state, setState] = useState<ChartThreeState>({
    series: [65, 34, 12, 24],
  });

  const handleReset = () => {
    setState((prevState) => ({
      ...prevState,
      series: [65, 34, 12, 24],
    }));
  };
  handleReset;

  return (
    <div>
      <div className="mb-5 justify-between gap-4 sm:flex">
        <div className='flex gap-2 justify-between items-center'>
          <h1 className='font-semibold text-black text-2xl dark:text-white'>Subscription rates for client masters</h1>
          <DatePicker picker="year" style={{ height: 35 }} />
          <DatePicker picker="month" style={{ height: 35 }} />
        </div>
      </div>
      <div className="sm:px-7.5 col-span-12 rounded-3xl border border-stroke bg-white px-5 pb-5 pt-7.5 shadow-default dark:border-strokedark dark:bg-boxdark xl:col-span-4">
        <div className="mb-2">
          <div id="chartThree" className="mx-auto flex justify-center">
            <ReactApexChart
              options={options}
              series={state.series}
              type="donut"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChartThree;
