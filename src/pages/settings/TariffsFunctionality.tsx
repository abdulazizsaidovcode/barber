import React, { useEffect, useState } from 'react';
import Accordion from '../../components/accordion/accordion';
import FunctionlityCard from '../../components/settings/details/FunctionlityCard';
import { Checkbox } from 'antd';
import { useTranslation } from 'react-i18next';
import DefaultLayout from '../../layout/DefaultLayout';
import axios from 'axios';
import { config } from '../../helpers/token';
import { base_url, subs_list, tarif_put_url } from '../../helpers/api';
import { clearFunction } from '../../common/clear-function/clear-function';
import { Buttons } from '../../components/buttons';
import EditModal from '../../components/settings/modals/editModal';
import toast from 'react-hot-toast';
// import DefaultLayout from '../../layout/DefaultLayout';
// import Modal from '../../components/modals/modal';
// import { Link } from 'react-router-dom';
// import axios from 'axios';
// import { tarif_add_url, tarif_url } from '../../helpers/api';
// import { config } from '../../helpers/token';
// import toast, { Toaster } from 'react-hot-toast';
// import { Skeleton } from 'antd';
// import { useTranslation } from 'react-i18next';
// import { clearFunction } from '../../common/clear-function/clear-function.tsx';

interface Data {
    limitBookingsUnlimited: boolean;
    numberOfAlbumsUnlimited: boolean;
    numberOfPhotosInOneAlbumUnlimited: boolean;
    limitBookingsCount: string | number;
    numberOfAlbumsCount: string | number;
    numberOfPhotosInOneAlbumCount: string | number;
}

// const TariffsFunctionality: React.FC = () => {
//     const [data, setData] = useState<Data[]>([]);
//     const [isOpen, setIsOpen] = useState(false);
//     const [newTariffName, setNewTariffName] = useState('');
//     const [loading, setLoading] = useState(true);
//     const [addLoading, setAddLoading] = useState(false);

//     useEffect(() => {
//         fetchData();
//     }, []);

//     const fetchData = async () => {
//         try {
//             const res = await axios.get(tarif_url, config);
//             setData(res.data.body);
//             setLoading(false);
//         } catch {
//             setLoading(false);
//             clearFunction()
//         }
//     };
//     const { t } = useTranslation();

//     const addData = async (name: string) => {
//         if (!name.trim() || /[^a-zA-Zа-яА-Я0-9]/.test(name)) {  // Rus harflarini qo'shish uchun tekshiruvni o'zgartirdim
//             toast(t("Please_enter"), { icon: '⚠️' });
//         } else {
//             setAddLoading(true);
//             try {
//                 await axios.post(tarif_add_url, { name }, config);
//                 fetchData();
//                 toast.success(t("Tariff_added_successfully"));
//                 closeModal();
//             } catch {
//                 toast.error(t("Failed_to_add_tariff"));
//                 clearFunction()
//             } finally {
//                 setAddLoading(false);
//                 clearFunction()
//             }
//         }
//     };

//     const closeModal = () => {
//         setIsOpen(false);
//         setNewTariffName('');
//     };

//     const openModal = () => setIsOpen(true);

//     interface TariffsFunctionalityCardProp {
//         title: string;
//         functions: string;
//         sum: string;
//         link: string;
//     }

//     const TariffsFunctionalityCard: React.FC<TariffsFunctionalityCardProp> = ({ title, link, functions, sum }) => {
//         return (
//             <Link to={link}>
//                 <div className='w-[160px] dark:bg-[#30303d] cursor-pointer gap-5 rounded-3xl shadow-3 flex flex-col justify-center items-center shadow-black bg-white h-[170px]'>
//                     <p className='font-bold text-black dark:text-white'>{title}</p>
//                     <p className={`${functions === t("not_configured") ? 'text-red-600' : ''}`}>{functions}</p>
//                     <p className={`${sum === t("not_configured") ? 'text-red-600' : ''}`}>{sum}</p>
//                 </div>
//             </Link>
//         );
//     };

//     return (
//         <>
//             <DefaultLayout>
//                 <div>
//                     <div className='flex justify-between'>
//                         <p className='text-xl dark:text-white'>{t("Tariffs_and_functionality")}</p>
//                         <button onClick={openModal} className='py-2 px-10 dark:text-white dark:bg-[#9C0A35] bg-[#eaeaea] rounded-2xl text-black'>{t("Add_Tariff")}</button>
//                     </div>
//                     <div className='flex flex-wrap gap-5 mt-5'>
//                         {loading ? (
//                             <Skeleton active paragraph={{ rows: 4 }} />
//                         ) : (
//                             data.map((item, index) => (
//                                 <div key={index}>
//                                     <TariffsFunctionalityCard
//                                         title={item.name}
//                                         functions={item.functionCount === 0 ? t("not_configured") : `${item.functionCount} Функций`}
//                                         sum={item.monthPrice === 0 || item.monthPrice === null ? t("not_configured") : `${item.monthPrice} сум`}
//                                         link={`/settings/tariff/${item.id}`}
//                                     />
//                                 </div>
//                             ))
//                         )}
//                     </div>
//                 </div>
//             </DefaultLayout>
//             <Modal isOpen={isOpen} onClose={closeModal}>
//                 <div className="md:w-[500px] md:h-[160px] sm:w-[300px] ">
//                     <p className="sm:text-xl text-black dark:text-white text-center">{t("add_tarifffe")}:</p>
//                     <input
//                         className="w-full border-[1px] dark:text-black border-black sm:p-2 p-1 rounded-lg mt-3"
//                         type="text"
//                         placeholder={t("Iltimos_tarif_nomini_kiriting")}
//                         value={newTariffName}
//                         onChange={(e) => setNewTariffName(e.target.value)}
//                     />
//                     <div className="flex mt-10 justify-center">
//                         <button
//                             className="sm:py-2 sm:px-10 px-5 py-1 rounded-lg dark:bg-danger bg-slate-800 text-white"
//                             onClick={() => addData(newTariffName)}
//                             disabled={addLoading}
//                         >
//                             {addLoading ? t("Loading") : t("Add")}
//                         </button>
//                     </div>
//                 </div>
//             </Modal>
//             <Toaster position='top-center' reverseOrder={false} />
//         </>
//     );
// }

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
            numberOfPhotosInOneAlbumCount: data.numberOfPhotosInOneAlbumCount ?? 0
        };
        try {
            const { data } = await axios.post(`${base_url}setting-program`, payload, config);
            if (data.success) {
                toast.success(t("Tariff_updated_successfully"));
            } else {
                toast.error(t("Something_went_wrong_updating_the_tariff"));
            }
        } catch {
            toast.error(t("An_error_occurred_while_updating_the_tariff"));
        }
        finally {
            clearFunction()
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
        setData((prevData: any) => ({ ...prevData, [field]: isChecked ? true : prevData[field] }));
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

    console.log(data);


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
                                    value={data && data.limitBookingsUnlimited}
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
                                <p className='mt-3 mb-3 dark:text-white'>{t("Number__albums")}</p>
                                <div className='flex justify-between'>
                                    <div className='w-[66%]'>
                                        <FunctionlityCard
                                            editOnClick={() => showModal('limitBookingsCount')}
                                            title={data ? `${data.limitBookingsUnlimited}` || '0' : '0'}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className='flex flex-col justify-between'>
                                <p className='mt-3 mb-3 dark:text-white'>{t("Number__albums")}</p>
                                <div className='flex justify-between'>
                                    <div className='w-[66%]'>
                                        <FunctionlityCard
                                            editOnClick={() => ''}
                                            title={data ? `${data.limitBookingsCount}` || '0' : '0'}
                                        />
                                    </div>

                                </div>
                            </div>
                            <div className='flex flex-col justify-between'>
                                <p className='mt-3 mb-3 dark:text-white'>{t("Number__albums")}</p>
                                <div className='flex justify-between'>
                                    <div className='w-[66%]'>
                                        <FunctionlityCard
                                            editOnClick={() => ''}
                                            title={data ? `${data.limitBookingsCount}` || '0' : '0'}
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
                                        value={data && data.numberOfAlbumsUnlimited}
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
                                        value={data && data.numberOfPhotosInOneAlbumUnlimited}
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