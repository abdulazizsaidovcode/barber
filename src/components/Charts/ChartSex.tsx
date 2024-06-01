import { ApexOptions } from 'apexcharts';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import ReactApexChart from 'react-apexcharts';
import { dashboard_url } from '../../helpers/api';
import { config } from '../../helpers/token';

interface ChartThreeState {
    series: number[
        
    ];
}

const options: ApexOptions = {
    chart: {
        fontFamily: 'Satoshi, sans-serif',
        type: 'donut',
    },
    colors: ['#ffba08', '#faa307', '#f48c06', '#e85d04', '#dc2f02',],
    labels: ['5 stars', '4 stars', '3 stars', '2 stars', '1 star',],
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

const ChartSex: React.FC = () => {

    const [chart, setChart] = useState({
        one: 0,
        two: 0,
        three: 0,
        four: 0,
        five: 0,
    })
     
    useEffect(() => {
        axios
          .get(`${dashboard_url}web/diagram` , config)
          .then((response) => {
            setChart(response.data.body);
        
          })
          .catch(() => {
            console.error('There was an error fetching the data!');
          });
      }, []);
      
      
    

    const [state, setState] = useState<ChartThreeState>({
        series: [
            chart.five,
            chart.four,
            chart.three,
            chart.two,
            chart.one
        ],
    });

    const handleReset = () => {
        setState((prevState) => ({
            ...prevState,
            series: [
                chart.five,
                chart.four,
                chart.three,
                chart.two,
                chart.one],
        }));
    };
    handleReset;



    return (
        <>
            <div className="sm:px-7.5 col-span-12 rounded-3xl border border-stroke bg-white px-5 pb-5 pt-7.5 shadow-default dark:border-strokedark dark:bg-boxdark xl:col-span-4">
                <h1 className='font-semibold text-black text-xl dark:text-white'>Master rating</h1>
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
        </>

    );
};

export default ChartSex;
