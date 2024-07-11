import { ApexOptions } from 'apexcharts';
import React, { useState } from 'react';
import ReactApexChart from 'react-apexcharts';
import { useTranslation } from 'react-i18next';

interface ChartThreeState {
    series: number[];
}

const options: ApexOptions = {
    chart: {
        fontFamily: 'Satoshi, sans-serif',
        type: 'donut',
    },
    colors: ['#000000', '#D9D9D9', '#E4E8EF',],
    labels: ['Карта', 'Виртуальная карта', 'Наличные',],
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

const ChartSeven: React.FC = () => {
    const { t } = useTranslation();
    const [state, setState] = useState<ChartThreeState>({
        series: [65, 34, 12,],
    });

    const handleReset = () => {
        setState((prevState) => ({
            ...prevState,
            series: [65, 34, 12,],
        }));
    };
    handleReset;

    return (
        <>
         <div className="sm:px-7.5 col-span-12 rounded-3xl border border-stroke bg-white px-5 pb-5 pt-7.5 shadow-default dark:border-strokedark dark:bg-boxdark xl:col-span-4">
                <h1 className='font-semibold text-black text-xl dark:text-white'>{t("Payment_type_for_completed_entries")}</h1>
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

export default ChartSeven;
