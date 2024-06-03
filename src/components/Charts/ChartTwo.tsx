import { ApexOptions } from 'apexcharts';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import ReactApexChart from 'react-apexcharts';
import { dashboard_url } from '../../helpers/api';

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
    categories: ['January', 'February', 'March', 'April', 'May', 'Juny', 'July', 'August', 'September', 'October', 'November', 'December'],
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

interface ChartTwoState {
  series: {
    name: string;
    data: number[];
  }[];
}

const ChartTwo: React.FC = () => {
  const [clientData, setClientData] = useState([]);
  const [series, setSeries] = useState<ChartTwoState['series']>([
    { name: 'MasterCount', data: [] },
    { name: 'Client Count', data: [] },
  ]);

  const currentYear = new Date().getFullYear();
  useEffect(() => {
    axios
      .get(`${dashboard_url}web/masterVsClient?year=${currentYear}`)
      .then((response) => {
        const { data } = response;
        if (data && data.body) {
          const newData = data.body.map((item: any) => ({
            masterCount: item.masterCount ? item.masterCount : 0,
            clientCount: item.clientCount ? item.clientCount : 0,
          }));
          setClientData(newData);
          setSeries([
            { name: 'MasterCount', data: newData.map((item) => item.masterCount) },
            { name: 'Client Count', data: newData.map((item) => item.clientCount) },
           
          ]);
        }
      })
      .catch(() => {
        console.error('There was an error fetching the data!');
      });
  }, [currentYear]);

  return (
    <div className="col-span-12 rounded-3xl border border-stroke bg-white p-7.5 shadow-default dark:border-strokedark dark:bg-boxdark xl:col-span-4">
      
      <div>
        <div id="chartTwo" className="-ml-5 -mb-9">
          <ReactApexChart
            options={options}
            series={series}
            type="bar"
            height={350}
          />
        </div>
      </div>
    </div>
  );
};

export default ChartTwo;
