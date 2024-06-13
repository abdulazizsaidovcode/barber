import { ArrowLeftOutlined } from '@ant-design/icons';
import React from 'react';
import { Link, useLocation } from 'react-router-dom';

interface MenuProp {
  name: string;
  count: number | undefined;
  link: string;
}

const RequestSidebar: React.FC<{
  newMastersCount: number;
  newFotoCount: number;
  categoryCount: number;
  serviceCount: number;
  allCount: number;
  isMobileView: boolean;
  toggleSidebar: () => void;
}> = ({ newMastersCount, newFotoCount, categoryCount, serviceCount, allCount, isMobileView, toggleSidebar }) => {
  const location = useLocation();

  const menu: MenuProp[] = [
    { name: 'Новые мастера', count: newMastersCount, link: '/request/new-masters' },
    { name: 'Фото', count: newFotoCount, link: '/request/foto' },
    { name: 'Специализации', count: categoryCount, link: '/request/specializations' },
    { name: 'Процедуры', count: serviceCount, link: '/request/procedures' }
  ];

  return (
    <div className='bg-[#F5F6F7] md:mt-2 md:ms-1 dark:bg-[#21212e] reviews-shadow p-3 w-full h-[650px] py-10'>
      {isMobileView && (
        <button onClick={toggleSidebar} className="text-black dark:text-blue-950 bg-transparent p-2">
          <ArrowLeftOutlined className="text-[1.5rem] dark:text-white font-bold" />
        </button>
      )}
      <div className='w-full flex items-center px-4 justify-between h-14 rounded-3xl bg-white'>
        <p className='dark:text-[#000]'>Все запросы</p>
        <p className='text-[#7D8FB3] font-bold'>{allCount}</p>
      </div>
      <div className='mt-5 flex flex-col gap-3'>
        {menu.map((item, index) => (
          <Link key={index} to={item.link} className={item.link === location.pathname ? 'bg-[#C2C2C2] dark:bg-danger dark:text-white text-[#7D8FB3] rounded-md' : 'bg-white dark:text-[#000] text-[#7D8FB3] rounded-md'}>
            <div className='w-full flex items-center px-4 justify-between h-10 rounded-lg'>
              <p>{item.name}</p>
              <p className='text-[#7D8FB3] font-bold'>{item.count}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default RequestSidebar;