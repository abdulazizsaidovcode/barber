import React, { useEffect, useState } from 'react'
import RequestLayout from '../../../pages/request/request'
import { useTranslation } from 'react-i18next';
import SpecializationsCard from '../cards/specializationsCard';
import userImg from '../../../images/user.png';
import axios from 'axios';
import { base_url, getFileId } from '../../../helpers/api';
import { RequestMessage, RequestsSalon } from '../../../types/salon';
import { config } from '../../../helpers/token';
import Modal from '../../modals/modal';
import { Skeleton } from 'antd';

const RequestSalons: React.FC = () => {
    const { t } = useTranslation();
    const [salons, setSalons] = useState<RequestsSalon[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isModal, setIsModal] = useState(false);
    const [message, setMessage] = useState<RequestMessage | null>(null);

    useEffect(() => {
        fetchRequestsSalon()
    }, [setSalons])


    const fetchRequestsSalon = async () => {
        setIsLoading(true)
        try {
            const { data } = await axios.get(`${base_url}message/for/admin`, config);
            if (data.success) {
                setSalons(data.body)
                setIsLoading(false)
            } else setIsLoading(false)
        } catch {
            setIsLoading(false)
        }
    }

    const readMessage = async (id: number) => {
        try {
            const { data } = await axios.get(`${base_url}message/${id}`, config);
            if (data.success) {
                fetchRequestsSalon()
            }
        } catch { }
    }

    console.log(salons);


    const toggleModal = () => {
        setIsModal(!isModal)
        setMessage(null)
    }

    return (
        <RequestLayout>
            <div className='bg-[#f5f6f7] dark:bg-[#21212e] h-max pb-5 w-full reviews-shadow'>
                <div className="w-full bg-[#cccccc] dark:bg-white h-12 flex justify-center items-center px-5">
                    <div className="flex gap-3">
                        <p className="dark:text-[#000]">{t("Salons")}</p>
                        <div className="w-6 flex items-center justify-center rounded-full h-6 bg-[#f1f5f9] dark:bg-[#21212e] dark:text-white">
                            <p className="text-sm">{salons.length | 0}</p>
                        </div>
                    </div>
                </div>
                <div className='p-4 px-10 flex flex-wrap gap-3 justify-between'>
                    {isLoading ? (
                        Array.from({ length: 6 }).map((_, index) => (
                            <Skeleton key={index} active avatar paragraph={{ rows: 2 }} />
                        ))
                    ) : salons.length !== 0 ? salons.map((item, index) => (
                        <SpecializationsCard
                            key={index}
                            salonOwner={item.masterFullName}
                            phoneNumber={item.phoneNumber}
                            salonCreateDate={item.sendDate}
                            salonDescription={t('master_message_for_salon')}
                            ownerImage={item.masterPhoto ? getFileId + item.masterPhoto : userImg}
                            onClick={() => {
                                toggleModal()
                                setMessage({ message: item.message, title: item.title });
                                readMessage(item.id)
                            }}
                        />
                    )) :
                        <div className="w-full h-[510px] flex justify-center items-center">
                            <p>{t("master_message_not_found")}</p>
                        </div>}
                </div>
            </div>
            <Modal isOpen={isModal} onClose={toggleModal}>
                <div className='w-54 sm:w-64 md:w-96 lg:w-[30rem]'>
                    <p className='text-2xl text-center'>{message?.title}</p>
                    <p className='text-lg text-center'>{message?.message}</p>
                </div>
            </Modal>
        </RequestLayout>
    )
}

export default RequestSalons