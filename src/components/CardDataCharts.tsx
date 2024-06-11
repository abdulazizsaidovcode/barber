import React, { useState } from 'react';
import ReactApexChart from 'react-apexcharts';
import { ApexOptions } from 'apexcharts';
import CountUp from 'react-countup';

interface ChartThreeState {
  series: number[];
}

const options: ApexOptions = {
  chart: {
    fontFamily: 'Satoshi, sans-serif',
    type: 'donut',
  },
  colors: ['#000000', '#D9D9D9'],
  labels: ['Desktop', 'Table'],
  legend: {
    show: false,
    position: 'bottom',
  },
  plotOptions: {
    pie: {
      donut: {
        size: '65%',
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
          width: 180,
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

interface CardDataChartsProps {
  title: string;
  firstTotal: number;
  secondTotal: number;
}

const CardDataCharts: React.FC<CardDataChartsProps> = ({ title, firstTotal, secondTotal }) => {
  const [state, setState] = useState<ChartThreeState>({
    series: [secondTotal, firstTotal],
  });

  const handleReset = () => {
    setState((prevState) => ({
      ...prevState,
      series: [secondTotal, firstTotal]
    }));
  };
  handleReset;
  return (
    <div className="rounded-3xl border border-stroke bg-white py-6 px-7.5 shadow-default dark:border-strokedark flex-wrap dark:bg-boxdark w-full lg:w-[430px]">
      <div className=" flex items-center justify-between">
        <div>
          <span className="text-sm font-medium">{title}</span>
          <h4 className="text-title-md font-bold text-black dark:text-white"><CountUp end={firstTotal} duration={3}/> / <CountUp end={secondTotal} duration={3}/></h4>
        </div>
        <div className="flex justify-center">
          <ReactApexChart
            options={options}
            series={state.series}
            type="donut"
          />
        </div>
      </div>
    </div>
  );
};

export default CardDataCharts;