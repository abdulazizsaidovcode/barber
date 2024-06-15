import React, { useEffect, useState } from 'react';
import RequestLayout from '../../../pages/request/request';
import userImg from '../../../images/user.png';
import axios from 'axios';
import { config } from '../../../helpers/token';
import { changed_procedure_url, getFileId, new_procedure_url } from '../../../helpers/api';
import { Skeleton, Pagination } from 'antd';
import SpecializationsCard from '../cards/specializationsCard';
import { useTranslation } from 'react-i18next';

interface ProceduresData {
  id: string;
  attachmentId: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  createdAt: string;
  categoryIsNew: boolean;
}

const RequestProcedures: React.FC = () => {
  const [newProcedures, setNewProcedures] = useState<ProceduresData[]>([]);
  const [changedProcedures, setChangedProcedures] = useState<ProceduresData[]>([]);
  const [loading, setLoading] = useState(true);
  const [totalNewProcedures, setTotalNewProcedures] = useState<number>(0);
  const [totalChangedProcedures, setTotalChangedProcedures] = useState<number>(0);
  const [currentNewPage, setCurrentNewPage] = useState<number>(0);
  const [currentChangedPage, setCurrentChangedPage] = useState<number>(0);
  const [newPageSize, setNewPageSize] = useState<number>(10);
  const [chanPageSize, setChanPageSize] = useState<number>(10);

  useEffect(() => {
    fetchData(currentNewPage, currentChangedPage, newPageSize, chanPageSize);
  }, [currentNewPage, currentChangedPage, newPageSize, chanPageSize]);

  const fetchData = async (newPage: number, changedPage: number, newSize: number, chanSize: number) => {
    setLoading(true);
    try {
      const [newRes, changedRes] = await Promise.all([
        axios.get(`${new_procedure_url}?page=${newPage}&size=${newSize}`, config),
        axios.get(`${changed_procedure_url}?page=${changedPage}&size=${chanSize}`, config)
      ]);
      setNewProcedures(newRes.data.body.object);
      setTotalNewProcedures(newRes.data.body.totalElements);
      setChangedProcedures(changedRes.data.body.object);
      setTotalChangedProcedures(changedRes.data.body.totalElements);
    } catch { }
    finally {
      setLoading(false);
    }
  };

  const onNewPageChange = (page: number, pageSize: number) => {
    setCurrentNewPage(page - 1);
    setNewPageSize(pageSize);
  };

  const onChangedPageChange = (page: number, pageSize: number) => {
    setCurrentChangedPage(page - 1);
    setChanPageSize(pageSize);
  };
  const { t } = useTranslation()
  return (
    <RequestLayout>
      <div className="bg-[#f5f6f7] dark:bg-[#21212e] h-max w-full reviews-shadow pb-5">
        <div className="w-full bg-[#cccccc] dark:bg-white h-12 flex justify-center items-center px-5">
          <div className="flex gap-3">
            <p className="dark:text-[#000]">{t("Specializations")}</p>
            <div className="w-6 flex items-center justify-center rounded-full h-6 bg-[#f1f5f9] dark:bg-[#21212e] dark:text-white">
              <p className="text-sm">{newProcedures.length + changedProcedures.length}</p>
            </div>
          </div>
        </div>
        <div className="flex md:flex-row flex-col justify-between mt-4">
          <div className='md:w-1/2 mr-1'>
            <div className="w-full bg-[#cccccc] h-12 mr-1 flex justify-center items-center dark:bg-white p-2">
              <div className="flex gap-3">
                <p className="dark:text-[#000] ">{t("New")}</p>
                <div className="w-6 flex items-center justify-center rounded-full h-6 bg-[#f1f5f9] dark:bg-[#21212e] dark:text-white">
                  <p className="text-sm">{newProcedures.length}</p>
                </div>
              </div>
            </div>
            <div className='flex items-center flex-col gap-4 mt-4 px-5'>
              {loading ? (
                Array.from({ length: 2 }).map((_, index) => (
                  <Skeleton key={index} active avatar paragraph={{ rows: 2 }} />
                ))
              ) : (newProcedures.length === 0 ?
                <div className='w-full h-[510px] flex justify-center items-center'>
                  <p>New Procedures Not Found</p>
                </div> :
                <div className='flex flex-col gap-3'>
                  {newProcedures.map(item => (
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
                  }
                  <div className='mt-5'>
                    <Pagination
                      showSizeChanger
                      current={currentNewPage + 1}
                      pageSize={newPageSize}
                      total={totalNewProcedures}
                      onChange={onNewPageChange}
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
          <div className='md:w-1/2 ml-1'>
            <div className="w-full bg-[#cccccc] h-12 justify-center items-center flex dark:bg-white p-2">
              <div className="flex gap-3">
                <p className="dark:text-[#000]">Изменённые</p>
                <div className="w-6 flex items-center justify-center rounded-full h-6 bg-[#f1f5f9] dark:bg-[#21212e] dark:text-white">
                  <p className="text-sm">{changedProcedures.length}</p>
                </div>
              </div>
            </div>
            <div className='flex items-center flex-col mt-4 gap-4  px-5'>
              {loading ? (
                Array.from({ length: 2 }).map((_, index) => (
                  <Skeleton key={index} active avatar paragraph={{ rows: 2 }} />
                ))
              ) : (changedProcedures.length === 0 ?
                <div className='w-full h-[510px] flex justify-center items-center'>
                  <p>New Procedures Not Found</p>
                </div> :
                <div className='gap-3'>
                  {changedProcedures.map(item => (
                    <SpecializationsCard
                      key={item.id}
                      link={item.id}
                      ownerImage={item.attachmentId ? getFileId + item.attachmentId : userImg}
                      salonOwner={`${item.firstName} ${item.lastName}`}
                      phoneNumber={item.phoneNumber}
                      salonCreateDate={item.createdAt}
                      salonDescription="Мастер изменил название специализации"
                    />
                  ))}
                  <div className='p-3 mt-5'>
                    <Pagination
                      showSizeChanger
                      current={currentChangedPage + 1}
                      pageSize={chanPageSize}
                      total={totalChangedProcedures}
                      onChange={onChangedPageChange}
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </RequestLayout >
  );
};

export default RequestProcedures;