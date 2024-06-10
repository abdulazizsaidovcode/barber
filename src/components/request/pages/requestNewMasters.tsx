import React, { useEffect, useState } from 'react';
import RequestLayout from '../../../pages/request/request';
import NewMastersCard from '../cards/newMastersCard';
import { GoPlus } from "react-icons/go";
import { CiMenuKebab } from "react-icons/ci";
import NewMastersDetail from '../details/newMastersDetail';
import Modal from '../../modals/modal';
import axios from 'axios';
import { masters_fulldata_url, masters_gallery_url, masters_service_url, new_masters_url } from '../../../helpers/api';
import { config } from '../../../helpers/token';

interface Data {
  id: string;
  address: string;
  categoryName: string[];
  createdAt: string;
  salonName: string;
  firstName: string;
  lastName: string;
  attachmentId: string;
  phoneNumber: string;
}

interface MasterDetailData {
  masterId: string;
  firstName: string;
  lastName: string;
  nickname: string;
  phoneNumber: string;
  age: string;
  gender: string;
  address: string;
  masterImgPath: string;
  startDate: string;
  districtName: string;
  placeOfWork: string;
  regionName: string;
  status: string;
  block: boolean;
  instagramLink: string;
  telegramLink: string;
  clientCount: string;
  completedOrderCount: string;
  masterFeedbackCount: string;
  rejectedOrderCount: string;
  deleteMasterDate: string;
  directionByGender: string[];
  masterServiceCategory: string[];
  masterSpecialization: string[];
  newOrUpdateCategory: boolean;
  masterChatStatus: string;
  scheduleType: string;
  facebookLink: string;
}

const RequestNewMasters: React.FC = () => {
  const [detailIsOpen, setDetailIsOpen] = useState(false);
  const [reasonIsOpen, setReasonIsOpen] = useState(false);
  const [data, setData] = useState<Data[]>([]);
  const [selectedMaster, setSelectedMaster] = useState<MasterDetailData | null>(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const res = await axios.get(new_masters_url, config);
      setData(res.data.body);
    } catch (error) {
      console.error(error);
    }
  }

  const fetchFullData = async (id: string) => {
    try {
      const res = await axios.get(`${masters_fulldata_url}/${id}`, config);
      setSelectedMaster(res.data.body);
      setDetailIsOpen(true);
    } catch (error) {
      console.error(error);
    }
  }

  const fetchGallery = async (id: string) => {
    try {
      const res = await axios.get(`${masters_gallery_url}/${id}`, config);
      console.log(res.data.body);
    } catch (error) {
      console.log(error);
    }
  }


  const fetchService = async (id: string) => {
    try {
      const res = await axios.get(`${masters_service_url}/${id}`, config);
      console.log(res.data.body);
    } catch (error) {
      console.log(error);
    }
  }

  
  useEffect(() => {
    fetchGallery('ceea53ed-fc0c-45cd-bc57-ee655880096b');
    fetchService('a2113057-55d2-413e-b881-87adc5d58597');
  }, []);

  const openReasonModal = () => setReasonIsOpen(true);
  const closeReasonModal = () => setReasonIsOpen(false);
  const closeDetailModal = () => setDetailIsOpen(false);

  return (
    <RequestLayout newMastersCount={data.length}>
      <div className='bg-[#f5f6f7] dark:bg-[#21212e] h-max w-full shadow-3 shadow-[0.2px] pb-5'>
        <div className='w-full bg-[#cccccc] dark:bg-white h-12 flex justify-between items-center px-5'>
          <div className='flex gap-3'>
            <p className='dark:text-[#000]'>Новые мастера</p>
            <div className='w-6 flex items-center justify-center rounded-full h-6 bg-[#f1f5f9] dark:bg-[#21212e] dark:text-white'>
              <p className='text-sm'>{data.length}</p>
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
                salonName={item.salonName || 'не настроено'}
                salonCategory={item.categoryName}
                salonAddress={item.address || 'не настроено'}
                ownerImage={item.attachmentId}
                salonOwner={`${item.firstName} ${item.lastName || ''}`}
                phoneNumber={item.phoneNumber || 'не настроено'}
                salonCreateDate={item.createdAt || 'не настроено'}
                modal={() => fetchFullData(item.id)}
              />
            </div>
          ))}
        </div>
      </div>
      <NewMastersDetail
        isOpen={detailIsOpen}
        onClose={closeDetailModal}
        openReasonModal={openReasonModal}
        {...selectedMaster}
      />
      <Modal isOpen={reasonIsOpen} onClose={closeReasonModal}>
        <div className='w-[700px] h-[320px]'>
          <div>
            <p className='font-bold text-xl text-[#000] dark:text-white'>Причина оклонения:</p>
          </div>
          <div className='mt-4'>
            <textarea
              rows={10}
              className="block p-2.5 w-full text-sm text-gray-900 dark:bg-[#30303d] rounded-lg border focus:ring-blue-500 focus:border-blue-500 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
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