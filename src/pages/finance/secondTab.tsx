import React, { useEffect, useState } from 'react';
import { Select, DatePicker } from 'antd';
import MasterTable from '../../components/Tables/MasterTable';
import { getFinanceDestrict } from '../../helpers/api-function/finance/financeDestrict';
import financeDestrictStore from '../../helpers/state_managment/finance/financeDestrictStore';
import axios from 'axios';
import { district_url, region_url } from '../../helpers/api';
import { config } from '../../helpers/token';
import CurrentYear from '../../helpers/date';
import { Region } from '../../types/region';
import { Buttons } from '../../components/buttons';
import toast, { Toaster } from 'react-hot-toast';

const { Option } = Select;

const FilterComponent: React.FC = () => {
  const [regions, setRegions] = useState<Region[]>([]);
  const { data, setData, yearVal, setYearVal, monthVal, setMonthVal } = financeDestrictStore();
  const [destrict, setDestrict] = useState<string | null>(null);

  useEffect(() => {
    axios.get(region_url, config)
      .then(response => {
        setRegions(response.data.body);
      })
      .catch(error => {
        console.error('Error fetching regions:', error);
      });
  }, []);

  useEffect(() => {
    if (destrict) {
      getFinanceDestrict(destrict, monthVal, yearVal, setData);
    }
  }, [destrict, yearVal, monthVal]);

  const handleDestrictChange = (value: string) => {
    setDestrict(value);
    if (value && (yearVal || monthVal)) {
      getFinanceDestrict(value, monthVal, yearVal, setData);
    }
  };

  const handleMonthChange = (value: any, dateString: any) => {
    const month = value ? value.format('MM') : null;
    setMonthVal(month);
    if (destrict && month) {
      getFinanceDestrict(destrict, month, yearVal, setData);
    }
  };

  const handleYearChange = (value: any, dateString: any) => {
    const year = value ? value.format('YYYY') : null;
    setYearVal(year);
    if (destrict && year) {
      getFinanceDestrict(destrict, monthVal, year, setData);
    }
  };

  const getDestrictFile = () => {
    if (destrict) {
      let url = `${district_url}/download/${destrict}`;
      if (monthVal && yearVal) {
        url += `?month=${monthVal}&year=${yearVal}`;
      } else if (monthVal) {
        url += `?month=${monthVal}`;
      } else if (yearVal) {
        url += `?year=${yearVal}`;
      }

      axios.get(url,
        config,
        // responseType: 'blob',
      )
        .then(response => {
          const url = window.URL.createObjectURL(new Blob([response.data]));
          const link = document.createElement('a');
          link.href = url;
          link.setAttribute('download', `file_${destrict}_${monthVal || ''}_${yearVal || ''}.xlsx`);
          document.body.appendChild(link);
          link.click();
        })
        .catch(error => {
          console.error('Error downloading file:', error);
        });
    } else {
      toast.error('Выберите регион');
    }
  };

  const tableHeaders = [
    { id: 1, name: 'Регион' },
    { id: 2, name: 'Оборот безналичный' },
    { id: 3, name: 'Оборот Общий' },
    { id: 4, name: 'Доходы всего' },
  ];

  return (
    <div className="dark:bg-boxdark">
      {/* Top filters row */}
      <div className='flex gap-5 mb-5 mx-7.5'>
        <div>
          <Select
            placeholder="Select Region"
            onChange={handleDestrictChange}
            style={{ width: '100%' }}
          >
            {regions.map(region => (
              <Option key={region.id} value={region.id.toString()}>
                {region.name}
              </Option>
            ))}
          </Select>
        </div>
        <div>
          <DatePicker picker='month' onChange={handleMonthChange} />
        </div>
        <div>
          <DatePicker picker='year' onChange={handleYearChange} />
        </div>
        <Buttons onClick={getDestrictFile}>
          Скачать
        </Buttons>
      </div>
      {/* Table */}
      <div>
        <div className='flex justify-around dark:text-white bg-white px-5 pb-2.5 dark:border-strokedark dark:bg-[#303d4a] mx-7.5 pt-3'>
          <p>{yearVal ? yearVal : <CurrentYear />}</p>
          <p>Тарифы</p>
        </div>
        <MasterTable thead={tableHeaders}>
          {data && data.object ? data.object.map((data: any, index: number) => (
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
                Регион не выбран или недоступен!
              </td>
            </tr>
          }
          {data && data.object &&
            <tr className="dark:text-gray font-bold">
              <td className="p-5">Итого</td>
              <td className="p-5">{data.object.reduce((acc: number, item: any) => acc + item.nonCashTurnover, 0)}</td>
              <td className="p-5">{data.object.reduce((acc: number, item: any) => acc + item.turnoverTotal, 0)}</td>
              <td className="p-5">{data.object.reduce((acc: number, item: any) => acc + item.totalIncome, 0)}</td>
            </tr>}
        </MasterTable>
        <Toaster
          position="top-center"
          reverseOrder={false}
        />
      </div>
    </div>
  );
};

export default FilterComponent;
