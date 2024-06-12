import React, { useEffect, useState } from 'react';
import RequestLayout from '../../../pages/request/request';
import userImg from '../../../images/user.png';
import axios from 'axios';
import { config } from '../../../helpers/token';
import { changed_spezalliton_url, getFileId, new_spezalliton_url } from '../../../helpers/api';
import SpecializationsCard from '../cards/specializationsCard';
import { Skeleton, Pagination } from 'antd';

interface SpecializationsData {
  id: string;
  attachmentId: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  createdAt: string;
  categoryIsNew: boolean;
}

const RequestSpecializations: React.FC = () => {
  const [newSpecializations, setNewSpecializations] = useState<SpecializationsData[]>([]);
  const [changedSpecializations, setChangedSpecializations] = useState<SpecializationsData[]>([]);
  const [loading, setLoading] = useState(true);
  const [totalNewSpecializations, setTotalNewSpecializations] = useState<number>(0);
  const [totalChangedSpecializations, setTotalChangedSpecializations] = useState<number>(0);
  const [currentNewPage, setCurrentNewPage] = useState<number>(0);
  const [currentChangedPage, setCurrentChangedPage] = useState<number>(0);
  const [pageSize, setPageSize] = useState<number>(10);

  useEffect(() => {
    fetchData(currentNewPage, currentChangedPage, pageSize);
  }, [currentNewPage, currentChangedPage, pageSize]);

  const fetchData = async (newPage: number, changedPage: number, size: number) => {
    setLoading(true);
    try {
      const [newRes, changedRes] = await Promise.all([
        axios.get(`${new_spezalliton_url}?page=${newPage}&size=${size}`, config),
        axios.get(`${changed_spezalliton_url}?page=${changedPage}&size=${size}`, config)
      ]);
      setNewSpecializations(newRes.data.body.object);
      setTotalNewSpecializations(newRes.data.body.totalElements);
      setChangedSpecializations(changedRes.data.body.object);
      setTotalChangedSpecializations(changedRes.data.body.totalElements);
    } catch { }
    finally {
      setLoading(false);
    }
  };

  const onNewPageChange = (page: number, pageSize: number) => {
    setCurrentNewPage(page - 1);
    setPageSize(pageSize);
  };

  const onChangedPageChange = (page: number, pageSize: number) => {
    setCurrentChangedPage(page - 1);
    setPageSize(pageSize);
  };

  return (
    <RequestLayout>
      <div className="bg-[#f5f6f7] dark:bg-[#21212e] h-max w-full reviews-shadow pb-5">
        <div className="w-full bg-[#cccccc] dark:bg-white h-12 flex justify-center items-center px-5">
          <div className="flex gap-3">
            <p className="dark:text-[#000]">Специализации</p>
            <div className="w-6 flex items-center justify-center rounded-full h-6 bg-[#f1f5f9] dark:bg-[#21212e] dark:text-white">
              <p className="text-sm">{newSpecializations.length + changedSpecializations.length}</p>
            </div>
          </div>
        </div>
        <div className="flex justify-between mt-4">
          <div className='w-1/2 mr-1'>
            <div className="w-full bg-[#cccccc] h-12 mr-1 flex justify-center items-center dark:bg-white p-2">
              <div className="flex gap-3">
                <p className="dark:text-[#000]">Новые</p>
                <div className="w-6 flex items-center justify-center rounded-full h-6 bg-[#f1f5f9] dark:bg-[#21212e] dark:text-white">
                  <p className="text-sm">{newSpecializations.length}</p>
                </div>
              </div>
            </div>
            <div className='flex items-center flex-col gap-4 mt-4'>
              {loading ? (
                Array.from({ length: 2 }).map((_, index) => (
                  <Skeleton key={index} active avatar paragraph={{ rows: 2 }} />
                ))
              ) : (newSpecializations.length === 0 ?
                <div className='w-full h-[510px] flex justify-center items-center'>
                  <p>New Specializations Not Found</p>
                </div> :
                newSpecializations.map(item => (
                  <SpecializationsCard
                    key={item.id}
                    link={item.id}
                    ownerImage={item.attachmentId ? getFileId + item.attachmentId : userImg}
                    salonOwner={`${item.firstName} ${item.lastName}`}
                    phoneNumber={item.phoneNumber}
                    salonCreateDate={item.createdAt}
                    salonDescription="Мастер добавил новую специализацию"
                  />
                ))
              )}
            </div>
            <div className='p-3 mt-5'>
              <Pagination
                showSizeChanger
                current={currentNewPage + 1}
                pageSize={pageSize}
                total={totalNewSpecializations}
                onChange={onNewPageChange}
              />
            </div>
          </div>
          <div className='w-1/2 ml-1'>
            <div className="w-full bg-[#cccccc] h-12 justify-center items-center flex dark:bg-white p-2">
              <div className="flex gap-3">
                <p className="dark:text-[#000]">Изменённые</p>
                <div className="w-6 flex items-center justify-center rounded-full h-6 bg-[#f1f5f9] dark:bg-[#21212e] dark:text-white">
                  <p className="text-sm">{changedSpecializations.length}</p>
                </div>
              </div>
            </div>
            <div className='flex items-center flex-col mt-4 gap-4'>
              {loading ? (
                Array.from({ length: 2 }).map((_, index) => (
                  <Skeleton key={index} active avatar paragraph={{ rows: 2 }} />
                ))
              ) : (changedSpecializations.length === 0 ?
                <div className='w-full h-[510px] flex justify-center items-center'>
                  <p>Changed Specializations Not Found</p>
                </div> :
                changedSpecializations.map(item => (
                  <SpecializationsCard
                    key={item.id}
                    link={item.id}
                    ownerImage={item.attachmentId ? getFileId + item.attachmentId : userImg}
                    salonOwner={`${item.firstName} ${item.lastName}`}
                    phoneNumber={item.phoneNumber}
                    salonCreateDate={item.createdAt}
                    salonDescription="Мастер изменил название специализации"
                  />
                ))
              )}
            </div>
            <div className='p-3 mt-5'>
              <Pagination
                showSizeChanger
                current={currentChangedPage + 1}
                pageSize={pageSize}
                total={totalChangedSpecializations}
                onChange={onChangedPageChange}
              />
            </div>
          </div>
        </div>
      </div>
    </RequestLayout>
  );
};

export default RequestSpecializations;