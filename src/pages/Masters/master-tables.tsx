import MasterTable from '../../components/Tables/MasterTable.tsx';
import { thead } from './data.tsx';
import { CiMenuKebab } from 'react-icons/ci';
import { MenuProps, Pagination } from 'antd';
import { Dropdown, Space } from 'antd';
import Filters from './filters/filters.tsx';
import React from 'react';
import masterStore from '../../helpers/state_managment/master/masterStore.tsx';
import images from '../../images/user/user-01.png';

const items: MenuProps['items'] = [
  {
    key: '1',
    label: 'Открыть'
  },
  {
    key: '2',
    label: 'Заблокировать'
  },
  {
    key: '3',
    label: 'Разблокировать'
  },
  {
    key: '4',
    label: 'Открыть справку'
  },
  {
    key: '5',
    label: 'Сделать скидку'
  },
  {
    key: '6',
    label: 'Скачать справку'
  },
  {
    key: '7',
    label: 'Написать'
  }
];

const MasterTables: React.FC = () => {
  const { data, totalPage } = masterStore();
  return (
    <>
      <Filters />
      <MasterTable thead={thead}>
        {data.length > 0 ?
          data.map((item, key) => (
            <tr key={item.id} className={`${key === (data.length - 1) ? '' : 'border-b border-[#eee] dark:border-strokedark'}`}>
              <td className={`min-w-[150px] p-5`}>
                <img src={item.imgUrl ? item.imgUrl : images} alt="img" className={'w-10 h-10 scale-[1.4] rounded-full' +
                  ' object-cover'} />
              </td>
              <td className="min-w-[150px] p-5">
                <p className="text-black dark:text-white">
                  {item.fullName}
                </p>
              </td>
              <td className="min-w-[150px] p-5">
                <p className="text-black dark:text-white">
                  {item.serviceCategory?.map(c => (
                    <p>{c}</p>
                  ))}
                </p>
              </td>
              <td className="min-w-[150px] p-5">
                <p className="text-black dark:text-white">
                  {item.startedWork}
                </p>
              </td>
              <td className="min-w-[150px] p-5">
                <p className="text-black dark:text-white">
                  {item.orderCount}
                </p>
              </td>
              <td className="min-w-[150px] p-5">
                <p className="text-black dark:text-white">
                  {item.rating}
                </p>
              </td>
              <td className="min-w-[150px] p-5 flex items-center justify-between">
                <p
                  className={`inline-flex rounded-full bg-opacity-10 py-1 px-3 text-sm font-medium`}
                >
                  {item.status}
                </p>
                <Space direction="vertical">
                  <Space wrap>
                    <Dropdown menu={{ items }} placement="bottomLeft" arrow>
                      <CiMenuKebab
                        className="text-black dark:text-white text-[1.5rem] ms-4 hover:cursor-pointer hover:opacity-60 duration-200"
                      />
                    </Dropdown>
                  </Space>
                </Space>
              </td>
              <td className="min-w-[150px] p-5">
                <p className="text-black dark:text-white">
                  {item.schedule}
                </p>
              </td>
              <td className="min-w-[150px] p-5">
                <p className="text-black dark:text-white">
                  {item.canceled}
                </p>
              </td>
              <td className="min-w-[150px] p-5">
                <p className="text-black dark:text-white">
                  {item.specialization?.map(s => (
                    <p>{s}</p>
                  ))}
                </p>
              </td>
              <td className="min-w-[150px] p-5">
                <p className="text-black dark:text-white">
                  {item.totalClient}
                </p>
              </td>
              <td className="min-w-[150px] p-5">
                <p className="text-black dark:text-white">
                  {item.phoneNumber}
                </p>
              </td>
              <td className="min-w-[150px] p-5">
                <p className="text-black dark:text-white">
                  {item.workPlace}
                </p>
              </td>
            </tr>
          )) : (
            <tr className={`border-b border-[#eee] dark:border-strokedark`}>
              <td className="min-w-full text-center py-10 text-xl font-bold" colSpan={5}>
                Malumot mavjud emas!
              </td>
            </tr>
          )}
      </MasterTable>
      <Pagination
        responsive={true}
        defaultCurrent={0}
        total={totalPage}
        rootClassName={`mt-10 mb-5 ms-5`}
      />
    </>
  );
};

export default MasterTables;
