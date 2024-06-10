// src/components/client-tables.tsx

import ClientTable from '../../components/Tables/MasterTable.tsx';
import { thead } from './data.tsx';
import { CiMenuKebab } from 'react-icons/ci';
import type { MenuProps } from 'antd';
import { Dropdown, Pagination, Space } from 'antd';
import Filters from './filters/filters.tsx';
import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import clientFilterStore from '../../helpers/state_managment/client/clientFilterStore.tsx';

const ClientTables: React.FC = () => {
  const { t } = useTranslation();
  const { totalPage, clientFilterData } = clientFilterStore();

  const onChange = (page: number, pageSize: number): void => {
    console.log('clicked number:', page);
    console.log('Total page:', pageSize);
  };

  const items = (id: string): MenuProps['items'] => [
    {
      key: '1',
      label: <Link to={`/client_id/${id}`}>{t('Open')}</Link>,
    },
    {
      key: '2',
      label: t('Block'),
    },
    {
      key: '3',
      label: t('Unblock'),
    },
    {
      key: '7',
      label: t('Message'),
    },
  ];

  return (
    <>
      <Filters />
      <ClientTable thead={thead}>
        {clientFilterData.length > 0 ? (
          clientFilterData.map((item: any, key: any) => (
            <tr
              key={key}
              className={`${
                key === clientFilterData.length - 1
                  ? ''
                  : 'border-b border-[#eee] dark:border-strokedark'
              }`}
            >
              <td className={`min-w-[150px] p-5`}>
                <img
                  src={item?.imgUrl ?? ''}
                  alt="img"
                  className={'w-10 h-10 scale-[1.4] rounded-full object-cover'}
                />
              </td>
              <td className="min-w-[150px] p-5">
                <p className="text-black dark:text-white">
                  {item?.fullName ?? 'No data'}
                </p>
              </td>
              <td className="min-w-[150px] p-5">
                <p className="text-black dark:text-white">
                  {item?.registrationDate ?? 'No data'}
                </p>
              </td>
              <td className="min-w-[150px] p-5">
                <p className="text-black dark:text-white">
                  {item?.phoneNumber ?? 'No data'}
                </p>
              </td>
              <td className="min-w-[150px] p-5">
                <p className="text-black dark:text-white">
                  {item?.completedOrder ?? 0}
                </p>
              </td>
              <td className="min-w-[150px] p-5">
                <p className="text-black dark:text-white">
                  {item?.turnover ?? 'No data'}
                </p>
              </td>
              <td className="min-w-[150px] p-5">
                <p className="text-black dark:text-white">
                  {item?.age ? `${item.age} ${t('years')}` : 'No data'}
                </p>
              </td>
              <td className="min-w-[150px] p-5">
                <p className="text-black dark:text-white">
                  {item?.masterCount ?? 0}
                </p>
              </td>
              <td className="min-w-[150px] p-5">
                <p className="text-black dark:text-white">
                  {item?.canceledOrder ?? 0}
                </p>
              </td>
              <td className="min-w-[150px] p-5 flex items-center justify-between">
                <p
                  className={`inline-flex rounded-full bg-opacity-10 py-1 px-3 text-sm font-medium ${
                    item.status === 'ACTIVE'
                      ? 'bg-success text-success'
                      : 'bg-danger text-danger'
                  }`}
                >
                  {item.status}
                </p>
                <Space direction="vertical">
                  <Space wrap>
                    <Dropdown
                      menu={{ items: items(item.id) }}
                      placement="bottomLeft"
                      arrow
                    >
                      <CiMenuKebab className="text-black dark:text-white text-[1.5rem] ms-4 hover:cursor-pointer hover:opacity-60 duration-200" />
                    </Dropdown>
                  </Space>
                </Space>
              </td>
            </tr>
          ))
        ) : (
          <tr className={`border-b border-[#eee] dark:border-strokedark`}>
            <td
              className="min-w-full text-center py-10 text-xl font-bold"
              colSpan={5}
            >
              {t('No data available!')}
            </td>
          </tr>
        )}
      </ClientTable>
      <Pagination
        showSizeChanger={false}
        responsive={true}
        defaultCurrent={1}
        total={totalPage}
        onChange={onChange}
        rootClassName={`mt-10 mb-5 ms-5`}
      />
    </>
  );
};

export default ClientTables;
