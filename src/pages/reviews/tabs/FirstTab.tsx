import React, { useState, useEffect } from 'react';
import { Pagination, Rate } from 'antd';
import ReviewsServiceCard from '../cards/ReviewsServiceCard';
import DelModal from '../../../components/settings/modals/delModal';
import useReviewsStore from '../../../helpers/state_managment/reviews/reviews';
import ReviewFilters from '../components/filters';
import { deleteListData, fetchDataList } from '../../../helpers/api-function/reviews/reviews';

const FirstTab: React.FC = () => {
  const {
    mainData,
    listData,
    totalPage,
    pageSize,
    currentPage,
    isDelModal,
    setDelModal,
    setPageSize,
    setCurrentPage,
    setListData,
    setTotalPage
  } = useReviewsStore();
  
  const [selectedId, setSelectedId] = useState<string | null>(null);

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
      await deleteListData(selectedId, setListData, currentPage, pageSize, setTotalPage);
      closeDelModal();
    }
  };

  useEffect(() => {
    fetchDataList(setListData, currentPage, pageSize, setTotalPage);
  }, [currentPage, pageSize]);

  const onPageChange = (page: number, pageSize: number) => {
    setCurrentPage(page - 1);
    setPageSize(pageSize);
  };

  return (
    <div>
      <div>
        <ReviewFilters />
      </div>
      <div className='flex md:flex-row gap-3 flex-col reviews-shadow mt-5 items-center bg-white w-full h-max p-5 rounded-xl dark:bg-[#60606D] text-black dark:text-white mb-4'>
        <div className='md:w-1/3 w-full'>
          <p className='md:text-xl'>{mainData.allAverageFeedback} ({mainData.allReviewsCount} отзывов)</p>
          <p className='md:text-xl'>Мастера - {mainData.masterAverageFeedback} ({mainData.masterReviewsCount})</p>
          <p className='md:text-xl'>Клиенты - {mainData.clientAverageFeedback} ({mainData.clientReviewsCount})</p>
        </div>
        <div className='md:w-1/3 w-full'>
          <div className='flex'>
            <div className='lg:w-1/3 md:w-1/2 w-full sm:w-1/5 flex flex-col gap-[2.5px]'>
              <Rate disabled defaultValue={1} className="text-sm mr-2" />
              <Rate disabled defaultValue={2} className="text-sm mr-2" />
              <Rate disabled defaultValue={3} className="text-sm mr-2" />
              <Rate disabled defaultValue={4} className="text-sm mr-2" />
              <Rate disabled defaultValue={5} className="text-sm mr-2" />
            </div>
            <div className='lg:w-1/3 md:w-1/2 w-full sm:w-1/5'>
              <p>{mainData.oneStarFeedbackCount} отзывов</p>
              <p>{mainData.twoStarFeedbackCount} отзывов</p>
              <p>{mainData.threeStarFeedbackCount} отзывов</p>
              <p>{mainData.fourStarFeedbackCount} отзывов</p>
              <p>{mainData.fiveStarFeedbackCount} отзывов</p>
            </div>
          </div>
        </div>
        <div className='md:w-1/3 w-full'>
          <p className='md:text-xl'>Мастера мужчины - {mainData.maleMasterFeedback} ({mainData.maleMasterCount})</p>
          <p className='md:text-xl'>Мастера женщины - {mainData.femaleMasterFeedback} ({mainData.femaleMasterCount})</p>
          <p className='md:text-xl'>Клиенты мужчины - {mainData.maleClientFeedback} ({mainData.maleClientCount})</p>
          <p className='md:text-xl'>Клиенты женщины - {mainData.femaleClientFeedback} ({mainData.femaleClientCount})</p>
        </div>
      </div>
      <div className='mt-4'>
        {listData.length === 0 ? (
          <div>
            <p className='text-xl dark:text-white'>Reviews not found</p>
          </div>
        ) : (
          listData.map((item, index) => (
            <div key={index}>
              <ReviewsServiceCard data={item} openModal={() => openDelModal(item.id)} />
            </div>
          ))
        )}
      </div>
      <DelModal isOpen={isDelModal} onDelete={handleDelete} onClose={closeDelModal} />
      <div>
        <Pagination
          showSizeChanger
          current={currentPage + 1}
          pageSize={pageSize}
          total={totalPage}
          onChange={onPageChange}
        />
      </div>
    </div>
  );
};

export default FirstTab;