import React from 'react';
import { Link, useLocation } from 'react-router-dom';

interface MenuProp {
  name: string;
  count: number;
  link: string;
}

const RequestSidebar: React.FC = () => {
  const location = useLocation();

  const menu: MenuProp[] = [
    { name: 'Новые мастера', count: 23, link: '/' },
    { name: 'Фото', count: 23, link: '/photos' },
    { name: 'Специализации', count: 23, link: '/specializations' },
    { name: 'Процедуры', count: 23, link: '/procedures' }
  ];

  return (
    <div className='bg-[#F5F6F7] shadow-2 shadow-[0.2px] p-3 w-[19%] h-max fixed py-10'>
      <div className='w-full flex items-center px-4 justify-between h-14 rounded-3xl bg-white'>
        <p>Все запросы</p>
        <p className='text-[#7D8FB3] font-bold'>43</p>
      </div>
      <div className='mt-5 flex flex-col gap-3'>
        {menu.map((item, index) => (
          <Link key={index} to={item.link} className={item.link === location.pathname ? 'bg-blue-500 text-white' : 'bg-[#C2C2C2] text-[#7D8FB3]'}>
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
