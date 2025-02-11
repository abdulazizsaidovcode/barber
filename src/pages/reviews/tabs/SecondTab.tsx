import React, { useEffect, useState } from 'react';
import { Pagination, Skeleton } from 'antd';
import ReviewsMasersCard from '../cards/ReviewsMasersCard';
import ReviewMastersFilters from '../components/masterFilters';
import useReviewsStore from '../../../helpers/state_managment/reviews/reviews';
import { fetchMasterDataList, deleteMasterDataList } from '../../../helpers/api-function/reviews/reviews';
import DelModal from '../../../components/settings/modals/delModal';
import { reviews_Confirm, reviews_list_master_data } from '../../../helpers/api';
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import { config, setConfig } from '../../../helpers/token';
import Modal from '../../../components/modals/modal';

const SecondTab: React.FC = () => {
  const {
    listMasterData,
    totalMasterPage,
    currentMasterPage,
    pageMasterSize,
    setMasterCurrentPage,
    setMasterPageSize,
    setListMasterData,
    isDelModal,
    setDelModal,
    setMasterTotalPage,
    isConfirmModal,
    setIsConfirmModal
  } = useReviewsStore();

  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setConfig()
  }, []);
  const fetchData = async () => {
    setLoading(true);
    await fetchMasterDataList(setListMasterData, `${reviews_list_master_data}?page=${currentMasterPage}&size=${pageMasterSize}`, setMasterTotalPage);
    setLoading(false);
  };
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      await fetchMasterDataList(setListMasterData, `${reviews_list_master_data}?page=${currentMasterPage}&size=${pageMasterSize}`, setMasterTotalPage);
      setLoading(false);
    };
    fetchData();
  }, [currentMasterPage, pageMasterSize]);

  const onPageChange = (page: number, pageSize: number) => {
    setMasterCurrentPage(page - 1);
    setMasterPageSize(pageSize);
  };

  const openDelModal = (id: string) => {
    setSelectedId(id);
    setDelModal(true);
  };
  const openConfirModal = (id: string) => {
    setSelectedId(id);
    setIsConfirmModal(true);
  };

  const closeDelModal = () => {
    setSelectedId(null);
    setDelModal(false);
  };

  const handleDelete = async () => {
    if (selectedId) {
      await deleteMasterDataList(selectedId, setListMasterData, `${reviews_list_master_data}?page=${currentMasterPage}&size=${pageMasterSize}`, setMasterTotalPage);
      closeDelModal();
    }
  };
  // console.log(config);

  const handleConfirm = async () => {
    if (selectedId && config) {
      console.log("config 31", config);
      const { data } = await axios.put(`${reviews_Confirm}${selectedId}`, {}, config);
      if (data.success) {
        fetchData()
        setIsConfirmModal(false);
      }
    }
  };

  const { t } = useTranslation()

  return (
    <div>
      <ReviewMastersFilters />
      {loading ? (
        <div className='w-full'>
          <Skeleton active paragraph={{ rows: 4 }} />
          <Skeleton active paragraph={{ rows: 4 }} />
          <Skeleton active paragraph={{ rows: 4 }} />
        </div>
      ) : listMasterData.length === 0 ? (
        <div className='w-full h-[200px] flex justify-center items-center'>
          <p className='text-xl dark:text-white'>{t("Reviews_not_found")}</p>
        </div>
      ) : (
        <div>
          {listMasterData.map((item, index) => (
            <ReviewsMasersCard
              key={index}
              data={item}
              openModal={() => openDelModal(item.id)}
              openConfirmModal={() => openConfirModal(item.id)}
            />
          ))}
          <Pagination
            showSizeChanger
            current={currentMasterPage + 1}
            pageSize={pageMasterSize}
            total={totalMasterPage}
            onChange={onPageChange}
          />
        </div>
      )}
      <DelModal isOpen={isDelModal} onDelete={handleDelete} onClose={closeDelModal} />
      <Modal
        isOpen={isConfirmModal}
        onClose={() => setIsConfirmModal(false)}
        mt="centered"
      >
        <p className='text-white mx-10 my-3'>{t("Are you sure you want to confirm this review?")}</p>
        <div className="flex justify-center gap-10 mt-8">
          <button
            onClick={handleConfirm}
            className="bg-black text-white px-4 py-2 rounded"
          >
            {t("Yes, Confirm")}
          </button>
          <button
            onClick={() => setIsConfirmModal(false)}
            className="bg-gray-300 text-white px-4 py-2 rounded"
          >
            {t("Cancel")}
          </button>
        </div>
      </Modal>


    </div>
  );
};

export default SecondTab;