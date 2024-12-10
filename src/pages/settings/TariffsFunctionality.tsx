import React, { useEffect, useState } from 'react';
import Accordion from '../../components/accordion/accordion';
import FunctionlityCard from '../../components/settings/details/FunctionlityCard';
import { Checkbox } from 'antd';
import { useTranslation } from 'react-i18next';
import DefaultLayout from '../../layout/DefaultLayout';
import axios from 'axios';
import { config } from '../../helpers/token';
import { base_url } from '../../helpers/api';
import { clearFunction } from '../../common/clear-function/clear-function';
import { Buttons } from '../../components/buttons';
import EditModal from '../../components/settings/modals/editModal';
import toast from 'react-hot-toast';

interface Data {
    limitBookingsUnlimited: boolean;
    numberOfAlbumsUnlimited: boolean;
    numberOfPhotosInOneAlbumUnlimited: boolean;
    limitBookingsCount: string | number;
    numberOfAlbumsCount: string | number;
    numberOfPhotosInOneAlbumCount: string | number;
    day: number;
    month: number;
    year: number;
}

const TariffsFunctionality: React.FC = () => {
    const { t } = useTranslation();
    const [data, setData] = useState<Data | null | any>(null);
    const [isOpen, setIsOpen] = useState<boolean>(false)
    const [currentField, setCurrentField] = useState<keyof Data | null>(null);
    const [currentValue, setCurrentValue] = useState<number>(0);
    const [localHasChanges, setLocalHasChanges] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const { data } = await axios.get(`${base_url}setting-program`, config);
                if (data.success) setData(data.body)
                else setData(null)
            } catch { }
            finally {
                clearFunction()
            }
        }

        fetchData()
    }, []);

    const updateData = async () => {
        const payload = {
            limitBookingsUnlimited: data.limitBookingsUnlimited ?? false,
            numberOfAlbumsUnlimited: data.numberOfAlbumsUnlimited ?? false,
            numberOfPhotosInOneAlbumUnlimited: data.numberOfPhotosInOneAlbumUnlimited ?? false,
            limitBookingsCount: data.limitBookingsCount ?? 0,
            numberOfAlbumsCount: data.numberOfAlbumsCount ?? 0,
            numberOfPhotosInOneAlbumCount: data.numberOfPhotosInOneAlbumCount ?? 0,
            day: data.day ?? 0,
            month: data.month ?? 0,
            year: data.year ?? 0
        };
        try {
            const { data } = await axios.post(`${base_url}setting-program`, payload, config);
            if (data.success) {
                toast.success(t("Setting_program_updated_successfully"));
            } else {
                toast.error(t("Something_went_wrong_updating_the_tariff"));
            }
        } catch {
            toast.error(t("An_error_occurred_while_updating_the_tariff"));
        }
        finally {
            clearFunction();
        }
    };

    const showModal = (field: keyof Data) => {
        setCurrentField(field);
        setCurrentValue(data[field]);
        setIsOpen(true);
    };

    const handleValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCurrentValue(Number(e.target.value));
    };

    const handleCheckboxChange = (field: keyof Data, isChecked: boolean) => {
        setData((prevData: any) => ({ ...prevData, [field]: isChecked }));
        setLocalHasChanges(true);
    };

    const handleOk = () => {
        if (currentField !== null) {
            setData((prevData: any) => ({ ...prevData, [currentField]: currentValue }));
            setLocalHasChanges(true);
        }
        setIsOpen(false);
    };

    const handleCancel = () => {
        setIsOpen(false);
    };

    return (
        <DefaultLayout>
            <div className='w-full gap-3 flex md:flex-row flex-col justify-between'>
                <div className='md:w-1/2  flex flex-col gap-3'>
                    <Accordion title={t("Limit_bookings_per_month")}>
                        <div className='flex md:flex-row flex-col justify-between'>
                            <div className='md:w-[66%]'>
                                <FunctionlityCard
                                    editOnClick={() => showModal('limitBookingsCount')}
                                    title={data ? `${data.limitBookingsCount}` || '0' : '0'}
                                />
                            </div>
                            <div className='md:w-[30%] flex items-center justify-between'>
                                <Checkbox
                                    className='dark:text-white'
                                    checked={data?.limitBookingsUnlimited}
                                    onChange={(e) => handleCheckboxChange('limitBookingsUnlimited', e.target.checked)}
                                >
                                    {t("Not_limited")}
                                </Checkbox>

                            </div>
                        </div>
                    </Accordion>
                    <Accordion title={t("subscription_cost")}>
                        <div className='flex flex-col'>
                            <div className='flex flex-col justify-between'>
                                <p className='mt-3 mb-3 dark:text-white'>10 {t("day")}</p>
                                <div className='flex justify-between'>
                                    <div className='w-[66%]'>
                                        <FunctionlityCard
                                            editOnClick={() => showModal('day')}
                                            title={data ? `${data.day}` || '0' : '0'}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className='flex flex-col justify-between'>
                                <p className='mt-3 mb-3 dark:text-white'>{t("Month")}</p>
                                <div className='flex justify-between'>
                                    <div className='w-[66%]'>
                                        <FunctionlityCard
                                            editOnClick={() => showModal('month')}
                                            title={data ? `${data.month}` || '0' : '0'}
                                        />
                                    </div>

                                </div>
                            </div>
                            <div className='flex flex-col justify-between'>
                                <p className='mt-3 mb-3 dark:text-white'>{t("Year")}</p>
                                <div className='flex justify-between'>
                                    <div className='w-[66%]'>
                                        <FunctionlityCard
                                            editOnClick={() => showModal('year')}
                                            title={data ? `${data.year}` || '0' : '0'}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Accordion>
                </div>
                <div className='md:w-1/2 flex flex-col gap-3'>
                    <Accordion title={t("gallery_limit")}>
                        <div className='flex flex-col justify-between'>
                            <p className='mt-3 mb-3 dark:text-white'>{t("Number__albums")}</p>
                            <div className='flex justify-between'>
                                <div className='w-[66%]'>
                                    <FunctionlityCard
                                        editOnClick={() => showModal('numberOfAlbumsCount')}
                                        title={data ? `${data.numberOfAlbumsCount}` || '0' : '0'}
                                    />
                                </div>
                                <div className='w-[30%] flex items-center justify-between'>
                                    <Checkbox
                                        className='dark:text-white'
                                        checked={data?.numberOfAlbumsUnlimited}
                                        onChange={(e) => handleCheckboxChange('numberOfAlbumsUnlimited', e.target.checked)}
                                    >
                                        {t("Not_limited")}
                                    </Checkbox>
                                </div>
                            </div>
                        </div>
                        <div className='flex flex-col justify-between'>
                            <p className='mt-3 mb-3 dark:text-white'>{t("Number_of_photos_in_album")}</p>
                            <div className='flex justify-between'>
                                <div className='w-[66%]'>
                                    <FunctionlityCard
                                        editOnClick={() => showModal('numberOfPhotosInOneAlbumCount')}
                                        title={data ? `${data.numberOfPhotosInOneAlbumCount}` || '0' : '0'}
                                    />
                                </div>
                                <div className='w-[30%] flex items-center justify-between'>
                                    <Checkbox
                                        className='dark:text-white'
                                        checked={data?.numberOfPhotosInOneAlbumUnlimited}
                                        onChange={(e) => handleCheckboxChange('numberOfPhotosInOneAlbumUnlimited', e.target.checked)}
                                    >
                                        {t("Not_limited")}
                                    </Checkbox>
                                </div>
                            </div>
                        </div>
                    </Accordion>
                </div>
            </div>
            <div className='mt-3'>
                <Buttons disabled={!localHasChanges} onClick={updateData}>
                    {t("Save_changes")}
                </Buttons>
            </div>
            <EditModal
                isOpen={isOpen}
                onClose={handleCancel}
                defaultValue={`${currentValue}`}
                type='number'
                onChange={handleValueChange}
                onSave={handleOk}
            />
        </DefaultLayout>
    )
}

export default TariffsFunctionality;