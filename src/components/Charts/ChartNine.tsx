import { DatePicker, Skeleton } from 'antd';
import { ApexOptions } from 'apexcharts';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import ReactApexChart from 'react-apexcharts';
import { dashboard_url } from '../../helpers/api';
import { config } from '../../helpers/token';
import moment from 'moment';

const initialOptions: ApexOptions = {
  legend: {
    show: false,
    position: 'top',
    horizontalAlign: 'left',
  },
  colors: ['#D9D9D9', '#000000'],
  chart: {
    fontFamily: 'Satoshi, sans-serif',
    height: 335,
    type: 'bar',
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
    categories: [],
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
    min: 0,
    max: 100,
  },
};

interface ChartOneState {
  series: {
    name: string;
    data: number[];
  }[];
}

const ChartNine: React.FC = () => {
  const [chart, setChart] = useState<{ incomeTotal: number; name: string }[]>([]);
  const [state, setState] = useState<ChartOneState>({
    series: [
      {
        name: 'Income',
        data: [],
      },
    ],
  });

  const [year, setYear] = useState<number | undefined>(undefined);
  const [month, setMonth] = useState<string | undefined>(undefined);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [options, setOptions] = useState(initialOptions);

  const fetchData = () => {
    setLoading(true);
    setError('');

    let url = `${dashboard_url}web/regions`;
    if (year && month) {
      url += `?year=${year}&month=${month}`;
    } else if (year) {
      url += `?year=${year}`;
    } else if (month) {
      url += `?month=${month}`;
    }

    axios
      .get(url, config)
      .then((response) => {
        if (response.data.body && response.data.body.length > 0) {
          setChart(response.data.body);
        } else {
          setError('No data available');
        }
      })
      .catch(() => {
        setError('There was an error fetching the data!');
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchData(); // Fetch data initially without any parameters
  }, []);

  useEffect(() => {
    if (year !== undefined || month !== undefined) {
      fetchData(); // Fetch data with selected year and/or month
    }
  }, [year, month]);

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

  const handleYearChange = (date: any, dateString: any) => {
    setYear(parseInt(dateString, 10));
  };

  const handleMonthChange = (date: any, dateString: any) => {
    setMonth(moment(date).format('MM'));
  };

  return (
    <div className="col-span-12 rounded-3xl border border-stroke bg-white px-5 pt-7.5 pb-5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:col-span-12">
      <div className='flex justify-between flex-wrap'>
        <h1 className='font-semibold text-black text-xl dark:text-white'>Total income {year ? year : ""}</h1>
        <div className='flex gap-3'>
          <DatePicker onChange={handleYearChange} picker="year" style={{ height: 35 }} />
          <DatePicker onChange={handleMonthChange} picker="month" style={{ height: 35 }} />
        </div>
      </div>
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
              type="bar"
              height={350}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default ChartNine;
