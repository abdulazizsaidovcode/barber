import React, { useEffect, useState } from 'react';
import { Pagination } from 'antd';
import ReviewsMasersCard from '../cards/ReviewsMasersCard';
import ReviewMastersFilters from '../components/masterFilters';
import useReviewsStore from '../../../helpers/state_managment/reviews/reviews';
import { fetchMasterDataList, deleteMasterDataList } from '../../../helpers/api-function/reviews/reviews';
import DelModal from '../../../components/settings/modals/delModal';
import { reviews_list_master_data } from '../../../helpers/api';

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
  } = useReviewsStore();

  const [selectedId, setSelectedId] = useState<string | null>(null);

  useEffect(() => {
    fetchMasterDataList(setListMasterData, `${reviews_list_master_data}?page=${currentMasterPage}&size=${pageMasterSize}`);
  }, [currentMasterPage, pageMasterSize]);

  const onPageChange = (page: number, pageSize: number) => {
    setMasterCurrentPage(page - 1);
    setMasterPageSize(pageSize);
  };

  const openDelModal = (id: string) => {
    setSelectedId(id);
    setDelModal(true);
  };

  const closeDelModal = () => {
    setSelectedId(null);
    setDelModal(false);
  };

  const handleDelete = async () => {
    if (selectedId) {
      await deleteMasterDataList(selectedId, setListMasterData, `${reviews_list_master_data}?page=${currentMasterPage}&size=${pageMasterSize}`);
      closeDelModal();
    }
  };

  return (
    <div>
      <ReviewMastersFilters />
      {listMasterData.length === 0 ? (
        <div className='w-full h-[200px] flex justify-center items-center'>
          <p className='text-xl dark:text-white'>Reviews not found</p>
        </div>
      ) : (
        <div>
          {listMasterData.map((item, index) => (
            <ReviewsMasersCard key={index} data={item} openModal={() => openDelModal(item.id)} />
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
    </div>
  );
};

export default SecondTab;