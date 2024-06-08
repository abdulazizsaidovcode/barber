import React, { useEffect, useState } from 'react';
import RequestLayout from '../../../pages/request/request';
import NewMastersCard from '../cards/newMastersCard';
import { GoPlus } from "react-icons/go";
import { CiMenuKebab } from "react-icons/ci";
import NewMastersDetail from '../details/newMastersDetail';
import Modal from '../../modals/modal';
import axios from 'axios';
import { masters_fulldata_url, new_masters_url } from '../../../helpers/api';
import { config } from '../../../helpers/token';

interface Data {
  id: string;
  address: string;
  categoryIsNew: string;
  categoryName: string[];
  createdAt: string;
  salonName: string;
  firstName: string;
  lastName: string;
  attachmentId: string;
  phoneNumber: string;
}

interface DetailData {
  id: string;
  // add other detailed data fields here
}

const RequestNewMasters: React.FC = () => {
  const [detailIsOpen, setDetailIsOpen] = useState(false);
  const [reasonIsOpen, setReasonIsOpen] = useState(false);
  const [data, setData] = useState<Data[]>([]);
  const [detailData, setDetailData] = useState<DetailData | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const res = await axios.get(new_masters_url, config);
      setData(res.data.body);
    } catch { }
  };

  const fetchFullData = async (id: string) => {
    try {
      const res = await axios.get(`${masters_fulldata_url}/${id}`, config);
      setDetailData(res.data.body);
    } catch (error) {
      console.log(error);
    }
  };

  const openDetailModal = (id: string) => {
    setSelectedId(id);
    fetchFullData(id);
    setDetailIsOpen(true);
  };

  const closeDetailModal = () => {
    setDetailIsOpen(false);
    setDetailData(null);
  };

  const openReasonModal = () => setReasonIsOpen(true);
  const closeReasonModal = () => setReasonIsOpen(false);

  return (
    <RequestLayout>
      <div className='bg-[#f5f6f7] dark:bg-[#21212e] h-max w-full shadow-3 shadow-[0.2px] pb-5'>
        <div className='w-full bg-[#cccccc] dark:bg-white h-12 flex justify-between items-center px-5'>
          <div className='flex gap-3'>
            <p className='dark:text-[#000]'>Новые мастера</p>
            <div className='w-6 flex items-center justify-center rounded-full h-6 bg-[#f1f5f9] dark:bg-[#21212e] dark:text-white'>
              <p className='text-sm'>2</p>
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
          {data.map((item, index) => (
            <div key={index}>
              <NewMastersCard
                salonName={`${item.salonName}`}
                salonCategory={`${item.categoryName}`}
                salonAddress={`${item.address}`}
                ownerImage={item.attachmentId}
                salonOwner={`${item.firstName} ${item.lastName}`}
                phoneNumber={`${item.phoneNumber}`}
                salonCreateDate={`${item.createdAt}`}
                modal={() => openDetailModal(item.id)}
              />
            </div>
          ))}
        </div>
      </div>
      <NewMastersDetail
        isOpen={detailIsOpen}
        onClose={closeDetailModal}
        openReasonModal={openReasonModal}
        detailData={detailData}
      />
      <Modal isOpen={reasonIsOpen} onClose={closeReasonModal}>
        <div className='w-[700px] h-[320px]'>
          <div>
            <p className='font-bold text-xl text-[#000] dark:text:white'>Причина оклонения:</p>
          </div>
          <div className='mt-4'>
            <textarea
              rows={10}
              className="block p-2.5 w-full text-sm text-gray-900 dark:bg-[#30303d] rounded-lg border focus:ring-blue-500 focus:border-blue-500 dark:text:white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Write your thoughts here..."
            />
          </div>
          <div className='flex justify-center mt-4'>
            <button
              onClick={closeReasonModal}
              className='bg-[#2c2c2c] dark:bg-danger text-white py-2 px-10 rounded-lg'
            >
              Удалить
            </button>
          </div>
        </div>
      </Modal>
    </RequestLayout>
  );
};

export default RequestNewMasters;