import React, { useEffect, useState } from 'react';
import RequestLayout from '../../../pages/request/request';
import NewMastersCard from '../cards/newMastersCard';
import { GoPlus } from "react-icons/go";
import { CiMenuKebab } from "react-icons/ci";
import NewMastersDetail from '../details/newMastersDetail';
import Modal from '../../modals/modal';
import axios from 'axios';
import { masters_cancel_url, masters_confirm_url, masters_fulldata_url, masters_gallery_url, masters_service_url, new_masters_url, send_message } from '../../../helpers/api';
import { config } from '../../../helpers/token';
import toast from 'react-hot-toast';
import { Skeleton } from 'antd';

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

interface ServiceData {
  category: {
    name: string;
  };
  price: string;
  serviceTime: string;
  attachmentId: string;
  description: string;
}

interface GalleryData {
  id: number;
  albumName: string;
  resGalleryAttachments: [
    { attachmentId: string; main: boolean; newStatus: boolean }
  ];
  date: string;
}

const RequestNewMasters: React.FC = () => {
  const [detailIsOpen, setDetailIsOpen] = useState(false);
  const [reasonIsOpen, setReasonIsOpen] = useState(false);
  const [data, setData] = useState<Data[]>([]);
  const [serviceData, setServiceData] = useState<ServiceData[]>([]);
  const [galleryData, setGalleryData] = useState<GalleryData[]>([]);
  const [selectedMaster, setSelectedMaster] = useState<MasterDetailData | null>(null);
  const [loading, setLoading] = useState(true);
  const [rejectionMessage, setRejectionMessage] = useState('');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await axios.get(new_masters_url, config);
      setData(res.data.body);
    } catch { }
    finally {
      setLoading(false);
    }
  }

  const fetchFullData = async (id: string) => {
    try {
      const res = await axios.get(`${masters_fulldata_url}/${id}`, config);
      setSelectedMaster(res.data.body);
      setDetailIsOpen(true);
      fetchService(id);
      fetchGallery(id);
    } catch { }
  }

  const fetchService = async (id: string) => {
    try {
      const res = await axios.get(`${masters_service_url}/${id}`, config);
      setServiceData(res.data.body);
    } catch { }
  }

  const fetchGallery = async (id: string) => {
    try {
      const res = await axios.get(`${masters_gallery_url}/${id}`, config);
      setGalleryData(res.data.body);
    } catch { }
  }

  const confirmMasters = async (id: string, callback: () => void) => {
    try {
      await axios.put(`${masters_confirm_url}/${id}`, {}, config);
      callback();
      toast.success('Master confirmed successfully');
    } catch { }
  }

  const sendMessageForReject = async (id: string, message: string) => {
    const payload = {
      masterId: id,
      message: message,
      messageStatus: "ADMIN_MASTER_MESSAGE_FOR_REJECT"
    }
    try {
      await axios.post(send_message, payload, config);
      toast.success('Мастер успешно отклонен')
    } catch { }
  }

  const cancelReject = async (id: string) => {
    const payload = {
      id: id,
      status: "BLOCKED"
    }
    try {
      const res = await axios.put(masters_cancel_url, payload, config);
      console.log(res.data.body);
      fetchData();

    } catch { }
  }

  const openReasonModal = () => setReasonIsOpen(true);
  const closeReasonModal = () => setReasonIsOpen(false);
  const closeDetailModal = () => setDetailIsOpen(false);

  const handleReject = () => {
    if (selectedMaster && selectedMaster.masterId) {
      sendMessageForReject(selectedMaster.masterId, rejectionMessage);
      cancelReject(selectedMaster.masterId);
      closeReasonModal();
    }
  }

  return (
    <RequestLayout>
      <div className='bg-[#f5f6f7] dark:bg-[#21212e] h-max w-full reviews-shadow pb-5'>
        <div className='w-full bg-[#cccccc] dark:bg:white h-12 flex justify-between items-center px-5'>
          <div className='flex gap-3'>
            <p className='dark:text-[#000]'>Новые мастера</p>
            <div className='w-6 flex items-center justify-center rounded-full h-6 bg-[#f1f5f9] dark:bg-[#21212e] dark:text:white'>
              <p className='text-sm'>{data.length}</p>
            </div>
          </div>
          <div className='flex gap-2'>
            <div className='w-6 flex items-center justify-center rounded-full h-6 bg-[#f1f5f9] dark:bg-[#21212e] dark:text:white'>
              <GoPlus />
            </div>
            <div className='w-6 flex items-center justify-center rounded-full h-6 bg-[#f1f5f9] dark:bg-[#21212e] dark:text:white'>
              <CiMenuKebab className='rotate-180' />
            </div>
          </div>
        </div>
        <div className='flex mt-5 gap-x-2 gap-y-8 flex-wrap px-5'>
          {loading ? (
            Array.from({ length: 6 }).map((_, index) => (
              <Skeleton key={index} active avatar paragraph={{ rows: 2 }} />
            ))
          ) : data.length === 0 ? (
            <div className='h-[510px]'>
              <p className='text-xl dark:text:white'>New Masters Not found</p>
            </div>
          ) : (
            data.map((item, index) => (
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
            ))
          )}
        </div>
      </div>
      <NewMastersDetail
        isOpen={detailIsOpen}
        onClose={closeDetailModal}
        openReasonModal={openReasonModal}
        {...selectedMaster}
        serviceData={serviceData || []} // Ensure serviceData is always an array
        galleryData={galleryData || []} // Ensure galleryData is always an array
        confirmMasters={confirmMasters} // Pass confirmMasters function
        fetchData={fetchData} // Pass fetchData function
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
              value={rejectionMessage}
              onChange={(e) => setRejectionMessage(e.target.value)}
            />
          </div>
          <div className='flex justify-center mt-4'>
            <button
              onClick={handleReject}
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