import { ApexOptions } from 'apexcharts';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import ReactApexChart from 'react-apexcharts';
import {dashboard_url } from '../../helpers/api';

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
  const [clientData , setClientData] = useState (
    [
    {
      "monthName": "JANUARY",
      "masterCount": 0,
      "clientCount": 0
    },
    {
      "monthName": "FEBRUARY",
      "masterCount": 0,
      "clientCount": 0
    },
    {
      "monthName": "MARCH",
      "masterCount": 0,
      "clientCount": 0
    },
    {
      "monthName": "APRIL",
      "masterCount": 0,
      "clientCount": 0
    },
    {
      "monthName": "MAY",
      "masterCount": 2,
      "clientCount": 7
    },
    {
      "monthName": "JUNE",
      "masterCount": 2,
      "clientCount": 7
    },
    {
      "monthName": "JULY",
      "masterCount": 2,
      "clientCount": 7
    },
    {
      "monthName": "AUGUST",
      "masterCount": 2,
      "clientCount": 7
    },
    {
      "monthName": "SEPTEMBER",
      "masterCount": 2,
      "clientCount": 7
    },
    {
      "monthName": "OCTOBER",
      "masterCount": 2,
      "clientCount": 7
    },
    {
      "monthName": "NOVEMBER",
      "masterCount": 2,
      "clientCount": 7
    },
    {
      "monthName": "DECEMBER",
      "masterCount": 2,
      "clientCount": 7
    }
  ] )
 const currentYear = new Date().getFullYear();
  useEffect(() => {
    axios
      .get(`${dashboard_url}web/masterVsClient?year=${currentYear}`)
      .then((response) => {
        setClientData(response.data.body);
      })
      .catch(() => {
        console.error('There was an error fetching the data!');
      });
  }, []);

  const [state, setState] = useState<ChartTwoState>({
    series: [
      {
        name: 'MasterCount',
        data: clientData.map((item)=>{
          return(
             item.masterCount ? item.masterCount:0
          )
        })
      },
      {
        name: 'Client Count',
        data: clientData.map((item)=>{
          return(
             item.clientCount ? item.clientCount:0
          )
        }),
      },
    ],
  });

  const handleReset = () => {
    setState((prevState) => ({
      ...prevState,
    }));
  };
  handleReset;

  return (
    <div className="col-span-12 rounded-sm border border-stroke bg-white p-7.5 shadow-default dark:border-strokedark dark:bg-boxdark xl:col-span-4">
      
      <div>
        <div id="chartTwo" className="-ml-5 -mb-9">
          <ReactApexChart
            options={options}
            series={state.series}
            type="bar"
            height={350}
          />
        </div>
      </div>
    </div>
  );
};

export default ChartTwo;
