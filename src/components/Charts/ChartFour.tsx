import { ApexOptions } from 'apexcharts';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import ReactApexChart from 'react-apexcharts';
import { dashboard_url } from '../../helpers/api';
import { DatePicker, Skeleton } from 'antd';
import { config } from '../../helpers/token';
import { useTranslation } from 'react-i18next';

const initialOptions: ApexOptions = {
  legend: {
    show: false,
    position: 'top',
    horizontalAlign: 'left',
  },
  colors: ['#8005BA', '#000000'],
  chart: {
    fontFamily: 'Satoshi, sans-serif',
    height: 335,
    type: 'area',
    dropShadow: {
      enabled: false,
      color: '#623CEA14',
      top: 10,
      blur: 4,
      left: 0,
      opacity: 0.1,
    },
    toolbar: {
      show: false,
    },
  },
  responsive: [
    {
      breakpoint: 1024,
      options: {
        chart: {
          height: 300,
        },
      },
    },
    {
      breakpoint: 1366,
      options: {
        chart: {
          height: 350,
        },
      },
    },
  ],
  stroke: {
    width: [2, 2],
    curve: 'straight',
  },
  grid: {
    xaxis: {
      lines: {
        show: true,
      },
    },
    yaxis: {
      lines: {
        show: true,
      },
    },
  },
  dataLabels: {
    enabled: false,
  },
  markers: {
    size: 4,
    colors: '#fff',
    strokeColors: ['#3056D3', '#80CAEE', '#D9D9D9'],
    strokeWidth: 3,
    strokeOpacity: 0.9,
    strokeDashArray: 0,
    fillOpacity: 1,
    discrete: [],
    hover: {
      size: undefined,
      sizeOffset: 5,
    },
  },
  xaxis: {
    type: 'category',
    categories: Array.from({ length: 12 }, (_, i) => i + 1),
    axisBorder: {
      show: false,
    },
    axisTicks: {
      show: false,
    },
  },
  yaxis: {
    title: {
      style: {
        fontSize: '0px',
      },
    },
  },
};

interface ChartOneState {
  series: {
    name: string;
    data: number[];
  }[];
}

const ChartFour: React.FC = () => {
  const { t } = useTranslation();
  const [chart, setChart] = useState<
    {
      incomeTotal: number;
      name: string;
    }[]
  >([]);

  const [year, setYear] = useState(new Date().getFullYear());
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [options, setOptions] = useState(initialOptions);

  const fetchData = () => {
    setLoading(true);
    setError('');
    axios
      .get(`${dashboard_url}web/month-profit?year=${year}`, config)
      .then((response) => {
        if (response.data.body && response.data.body.length > 0) {
          setChart(response.data.body);
        } else {
          setError(t("No_data_available"));
        }
      })
      .catch(() => {
        setError(t("There_was_an_error_fetching_the_data"));
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchData();
  }, [year]);

  useEffect(() => {
    setState({
      series: [
        {
          name: 'Income',
          data: chart.map((item) => item.incomeTotal || 0),
        },
      ],
    });

    setOptions((prevOptions) => ({
      ...prevOptions,
      xaxis: {
        ...prevOptions.xaxis,
        categories: chart.map((item) => item.name),
      },
    }));
  }, [chart]);

  const [state, setState] = useState<ChartOneState>({
    series: [
      {
        name: 'Income',
        data: [],
      },
    ],
  });

  const handleYearChange = (date: any, dateString: any) => {
    setYear(parseInt(dateString, 10));
  };

  return (
    <>
      <div className='flex gap-3 mb-5'>
        <h1 className='font-semibold text-black text-xl dark:text-white '>{t("Profit_dynamics")}</h1>
        <DatePicker onChange={handleYearChange} picker="year" placeholder={t("Select_year")} style={{ height: 35 }} />
      </div>
      <div className="col-span-12 rounded-3xl border border-stroke bg-white px-5 pt-7.5 pb-5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:col-span-6">
        <div>
          <div id="chartOne" className="-ml-5">
            {loading ? (
              <Skeleton active paragraph={{ rows: 10 }} />
            ) : error ? (
              <div>{error}</div>
            ) : (
              <div>
                <div id="chartOne" className="-ml-5">
                  <ReactApexChart
                    options={options}
                    series={state.series}
                    type="line"
                    height={350}
                  />
                </div>
              </div>
            )}
            {/* {loading ? "" :
              <ReactApexChart
                options={options}
                series={state.series}
                type="line"
                height={350}
              />} */}
          </div>
        </div>
      </div>
    </>
  );
};

export default ChartFour;
