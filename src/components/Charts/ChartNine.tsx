import { Select } from 'antd';
import { ApexOptions } from 'apexcharts';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import ReactApexChart from 'react-apexcharts';
import { dashboard_url } from '../../helpers/api';
import { config } from '../../helpers/token';

const options: ApexOptions = {
  legend: {
    show: false,
    position: 'top',
    horizontalAlign: 'left',
  },
  colors: ['#D9D9D9', '#000000'],
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
    categories: [
      'Sep',
      'Oct',
      'Nov',
      'Dec',
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
    ],
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
  const [chart, setChart] = useState<
    {
      incomeTotal: number;
      name: string;
    }[]
  >([]);
  const [state, setState] = useState<ChartOneState>({
    series: [
      {
        name: 'Product One',
        data: [23, 11, 22, 27, 13, 22],
      },
      {
        name: 'Product Two',
        data: [30, 25, 36, 30, 45, 35],
      },
    ],
  });

  const [year, setYear] = useState(new Date().getFullYear());
  const [month, setMonth] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const monthMap: { [key: string]: string } = {
    Yanvar: '01',
    Fevral: '02',
    Mart: '03',
    Aprel: '04',
    May: '05',
    June: '06',
    July: '07',
    August: '08',
    September: '09',
    October: '10',
    November: '11',
    December: '12',
  };

  const fetchData = () => {
    if (!year || isNaN(year) || !month) {
      setError('Both year and month are required');
      return;
    }

    const formattedMonth = monthMap[month];

    setLoading(true);
    setError('');
    axios
      .get(`${dashboard_url}web/regions?month=${formattedMonth}&year=${year}`, config)
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
    fetchData();
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
  }, [chart]);

  const handleYearChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setYear(parseInt(e.target.value, 10));
  };

  const handleMonthChange = (value: string) => {
    setMonth(value);
  };

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Enter') {
        fetchData();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [year, month]);

  return (
    <div className="col-span-12 rounded-3xl border border-stroke bg-white px-5 pt-7.5 pb-5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:col-span-12">
      <div className='flex justify-between flex-wrap'>
        <h1 className='font-semibold text-black text-xl dark:text-white'>Total income for {year}</h1>
        <div className='flex gap-3'>
          <input
            type="number"
            value={year}
            onChange={handleYearChange}
            className="mb-4 px-4  py-1  border border-gray-300 rounded"
            placeholder=""
            min="2000"
            max="2100"
          />
          <Select
            className='mb-3'
            value={month}
            style={{ width: 120 }}
            onChange={handleMonthChange}
            options={[
              { value: 'Yanvar', label: 'Yanvar' },
              { value: 'Fevral', label: 'Fevral' },
              { value: 'Mart', label: 'Mart' },
              { value: 'Aprel', label: 'Aprel' },
              { value: 'May', label: 'May' },
              { value: 'June', label: 'June' },
              { value: 'July', label: 'July' },
              { value: 'August', label: 'August' },
              { value: 'September', label: 'September' },
              { value: 'October', label: 'October' },
              { value: 'November', label: 'November' },
              { value: 'December', label: 'December' },
            ]}
          />
        </div>
      </div>
      {loading ? (
        <div>Loading...</div>
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
