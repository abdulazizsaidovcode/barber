import React, { useEffect, useState } from 'react';
import { DatePicker } from 'antd';
import MasterTable from '../../components/Tables/MasterTable';
import financeStore from '../../helpers/state_managment/finance/financeStore.tsx';
import { getFinance } from '../../helpers/api-function/finance/finance.tsx';
import CurrentYear from '../../helpers/date.tsx';
import axios from 'axios';
import { base_url } from '../../helpers/api.tsx';
import { config } from '../../helpers/token.tsx';
import { Buttons } from '../../components/buttons/index.tsx';
import { downloadExcelFile } from '../../helpers/attachment/file-download.tsx';
import { useTranslation } from 'react-i18next';

// const { Option } = Select;

interface Year {
  benefit: number;
  expense: string;
  income: number;
}

const FirstTab: React.FC = () => {
  const { data, setData, yearVal, setYearVal, monthVal, setMonthVal } = financeStore();
  const [year, setYear] = useState<Year | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    if (monthVal && yearVal) {
      getFinance(monthVal, yearVal, setData);
    }
  }, [monthVal, yearVal, setData]);

  const handleMonthChange = (value: any, dateString: any) => {
    const month = value ? value.format('MM') : null;
    setMonthVal(month);
    if (month && yearVal) {
      getFinance(month, yearVal, setData);
    }
  };

  const handleYearChange = (value: any, dateString: any) => {
    const year = value ? value.format('YYYY') : null;
    setYearVal(year);
    if (monthVal && year) {
      getFinance(monthVal, year, setData);
    }
  };

  useEffect(() => {
    if (yearVal) {
      axios.get(`${base_url}finance/web/year?year=${yearVal}`, config)
        .then((res) => {
          setYear(res.data.body);
        }).catch(() => console.log('error'));
    }
  }, [yearVal]);

  const handleDownload = () => {
    let url = `${base_url}finance/web/region/download?page=0&size=10`;
    if (yearVal) {
      url += `&year=${yearVal}`;
    }
    if (monthVal) {
      url += `&month=${monthVal}`;
    }
    downloadExcelFile(url, setIsLoading);
  };
  const { t } = useTranslation()
  // Create an array for summary data
  const summaryData = data.object ? [
    { label: t("Turnover"), value: data.object.reduce((acc: number, item: FinanceData) => acc + item.nonCashTurnover, 0) },
    {
      label: t("Income"), value: data.object.reduce((acc: number, item: FinanceData) => acc + item.turnoverTotal, 0)
    },
    { label: t("Consumption"), value: data.object.reduce((acc: number, item: FinanceData) => acc + item.totalIncome, 0) },
  ] : [];

  const tableHeaders = [
    { id: 1, name: t("Region") },
    { id: 2, name: 'Оборот безналичный' },
    { id: 3, name: 'Оборот Общий' },
    { id: 4, name: 'Доходы всего' },
  ];

  return (
    <div>
      <div className="flex justify-center">
        <div className="flex sm:justify-between w-[700px] flex-wrap justify-center items-start py-5">
          {/* Left Section */}
          <div>
            <div className="mb-[10px] flex justify-center">
              <DatePicker onChange={handleMonthChange} picker="month" style={{ height: 35 }} />
            </div>
            <div className="">
              {summaryData && summaryData.map((item) => (
                <div key={item.label} className="flex items-center mb-[10px]">
                  <p className="mr-[10px] w-[100px] dark:text-white">
                    {item.label}:
                  </p>
                  <div className="border-2 border-black px-[50px] dark:border-white py-[10px]">
                    <p className="dark:text-white">{item.value}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          {/* Right Section */}
          <div>
            <div className="mb-[10px] flex justify-center">
              <DatePicker onChange={handleYearChange} picker="year" style={{ height: 35 }} />
            </div>
            <div>
              <div className="flex items-center mb-[10px]">
                <p className="mr-[10px] w-[100px] dark:text-white">
                  Оборот
                </p>
                <div className="border-2 border-black px-[50px] dark:border-white py-[10px]">
                  <p className="dark:text-white">{year ? year.income : 0}</p>
                </div>
              </div>
              <div className="flex items-center mb-[10px]">
                <p className="mr-[10px] w-[100px] dark:text-white">
                  Доход
                </p>
                <div className="border-2 border-black px-[50px] dark:border-white py-[10px]">
                  <p className="dark:text-white">{year ? year.benefit : 0}</p>
                </div>
              </div>
              <div className="flex items-center mb-[10px]">
                <p className="mr-[10px] w-[100px] dark:text-white">
                  Расход
                </p>
                <div className="border-2 border-black px-[50px] dark:border-white py-[10px]">
                  <p className="dark:text-white">{year ? year.expense : 0}</p>
                </div>
              </div>
            </div>
          </div>
          <Buttons onClick={handleDownload} disabled={isLoading}>
            {isLoading ? 'Downloading...' : 'Download'}
          </Buttons>
        </div>
      </div>
      {/* Top Section */}
      {/* Table */}
      <div>
        <div className='flex justify-around dark:text-white bg-white px-5 pb-2.5 dark:border-strokedark dark:bg-[#303d4a] mx-7.5 pt-3'>
          <p>{yearVal ? yearVal : <CurrentYear />}</p>
          <p>Тарифы</p>
        </div>
        <MasterTable thead={tableHeaders}>
          {data.object ? data.object.map((data: FinanceData, index: number) => (
            <tr key={index} className="dark:text-white">
              <td className="p-5">{data.addressName}</td>
              <td className="p-5">{data.nonCashTurnover}</td>
              <td className="p-5">{data.turnoverTotal}</td>
              <td className="p-5">{data.totalIncome}</td>
            </tr>
          )) :
            <tr className={`border-b border-[#eee] dark:border-strokedark`}>
              <td
                className="min-w-full text-center py-10 text-xl font-bold dark:text-white"
                colSpan={5}
              >
                Malumot mavjud emas!
              </td>
            </tr>
          }
          {data && data.object &&
            <tr className="dark:text-gray font-bold">
              <td className="p-5">Итого</td>
              <td className="p-5">{data.object.reduce((acc: number, item: FinanceData) => acc + item.nonCashTurnover, 0)}</td>
              <td className="p-5">{data.object.reduce((acc: number, item: FinanceData) => acc + item.turnoverTotal, 0)}</td>
              <td className="p-5">{data.object.reduce((acc: number, item: FinanceData) => acc + item.totalIncome, 0)}</td>
            </tr>}
        </MasterTable>
      </div>
    </div>
  );
};

export default FirstTab;
