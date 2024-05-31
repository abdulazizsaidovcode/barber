import React, { useEffect } from 'react';
import { InputNumber, Select } from 'antd';
import MasterTable from '../../components/Tables/MasterTable';
import financeStore from '../../helpers/state_managment/finance/financeStore.tsx';
import { getFinance } from '../../helpers/api-function/finance/finance.tsx';

const { Option } = Select;

const FirstTab: React.FC = () => {
  const {data, setData, yearVal, setYearVal, monthVal, setMonthVal} = financeStore()

  useEffect(() => {
    getFinance(monthVal, yearVal, setData)
  }, [])

  const handleMonthChange = (value: string | null) => {
    setMonthVal(value)
    getFinance(monthVal, yearVal, setData)
  }
  const handleYearChange = (value: number | null) => {
    setYearVal(value)
    getFinance(monthVal, yearVal, setData)
  }

  const tableData = [
    {
      country: "O'zbekistan",
      nonCashTurnover: '50 000 000',
      allTurnover: '250 000 000',
      totalIncome: '25 000 000',
      incomeSimple: '0',
      incomePremium: '5 000 000',
      incomeVip: '12 000 000',
      masterTotal: '25 000 000',
      anotherSimple: '0',
      familyIncome: '0',
      totalClients: '0',
    },
  ];

  const tableHeaders = [
    { id: 1, name: 'Country' },
    { id: 2, name: 'Non-cash turnover' },
    { id: 3, name: 'All turnover' },
    { id: 4, name: 'Total income' },
    { id: 5, name: 'Income “Simple”' },
    { id: 6, name: 'Income "Premium"' },
    { id: 7, name: 'Income "Vip"' },
    { id: 8, name: 'Master total' },
    { id: 9, name: 'Income "Simple"' },
    { id: 10, name: '“Family” income' },
    { id: 11, name: 'Total clients' },
  ];

  return (
    <div>
      <div className="flex justify-center">
        <div className="flex sm:justify-between w-[700px] flex-wrap justify-center">
          {/* Left Section */}
          <div>
            <div className="mb-[10px] flex justify-center">
              <Select
                defaultValue="Select Month"
                className="w-[200px]"
                onChange={handleMonthChange}
              >
                <Option value='1'>Yanvar</Option>
                <Option value="2">Fevral</Option>
                <Option value="3">Mart</Option>
                <Option value="4">April</Option>
                <Option value="5">May</Option>
                <Option value="6">Iyun</Option>
                <Option value="7">Iyul</Option>
                <Option value="8">Avgust</Option>
                <Option value="9">Sentabr</Option>
                <Option value="10">Oktaber</Option>
                <Option value="11">Noyaber</Option>
                <Option value="12">Dekaber</Option>
              </Select>
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
              <InputNumber
                className="w-[200px]"
                defaultValue={new Date().getFullYear()}
                onChange={handleYearChange}
              />
            </div>
            <div>
              {[
                { label: 'Turnover', value: '49 000 000' },
                { label: 'Income', value: '60 500 000' },
                { label: 'Consumption', value: '30 500 000' },
                { label: 'Profit', value: '30 000 000' },
              ].map((item) => (
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
        </div>
      </div>
      {/* Top Section */}
      {/* Table */}
      <div>
        <MasterTable thead={tableHeaders}>
          {tableData.map((data, index) => (
            <tr key={index} className="dark:text-white">
              <td className="p-5">{data.country}</td>
              <td className="p-5">{data.nonCashTurnover}</td>
              <td className="p-5">{data.allTurnover}</td>
              <td className="p-5">{data.totalIncome}</td>
              <td className="p-5">{data.incomeSimple}</td>
              <td className="p-5">{data.incomePremium}</td>
              <td className="p-5">{data.incomeVip}</td>
              <td className="p-5">{data.masterTotal}</td>
              <td className="p-5">{data.anotherSimple}</td>
              <td className="p-5">{data.familyIncome}</td>
              <td className="p-5">{data.totalClients}</td>
            </tr>
          ))}
        </MasterTable>
      </div>
    </div>
  );
};

export default FirstTab;
