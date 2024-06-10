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

const initialOptions: ApexOptions = {
    chart: {
        fontFamily: 'Satoshi, sans-serif',
        type: 'donut',
    },
    colors: ['#000000', '#D9D9D9', '#E4E8EF'],
    labels: [],
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

const ChartEight: React.FC = () => {
    const { t } = useTranslation();
    const [state, setState] = useState<ChartThreeState>({
        series: [],
        labels: [],
    });

    const [options, setOptions] = useState<ApexOptions>(initialOptions);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = () => {
        axios
            .get(`${dashboard_url}web/popular/services/by/category`, config)
            .then((response) => {
                const data = response.data.body;
                const categories = data.map((item: any) => item.categoryName);
                const series = data.map((item: any) => item.percent);

                setState({
                    series: series,
                    labels: categories,
                });

                setOptions((prevOptions) => ({
                    ...prevOptions,
                    labels: categories,
                }));
            })
            .catch(() => {
                console.error('There was an error fetching the data!');
            });
    };

    return (
        <div className="sm:px-7.5 col-span-12 rounded-3xl border border-stroke bg-white px-5 pb-5 pt-7.5 shadow-default dark:border-strokedark dark:bg-boxdark xl:col-span-4">
            <h1 className='font-semibold text-black text-xl dark:text-white'>{t("Popular_services_by_category")}</h1>
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
    );
};

export default ChartEight;
