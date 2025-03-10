import { ApexOptions } from 'apexcharts';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import ReactApexChart from 'react-apexcharts';
import { dashboard_url } from '../../helpers/api';
import { config } from '../../helpers/token';
import { useTranslation } from 'react-i18next';

interface ChartThreeState {
    series: number[];
    labels: string[];
}

const defaultOptions: ApexOptions = {
    chart: {
        fontFamily: 'Satoshi, sans-serif',
        type: 'donut',
    },
    colors: ['#ffba08', '#faa307', '#f48c06', '#e85d04', '#dc2f02'],
    labels: ['5 stars', '4 stars', '3 stars', '2 stars', '1 star'],
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

const ChartMasterRate: React.FC = () => {
    const { t } = useTranslation();
    const [options, setOptions] = useState<ApexOptions>(defaultOptions);
    const [state, setState] = useState<ChartThreeState>({
        series: [0, 0, 0, 0, 0],
        labels: ['5 stars', '4 stars', '3 stars', '2 stars', '1 star'],
    });

    useEffect(() => {
        axios
            .get(`${dashboard_url}web/diagram`, config)
            .then((response) => {
                const data = response?.data?.body;
                const series = [
                    data.five,
                    data.four,
                    data.three,
                    data.two,
                    data.one,
                ];

                // Check if all values are 0
                const allZero = series.every(value => value === 0);
                if (allZero) {
                    setState({
                        series: [1],
                        labels: [t("no_info")],
                    });
                    setOptions({
                        ...defaultOptions,
                        labels: [t("no_info")],
                        colors: ['#E4E8EF'],
                    });
                } else {
                    setState({
                        series,
                        labels: ['5 stars', '4 stars', '3 stars', '2 stars', '1 star'],
                    });
                    setOptions({
                        ...defaultOptions,
                        labels: ['5 stars', '4 stars', '3 stars', '2 stars', '1 star'],
                    });
                }
            })
            .catch(() => {
                console.error('There was an error fetching the data!');
            });
    }, []);

    return (
        <>
            <div className="sm:px-7.5 col-span-12 rounded-3xl border border-stroke bg-white px-5 pb-5 pt-7.5 shadow-default dark:border-strokedark dark:bg-boxdark xl:col-span-4">
                <h1 className='font-semibold text-black text-xl dark:text-white'>{t("Master_rating")}</h1>
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

export default ChartMasterRate;
