import React, { useEffect, useState } from 'react';
import RequestLayout from '../../../pages/request/request';
import userImg from '../../../images/user.png';
import axios from 'axios';
import { config } from '../../../helpers/token';
import { changed_spezalliton_url, getFileId, new_spezalliton_url } from '../../../helpers/api';
import SpecializationsCard from '../cards/specializationsCard';
import { Skeleton, Pagination } from 'antd';
import { useTranslation } from 'react-i18next';

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
  const [newPageSize, setNewPageSize] = useState<number>(10);
  const [chanPageSize, setChanPageSize] = useState<number>(10);

  useEffect(() => {
    fetchNewSpecializations(currentNewPage, newPageSize);
  }, [newPageSize, chanPageSize]);

  useEffect(() => {
    fetchChangedSpecializations(currentChangedPage, chanPageSize);
  }, [currentNewPage, currentChangedPage])

  const fetchNewSpecializations = async (page: number, size: number) => {
    setLoading(true);
    try {
      const response = await axios.get(`${new_spezalliton_url}?page=${page}&size=${size}`, config);
      setNewSpecializations(response.data.body.object);
      setTotalNewSpecializations(response.data.body.totalElements);
    } catch (error) {
      console.error("Error fetching new specializations", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchChangedSpecializations = async (page: number, size: number) => {
    setLoading(true);
    try {
      const response = await axios.get(`${changed_spezalliton_url}?page=${page}&size=${size}`, config);
      setChangedSpecializations(response.data.body.object);
      setTotalChangedSpecializations(response.data.body.totalElements);
    } catch (error) {
      console.error("Error fetching changed specializations", error);
    } finally {
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

  const { t } = useTranslation();
  return (
    <RequestLayout>
      <div className="bg-[#f5f6f7] dark:bg-[#21212e] h-max w-full reviews-shadow pb-5">
        <div className="w-full bg-[#cccccc] dark:bg-white h-12 flex justify-center items-center px-5">
          <div className="flex gap-3">
            <p className="dark:text-[#000]">{t("Specializations")}</p>
            <div className="w-6 flex items-center justify-center rounded-full h-6 bg-[#f1f5f9] dark:bg-[#21212e] dark:text-white">
              <p className="text-sm">{newSpecializations.length + changedSpecializations.length}</p>
            </div>
          </div>
        </div>
        <div className="flex md:flex-row flex-col justify-between mt-4">
          <div className='md:w-1/2 mr-1'>
            <div className="w-full bg-[#cccccc] h-12 mr-1 flex justify-center items-center dark:bg-white p-2">
              <div className="flex gap-3">
                <p className="dark:text-[#000]">{t("New")}</p>
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
                  <p>{t('specialist')}</p>
                </div> :
                <div>
                  <div className="flex flex-col items-center gap-3">
                    {newSpecializations.map(item => (
                      <SpecializationsCard
                        key={item.id}
                        link={item.id}
                        ownerImage={item.attachmentId ? getFileId + item.attachmentId : userImg}
                        salonOwner={`${item.firstName} ${item.lastName}`}
                        phoneNumber={item.phoneNumber}
                        salonCreateDate={item.createdAt}
                        salonDescription={t("The_master_has_added")}
                      />
                    ))}
                  </div>
                  <div className='mt-5'>
                    <Pagination
                      showSizeChanger
                      style={{ flexWrap: 'wrap' }}
                      current={currentNewPage + 1}
                      pageSize={newPageSize}
                      total={totalNewSpecializations}
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
                <p className="dark:text-[#000]">{t("Changed")}</p>
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
                  <p>{t('specialist')}</p>
                </div> :
                <div>
                  <div className="flex flex-col items-center gap-3">
                    {changedSpecializations.map(item => (
                      <SpecializationsCard
                        key={item.id}
                        link={item.id}
                        ownerImage={item.attachmentId ? getFileId + item.attachmentId : userImg}
                        salonOwner={`${item.firstName} ${item.lastName}`}
                        phoneNumber={item.phoneNumber}
                        salonCreateDate={item.createdAt}
                        salonDescription={t("The_master_changed")}
                      />
                    ))}
                  </div>
                  <div className='mt-5'>
                    <Pagination
                      showSizeChanger
                      style={{ flexWrap: 'wrap' }}
                      current={currentChangedPage + 1}
                      pageSize={chanPageSize}
                      total={totalChangedSpecializations}
                      onChange={onChangedPageChange}
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </RequestLayout>
  );
};

export default RequestSpecializations;