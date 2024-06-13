import React from 'react'
import ReviewsMasersCard from '../cards/ReviewsMasersCard'
import ReviewMastersFilters from '../components/masterFilters'
import useReviewsStore from '../../../helpers/state_managment/reviews/reviews'
import { Pagination } from 'antd'

const SecondTab: React.FC = () => {
  const { listMasterData } = useReviewsStore()
  return (
    <div>
      <div>
        <ReviewMastersFilters />
      </div>
      <div>
        {listMasterData.length === 0 ? <div className='w-full h-[200px] flex justify-center items-center'>
          <p className='text-xl dark:text-white'>Reviews not found</p>
        </div>
          :
          listMasterData.map((item, index) => (
            <div>
              <div key={index} >
                <ReviewsMasersCard data={item} />
              </div>
              <div>
                {/* <Pagination
                  showSizeChanger
                  current={currentPage + 1}
                  pageSize={pageSize}
                  total={totalPage}
                  onChange={onPageChange}
                /> */}
              </div>
            </div>
          ))}
      </div>
    </div>
  )
}

export default SecondTab