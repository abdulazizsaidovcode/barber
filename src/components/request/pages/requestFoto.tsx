import React, { useEffect, useState } from 'react';
import RequestLayout from '../../../pages/request/request';
import { GoPlus } from 'react-icons/go';
import { CiMenuKebab } from 'react-icons/ci';
import FotoCard from '../cards/fotoCard';
import axios from 'axios';
import { getFileId, new_foto_url } from '../../../helpers/api';
import { config } from '../../../helpers/token';
import { Skeleton, Pagination } from 'antd';

interface Data {
  id: string;
  attachmentId: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  createdAt: string;
}

const RequestFoto: React.FC = () => {
  const [data, setData] = useState<Data[]>([]);
  const [loading, setLoading] = useState(true);
  const [totalItems, setTotalItems] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [pageSize, setPageSize] = useState<number>(10);

  useEffect(() => {
    fetchData(currentPage, pageSize);
  }, [currentPage, pageSize]);

  const fetchData = async (page: number, size: number) => {
    setLoading(true);
    try {
      const res = await axios.get(`${new_foto_url}?page=${page}&size=${size}`, config);
      setData(res.data.body.object);
      setTotalItems(res.data.body.totalElements);
    } catch { }
    finally {
      setLoading(false);
    }
  };

  const onPageChange = (page: number, pageSize: number) => {
    setCurrentPage(page - 1);
    setPageSize(pageSize);
  };

  return (
    <RequestLayout>
      <div className='bg-[#f5f6f7] dark:bg-[#21212e] h-max pb-5 w-full reviews-shadow'>
        <div className='w-full bg-[#cccccc] dark:bg-white h-12 flex justify-between items-center px-5'>
          <div className='flex gap-3'>
            <p className='dark:text-[#000]'>Новые мастера</p>
            <div className='w-6 flex items-center justify-center rounded-full h-6 bg-[#f1f5f9] dark:bg-[#21212e] dark:text-white'>
              <p className='text-sm'>{totalItems}</p>
            </div>
          </div>
          <div className='flex gap-2'>
            <div className='w-6 flex items-center justify-center rounded-full h-6 bg-[#f1f5f9] dark:bg-[#21212e] dark:text-white'>
              <GoPlus />
            </div>
            <div className='w-6 flex items-center justify-center rounded-full h-6 bg-[#f1f5f9] dark:bg-[#21212e] dark:text-white'>
              <CiMenuKebab className='rotate-180' />
            </div>
          </div>
        </div>
        <div className='flex mt-5 gap-x-3 gap-y-8 flex-wrap px-5'>
          {loading ? (
            Array.from({ length: 3 }).map((_, index) => (
              <Skeleton key={index} active avatar paragraph={{ rows: 2 }} />
            ))
          ) : data.length === 0 ? (
            <div className='w-full h-[510px] flex items-center justify-center'>
              <p className='text-xl dark:text-white'>
                New fotos not found
              </p>
            </div>
          ) : (
            <div>
              <div className='flex gap-3'>
                {data.map((item, index) => (
                  <FotoCard
                    key={index}
                    link={item.id}
                    ownerImage={item.attachmentId ? getFileId + item.attachmentId : ''}
                    salonOwner={`${item.firstName} ${item.lastName}`}
                    phoneNumber={item.phoneNumber}
                    salonCreateDate={item.createdAt}
                    salonDescription='Мастер добавил/изменил фото в галерею'
                  />
                ))}
              </div>
              <div className='mt-5'>
                <Pagination
                  showSizeChanger
                  current={currentPage + 1}
                  pageSize={pageSize}
                  total={totalItems}
                  onChange={onPageChange}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </RequestLayout>
  );
};

export default RequestFoto;