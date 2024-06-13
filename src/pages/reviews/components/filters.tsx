import { DatePicker, Input, Select } from 'antd'
import React, { useState } from 'react'
import { IoSearchOutline } from 'react-icons/io5'
import { Buttons } from '../../../components/buttons'
import { DownOutlined, UpOutlined } from '@ant-design/icons'
import { useTranslation } from 'react-i18next'

const ReviewFilters: React.FC = () => {
    const [showMore, setShowMore] = useState(false);
    const { t } = useTranslation()

    const openShowMore = () => setShowMore(!showMore);
    return (
        <div className='flex flex-wrap gap-5'>
            <Input
                placeholder={"Search_by_name"}
                prefix={<IoSearchOutline />}
                className='w-60'
            />
            <Select
                placeholder={"Region"}
                className='w-60'
                options={[
                    { value: 'jack', label: 'Jack' },
                    { value: 'lucy', label: 'Lucy' },
                    { value: 'Yiminghe', label: 'yiminghe' },
                    { value: 'Регион', label: 'Регион' },
                ]}
            />
            <Select
                placeholder={"City"}
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
                Reset
            </Buttons>
            {showMore && (
                <div className='flex flex-wrap gap-5 mt-5'>
                    <Select
                        placeholder={"Rating"}
                        className='w-60'
                        options={[
                            { value: 'jack', label: 'Jack' },
                            { value: 'lucy', label: 'Lucy' },
                            { value: 'Yiminghe', label: 'yiminghe' },
                            { value: 'Город', label: 'Город' },
                        ]}
                    />
                    <Select
                        placeholder={"From_whom"}
                        className='w-60'
                        options={[
                            { value: 'jack', label: 'Jack' },
                            { value: 'lucy', label: 'Lucy' },
                            { value: 'Yiminghe', label: 'yiminghe' },
                            { value: 'Город', label: 'Город' },
                        ]}
                    />
                    <DatePicker className='w-60' placeholder={"Date"} />
                    <DatePicker className='w-60' placeholder={"Period"} />
                </div>
            )}
        </div>
    )
}

export default ReviewFilters