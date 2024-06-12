import { DatePicker, Input, Select } from 'antd'
import React, { useState } from 'react'
import { Buttons } from '../../../components/buttons'
import { DownOutlined, UpOutlined } from '@ant-design/icons'
import { IoSearchOutline } from 'react-icons/io5'
import ReviewsMasersCard from '../cards/ReviewsMasersCard'
import { useTranslation } from 'react-i18next'

const SecondTab: React.FC = () => {
  const [showMore, setShowMore] = useState(false);
  const openShowMore = () => setShowMore(!showMore)
  const { t } = useTranslation()

  return (
    <div>
      <div className='flex flex-wrap gap-5'>
        <Input
          placeholder={t("Search_by_name")}
          prefix={<IoSearchOutline />}
          className='w-60'
        />
        <Select
          placeholder={t("Region")}
          className='w-60'
          options={[
            { value: 'jack', label: 'Jack' },
            { value: 'lucy', label: 'Lucy' },
            { value: 'Yiminghe', label: 'yiminghe' },
            { value: 'Регион', label: 'Регион' },
          ]}
        />
        <Select
          placeholder={t("City")}
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
            placeholder={t("Rating")}
            className='w-60'
            options={[
              { value: 'jack', label: 'Jack' },
              { value: 'lucy', label: 'Lucy' },
              { value: 'Yiminghe', label: 'yiminghe' },
              { value: 'Город', label: 'Город' },
            ]}
          />
          <Select
            placeholder={t("From_whom")}
            className='w-60'
            options={[
              { value: 'jack', label: 'Jack' },
              { value: 'lucy', label: 'Lucy' },
              { value: 'Yiminghe', label: 'yiminghe' },
              { value: 'Город', label: 'Город' },
            ]}
          />
          <DatePicker className='w-60' placeholder={t("Date")} />
          <DatePicker className='w-60' placeholder={t("Period")} />
        </div>
      )}
      <div>
        <ReviewsMasersCard />
      </div>
    </div>
  )
}

export default SecondTab