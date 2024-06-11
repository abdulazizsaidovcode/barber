import React, { useEffect, useState } from 'react';
import RequestLayout from '../../../pages/request/request';
import opacha from '../../../images/Group 940396.png';
import axios from 'axios';
import { config } from '../../../helpers/token';
import { new_procedure_url } from '../../../helpers/api';
import SpecializationsCard from '../cards/specializationsCard';
import { Skeleton } from 'antd';

interface Data {
  id: string;
  attachmentId: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  createdAt: string;
  categoryIsNew: boolean;
}

const RequestSpecializations: React.FC = () => {
  const [data, setData] = useState<Data[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(new_procedure_url, config);
        setData(res.data.body);
      } catch { }
      finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const newSpecializations = data.filter(item => item.categoryIsNew);
  const changedSpecializations = data.filter(item => !item.categoryIsNew);

  return (
    <RequestLayout>
      <div className="bg-[#f5f6f7] dark:bg-[#21212e] h-max w-full reviews-shadow pb-5">
        <div className="w-full bg-[#cccccc] dark:bg-white h-12 flex justify-center items-center px-5">
          <div className="flex gap-3">
            <p className="dark:text-[#000]">Специализации</p>
            <div className="w-6 flex items-center justify-center rounded-full h-6 bg-[#f1f5f9] dark:bg-[#21212e] dark:text-white">
              <p className="text-sm">{data.length}</p>
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
              ) : (
                newSpecializations.map(item => (
                  <SpecializationsCard
                    key={item.id}
                    ownerImage={opacha}
                    salonOwner={`${item.firstName} ${item.lastName}`}
                    phoneNumber={item.phoneNumber}
                    salonCreateDate={item.createdAt}
                    salonDescription="Мастер добавил новую специализацию"
                  />
                ))
              )}
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
              ) : (
                changedSpecializations.map(item => (
                  <SpecializationsCard
                    key={item.id}
                    ownerImage={opacha}
                    salonOwner={`${item.firstName} ${item.lastName}`}
                    phoneNumber={item.phoneNumber}
                    salonCreateDate={item.createdAt}
                    salonDescription="Мастер изменил название специализации"
                  />
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </RequestLayout>
  );
};

export default RequestSpecializations;
