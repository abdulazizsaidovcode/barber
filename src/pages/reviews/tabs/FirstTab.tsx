import React, { useState } from 'react';
import { Buttons } from '../../../components/buttons';
import { DatePicker, Input, Rate, Select } from 'antd';
import { IoSearchOutline } from 'react-icons/io5';
import { DownOutlined, UpOutlined } from '@ant-design/icons';
import { FaStar } from "react-icons/fa";
import ReviewsServiceCard from '../cards/ReviewsServiceCard';
import DelModal from '../../../components/settings/modals/delModal';
import { useTranslation } from 'react-i18next';

const FirstTab: React.FC = () => {
    const [showMore, setShowMore] = useState(false);
    const [isDelOpen, setIsDelOpen] = useState(false)

    const openShowMore = () => setShowMore(!showMore)
    const openDelModal = () => setIsDelOpen(true)
    const closeDelModal = () => setIsDelOpen(false)
    const { t } = useTranslation();


    return (
        <div>
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
                        // defaultValue="Город"
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
                        {t("Reset")}
                    </Buttons>
                </div>
                {showMore && (
                    <div className='flex flex-wrap gap-5 mt-5 '>
                        <Select
                            // defaultValue="Рейтинг"
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
            </div>
            <div>
                <div className='flex md:flex-row gap-3 flex-col reviews-shadow mt-5 items-center bg-white w-full h-max p-5 rounded-xl dark:bg-[#60606D] text-black dark:text-white mb-4'>
                    <div className='md:w-1/3 w-full'>
                        <p className='md:text-xl'>4,8 из 5 (225 отзывов)</p>
                        <p className='md:text-xl'>Мастера - 4,5 (125)</p>
                        <p className='md:text-xl'>Клиенты - 3,5 (100)</p>
                    </div>
                    <div className='md:w-1/3 w-full'>

                        <div className='flex'>
                            <div className='lg:w-1/3 md:w-1/2 w-full sm:w-1/5 flex flex-col gap-[2.5px]'>
                                <Rate disabled defaultValue={2} className="text-sm mr-2" />
                                <Rate disabled defaultValue={2} className="text-sm mr-2" />
                                <Rate disabled defaultValue={2} className="text-sm mr-2" />
                                <Rate disabled defaultValue={2} className="text-sm mr-2" />
                                <Rate disabled defaultValue={2} className="text-sm mr-2" />
                            </div>
                            <div className='lg:w-1/3 md:w-1/2 w-full sm:w-1/5'>
                                <p className='f'>234 отзывов</p>
                                <p className='f'>432 отзывов</p>
                                <p className='f'>423 отзывов</p>
                                <p className='f'>423 отзывов</p>
                                <p className='f'>234 отзывов</p>
                            </div>
                        </div>
                    </div>
                    <div className='md:w-1/3 w-full'>
                        <p className='md:text-xl'>Мастера мужчины - 4,5 (75)</p>
                        <p className='md:text-xl'>Мастера женщины - 4,5 (50)</p>
                        <p className='md:text-xl'>Клиенты мужчины - 3,5 (50)</p>
                        <p className='md:text-xl'>Клиенты женщины - 3,5 (50)</p>
                    </div>
                </div>
            </div>
            <div className='mt-4'>
                <ReviewsServiceCard
                    firstName='Имя'
                    lastName='Фамилия'
                    starCount={5}
                    description='Отличное Впечатление, легко бронировать. Оплачивать процедуры так удобно — не нужны ни наличные, ни карты!'
                    whoIs='Мастер'
                    createDate='25.02.2024'
                    openDelModal={openDelModal}
                />
            </div>
            <DelModal
                isOpen={isDelOpen}
                onClose={closeDelModal}
            />
        </div>
    );
};

export default FirstTab;
