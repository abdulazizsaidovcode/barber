import React, { useEffect } from 'react';
import { Pagination } from 'antd';
import ReviewsMasersCard from '../cards/ReviewsMasersCard';
import ReviewMastersFilters from '../components/masterFilters';
import useReviewsStore from '../../../helpers/state_managment/reviews/reviews';
import { fetchMasterDataList, deleteMasterDataList } from '../../../helpers/api-function/reviews/reviews';

const SecondTab: React.FC = () => {
  const {
    listMasterData,
    totalMasterPage,
    currentMasterPage,
    pageMasterSize,
    setMasterCurrentPage,
    setMasterPageSize,
    setListMasterData,
  } = useReviewsStore();

  useEffect(() => {
    fetchMasterDataList(setListMasterData, `reviews_list_master_data?page=${currentMasterPage}&size=${pageMasterSize}`);
  }, [currentMasterPage, pageMasterSize]);

  const onPageChange = (page: number, pageSize: number) => {
    setMasterCurrentPage(page - 1);
    setMasterPageSize(pageSize);
  };

  const handleDelete = async (id: string) => {
    await deleteMasterDataList(id, setListMasterData, `reviews_list_master_data?page=${currentMasterPage}&size=${pageMasterSize}`);
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
            <ReviewsMasersCard key={index} data={item} openModal={() => handleDelete(item.id)} />
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
    </div>
  );
};

export default SecondTab;