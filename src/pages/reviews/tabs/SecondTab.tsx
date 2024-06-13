import React from 'react'
import ReviewsMasersCard from '../cards/ReviewsMasersCard'
import ReviewFilters from '../components/filters'

const SecondTab: React.FC = () => {
  return (
    <div>
      <div>
        <ReviewFilters />
      </div>
      <div>
        <ReviewsMasersCard />
      </div>
    </div>
  )
}

export default SecondTab