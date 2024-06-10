import { DatePicker, Input, Select } from 'antd'
import React, { useState } from 'react'
import { Buttons } from '../../../components/buttons'
import { DownOutlined, UpOutlined } from '@ant-design/icons'
import { IoSearchOutline } from 'react-icons/io5'
import ReviewsMasersCard from '../cards/ReviewsMasersCard'

const SecondTab: React.FC = () => {
  const [showMore, setShowMore] = useState(false);
  const openShowMore = () => setShowMore(!showMore)

  return (
    <div>
      <div className='flex flex-wrap gap-5'>
        <Input
          placeholder={"Поиск по ФИО"}
          prefix={<IoSearchOutline />}
          className='w-60'
        />
        <Select
          defaultValue="Регион"
          className='w-60'
          options={[
            { value: 'jack', label: 'Jack' },
            { value: 'lucy', label: 'Lucy' },
            { value: 'Yiminghe', label: 'yiminghe' },
            { value: 'Регион', label: 'Регион' },
          ]}
        />
        <Select
          defaultValue="Город"
          className='w-60'
          options={[
            { value: 'jack', label: 'Jack' },
            { value: 'lucy', label: 'Lucy' },
            { value: 'Yiminghe', label: 'yiminghe' },
            { value: 'Город', label: 'Город' },
          ]}
        />
        <Buttons onClick={openShowMore}>
          {showMore ? <UpOutlined /> : <DownOutlined />}
        </Buttons>
        <Buttons>
          Сбросить
        </Buttons>
      </div>
      {showMore && (
        <div className='flex flex-wrap gap-5 mt-5'>
          <Select
            defaultValue="Рейтинг"
            className='w-60'
            options={[
              { value: 'jack', label: 'Jack' },
              { value: 'lucy', label: 'Lucy' },
              { value: 'Yiminghe', label: 'yiminghe' },
              { value: 'Город', label: 'Город' },
            ]}
          />
          <Select
            defaultValue="От кого"
            className='w-60'
            options={[
              { value: 'jack', label: 'Jack' },
              { value: 'lucy', label: 'Lucy' },
              { value: 'Yiminghe', label: 'yiminghe' },
              { value: 'Город', label: 'Город' },
            ]}
          />
          <DatePicker className='w-60' placeholder='Дата' />
          <DatePicker className='w-60' placeholder='Период' />
        </div>
      )}
      <div>
        <ReviewsMasersCard/>
      </div>
    </div>
  )
}

export default SecondTab