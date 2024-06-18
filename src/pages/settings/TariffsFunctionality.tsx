import React, { useEffect, useState } from 'react';
import DefaultLayout from '../../layout/DefaultLayout';
import Modal from '../../components/modals/modal';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { tarif_add_url, tarif_url } from '../../helpers/api';
import { config } from '../../helpers/token';
import toast, { Toaster } from 'react-hot-toast';
import { Skeleton } from 'antd';
import { useTranslation } from 'react-i18next';

interface Data {
    id: number;
    name: string;
    functionCount: number;
    monthPrice: number;
}

const TariffsFunctionality: React.FC = () => {
    const [data, setData] = useState<Data[]>([]);
    const [isOpen, setIsOpen] = useState(false);
    const [newTariffName, setNewTariffName] = useState('');
    const [loading, setLoading] = useState(true);
    const [addLoading, setAddLoading] = useState(false);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const res = await axios.get(tarif_url, config);
            setData(res.data.body);
            setLoading(false);
        } catch {
            setLoading(false);
        }
    };
    const { t } = useTranslation();

    const addData = async (name: string) => {
        if (!name.trim() || /[^a-zA-Zа-яА-Я0-9]/.test(name)) {  // Rus harflarini qo'shish uchun tekshiruvni o'zgartirdim
            toast('Please enter a valid category name without spaces or special characters', { icon: '⚠️' });
        } else {
            setAddLoading(true);
            try {
                await axios.post(tarif_add_url, { name }, config);
                fetchData();
                toast.success(t("Tariff_added_successfully"));
                closeModal();
            } catch {
                toast.error(t("Failed_to_add_tariff"));
            } finally {
                setAddLoading(false);
            }
        }
    };

    const closeModal = () => {
        setIsOpen(false);
        setNewTariffName('');
    };

    const openModal = () => setIsOpen(true);

    interface TariffsFunctionalityCardProp {
        title: string;
        functions: string;
        sum: string;
        link: string;
    }

    const TariffsFunctionalityCard: React.FC<TariffsFunctionalityCardProp> = ({ title, link, functions, sum }) => {
        return (
            <Link to={link}>
                <div className='w-[160px] dark:bg-[#30303d] cursor-pointer gap-5 rounded-3xl shadow-3 flex flex-col justify-center items-center shadow-black bg-white h-[170px]'>
                    <p className='font-bold text-black dark:text-white'>{title}</p>
                    <p className={`${functions === 'не настроено' ? 'text-red-600' : ''}`}>{functions}</p>
                    <p  className={`${sum === 'не настроено' ? 'text-red-600' : ''}`}>{sum}</p>
                </div>
            </Link>
        );
    };

    return (
        <>
            <DefaultLayout>
                <div>
                    <div className='flex justify-between'>
                        <p className='text-xl dark:text-white'>{t("Tariffs_and_functionality")}</p>
                        <button onClick={openModal} className='py-2 px-10 dark:text-white dark:bg-[#9C0A35] bg-[#eaeaea] rounded-2xl text-black'>{t("Add_Tariff")}</button>
                    </div>
                    <div className='flex flex-wrap gap-5 mt-5'>
                        {loading ? (
                            <Skeleton active paragraph={{ rows: 4 }} />
                        ) : (
                            data.map((item, index) => (
                                <div key={index}>
                                    <TariffsFunctionalityCard
                                        title={item.name}
                                        functions={item.functionCount === 0 ? 'не настроено' : `${item.functionCount} Функций`}
                                        sum={item.monthPrice === 0 || item.monthPrice === null ? 'не настроено' : `${item.monthPrice} сум`}
                                        link={`/settings/tariff/${item.id}`}
                                    />
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </DefaultLayout>
            <Modal isOpen={isOpen} onClose={closeModal}>
                <div className="md:w-[500px] md:h-[160px] sm:w-[300px] ">
                    <p className="sm:text-xl text-black dark:text-white text-center">{t("add_tarifffe")}:</p>
                    <input
                        className="w-full border-[1px] dark:text-black border-black sm:p-2 p-1 rounded-lg mt-3"
                        type="text"
                        placeholder={t("Wellness_treatments")}
                        value={newTariffName}
                        onChange={(e) => setNewTariffName(e.target.value)}
                    />
                    <div className="flex mt-10 justify-center">
                        <button
                            className="sm:py-2 sm:px-10 px-5 py-1 rounded-lg dark:bg-danger bg-slate-800 text-white"
                            onClick={() => addData(newTariffName)}
                            disabled={addLoading}
                        >
                            {addLoading ? t("Loading") : t("Add")}
                        </button>
                    </div>
                </div>
            </Modal>
            <Toaster position='top-center' reverseOrder={false} />
        </>
    );
}

export default TariffsFunctionality;