import React, { useEffect } from 'react';
import { DatePicker, InputNumber, Select } from 'antd';
import MasterTable from '../../components/Tables/MasterTable';
import financeStore from '../../helpers/state_managment/finance/financeStore.tsx';
import { getFinance } from '../../helpers/api-function/finance/finance.tsx';
import CurrentYear from '../../helpers/date.tsx';

const { Option } = Select;

const FirstTab: React.FC = () => {
  const { data, setData, yearVal, setYearVal, monthVal, setMonthVal } = financeStore()

  useEffect(() => {
    getFinance(monthVal, yearVal, setData)
  }, [])

  const handleMonthChange = (value: string | null, dateString: any) => {
    setMonthVal(dateString)
    getFinance(monthVal, yearVal, setData)
  }
  const handleYearChange = (value: number | null, dateString: any) => {
    setYearVal(dateString)
    getFinance(monthVal, yearVal, setData)
  }
  console.log(data && data.object);

  // Create an array for summary data
  // const summaryData = [
  //   { label: 'Оборот', value: data.object.reduce((acc: number, item: any) => acc + item.nonCashTurnover, 0) >= 0 ? data.object.reduce((acc: number, item: any) => acc + item.nonCashTurnover, 0) : 'N/A' },
  //   // { label: 'Income', value: data?.object.totalIncome || 'N/A' },
  //   // { label: 'Consumption', value: data?.object.totalConsumption || 'N/A' },
  //   // { label: 'Profit', value: data?.object.totalProfit || 'N/A' },
  // ];
  // console.log(data.object.reduce((acc: number, item: any) => acc + item.nonCashTurnover, 0));


  const tableHeaders = [
    { id: 1, name: 'Регион' },
    { id: 2, name: 'Оборот безналичный' },
    { id: 3, name: 'Оборот Общий' },
    { id: 4, name: 'Доходы всего' },
    { id: 5, name: 'Доход “Free”' },
    { id: 6, name: 'Доход “premium”' },
    { id: 7, name: 'Доход “Exlusive”' },
  ];

  return (
    <div>
      <div className="flex justify-center">
        <div className="flex sm:justify-between w-[700px] flex-wrap justify-center">
          {/* Left Section */}
          <div>
            <div className="mb-[10px] flex justify-center">
              <DatePicker onChange={handleYearChange} picker="year" style={{ height: 35 }} />
            </div>
            <div className="">
              {[
                { label: 'Turnover', value: '49 000 000' },
                { label: 'Income', value: '60 500 000' },
                { label: 'Consumption', value: '30 500 000' },
                { label: 'Profit', value: '30 000 000' },
              ].map((item) => (
                <div
                  key={item.label}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    marginBottom: '10px',
                  }}
                >
                  <p className="w-[100px] ml-[10px] dark:text-white">
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
              <DatePicker onChange={handleMonthChange} picker="month" style={{ height: 35 }} />
            </div>
            <div>
              {/* {summaryData && summaryData.map((item) => (
                <div key={item.label} className="flex items-center mb-[10px]">
                  <p className="mr-[10px] w-[100px] dark:text-white">
                    {item.label}:
                  </p>
                  <div className="border-2 border-black px-[50px] dark:border-white py-[10px]">
                    <p className="dark:text-white">{item.value}</p>
                  </div>
                </div>
              ))} */}
            </div>
          </div>
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
          {data.object ? data.object.map((data: any, index: any) => (
            <tr key={index} className="dark:text-white">
              <td className="p-5">{data.addressName}</td>
              <td className="p-5">{data.nonCashTurnover}</td>
              <td className="p-5">{data.turnoverTotal}</td>
              <td className="p-5">{data.totalIncome}</td>
              {/* <td className="p-5">{data.incomeSimple}</td>
              <td className="p-5">{data.incomePremium}</td>
              <td className="p-5">{data.incomeVip}</td> */}
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
          {data && data.object && data.object &&
            <tr className="dark:text-white text-bold">
              <td className="p-5">Итого</td>
              <td className="p-5">{data.object.reduce((acc: number, item: any) => acc + item.nonCashTurnover, 0)}</td>
              <td className="p-5">{data.object.reduce((acc: number, item: any) => acc + item.turnoverTotal, 0)}</td>
              <td className="p-5">{data.object.reduce((acc: number, item: any) => acc + item.totalIncome, 0)}</td>
            </tr>}
        </MasterTable>
      </div>
    </div>
  );
};

export default FirstTab;
