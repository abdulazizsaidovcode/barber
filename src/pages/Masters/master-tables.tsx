import MasterTable from '../../components/Tables/MasterTable.tsx';
import { tbody, thead } from './data.tsx';
import { CiMenuKebab } from 'react-icons/ci';
import { MenuProps, Pagination } from 'antd';
import { Dropdown, Space } from 'antd';
import Filters from './filters/filters.tsx';
import React from 'react';

const items: MenuProps['items'] = [
  {
    key: '1',
    label: 'Открыть',
  },
  {
    key: '2',
    label: 'Заблокировать',
  },
  {
    key: '3',
    label: 'Разблокировать',
  },
  {
    key: '4',
    label: 'Открыть справку',
  },
  {
    key: '5',
    label: 'Сделать скидку',
  },
  {
    key: '6',
    label: 'Скачать справку',
  },
  {
    key: '7',
    label: 'Написать',
  },
];

const MasterTables: React.FC = () => {
  return (
    <>
      <Filters />
      <MasterTable thead={thead}>
        {tbody.map((item, key) => (
          <tr
            key={key}
            className={`${
              key === tbody.length - 1
                ? ''
                : 'border-b border-[#eee] dark:border-strokedark'
            }`}
          >
            <td className={`min-w-[150px] p-5`}>
              <img
                src={item.img}
                alt="img"
                className={'w-10 h-10 scale-[1.4] rounded-full object-cover'}
              />
            </td>
            <td className="min-w-[150px] p-5">
              <p className="text-black dark:text-white">{item.name}</p>
            </td>
            <td className="min-w-[150px] p-5">
              <p className="text-black dark:text-white">{item.category}</p>
            </td>
            <td className="min-w-[150px] p-5">
              <p className="text-black dark:text-white">{item.invoiceDate}</p>
            </td>
            <td className="min-w-[150px] p-5">
              <p className="text-black dark:text-white">{item.totalSessions}</p>
            </td>
            <td className="min-w-[150px] p-5">
              <p className="text-black dark:text-white">{item.rating}</p>
            </td>
            <td className="min-w-[150px] p-5 flex items-center justify-between">
              <p
                className={`inline-flex rounded-full bg-opacity-10 py-1 px-3 text-sm font-medium ${
                  item.status === 'Активный'
                    ? 'bg-success text-success'
                    : 'bg-danger text-danger'
                }`}
              >
                {item.status}
              </p>
              <Space direction="vertical">
                <Space wrap>
                  <Dropdown menu={{ items }} placement="bottomLeft" arrow>
                    <CiMenuKebab className="text-black dark:text-white text-[1.5rem] ms-4 hover:cursor-pointer hover:opacity-60 duration-200" />
                  </Dropdown>
                </Space>
              </Space>
            </td>
            <td className="min-w-[150px] p-5">
              <p className="text-black dark:text-white">{item.scheduleType}</p>
            </td>
            <td className="min-w-[150px] p-5">
              <p className="text-black dark:text-white">{item.canceled}</p>
            </td>
            <td className="min-w-[150px] p-5">
              <p className="text-black dark:text-white">
                {item.specialization}
              </p>
            </td>
            <td className="min-w-[150px] p-5">
              <p className="text-black dark:text-white">{item.clients}</p>
            </td>
            <td className="min-w-[150px] p-5">
              <p className="text-black dark:text-white">{item.phoneNumber}</p>
            </td>
            <td className="min-w-[150px] p-5">
              <p className="text-black dark:text-white">{item.placeOfWork}</p>
            </td>
            <td className="min-w-[150px] p-5">
              <p className="text-black dark:text-white">{item.selfEmployed}</p>
            </td>
          </tr>
        ))}
      </MasterTable>
      <Pagination
        responsive={true}
        defaultCurrent={0}
        total={100}
        rootClassName={`mt-10 mb-5 ms-5`}
      />
    </>
  );
};

export default MasterTables;
