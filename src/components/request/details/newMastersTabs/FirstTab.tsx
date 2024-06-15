import React from 'react';
import userImg from '../../../../images/user.png';
import { GoDotFill } from "react-icons/go";
import { useTranslation } from 'react-i18next';

interface FirstTabProp {
    phoneNumber?: string;
    telegramLink?: string;
    facebookLink?: string;
    masterImgPath?: string;
    nickname?: string;
    instagramLink?: string;
    firstName?: string;
    lastName?: string;
    gender?: string;
    age?: string;
    regionName?: string;
    masterChatStatus?: string;
    address?: string;
    placeOfWork?: string;
    masterServiceCategory?: string[];
    masterSpecialization?: string[];
    scheduleType?: string;
    districtName?: string;
    directionByGender?: string[];
}

const FirstTab: React.FC<FirstTabProp> = ({
    phoneNumber,
    nickname,
    masterImgPath,
    masterServiceCategory,
    scheduleType,
    masterSpecialization,
    placeOfWork,
    instagramLink,
    firstName,
    lastName,
    telegramLink,
    address,
    facebookLink,
    gender,
    age,
    regionName,
    masterChatStatus,
    districtName,
    directionByGender
}) => {
    const displayValue = (value: string | undefined | null) => value ? value : 'не настроено';
    const displayArray = (array: string[] | undefined) => array && array.length > 0 ? array.join(', ') : 'не настроено';
    const { t } = useTranslation();

    return (
        <div className='flex lg:flex-row flex-col justify-between'>
            <div className='lg:w-1/4 w-full mx-1 mt-3'>
                <div className='bg-[#cccccc] dark:bg-[#60606d] w-full h-[27%]'>
                    <div className='flex justify-end p-3 items-center'>
                        <GoDotFill className={masterChatStatus === 'OFFLINE' ? 'text-red-700' : 'text-[#24FF00]'} />
                        <p className='ml-2'>{masterChatStatus === 'OFFLINE' ? t("Not_network") : t("Online")}</p>
                    </div>
                    <div className='flex justify-center'>
                        <img className='w-45 h-45' src={masterImgPath ? masterImgPath : userImg} alt="Profile" />
                    </div>
                </div>
                <div className='bg-[#cccccc] dark:bg-[#60606d] w-full h-[71.8%] mt-3 p-4 py-5'>
                    <div>
                        <p className='text-2xl'>{t("Contacts")}:</p>
                    </div>
                    <div className='my-3'><hr /></div>
                    <div className='flex justify-between w-full'>
                        <div className='flex flex-col gap-10'>
                            <p className='text-xl font-semibold'>{t("Phone")}</p>
                            <p className='text-xl font-semibold'>{t("Phone")}</p>
                            <p className='text-xl font-semibold'>{t("Instagram")}</p>
                            <p className='text-xl font-semibold'>{t("Facebook")}</p>
                        </div>
                        <div className='flex flex-col gap-10'>
                            <p className='text-xl'>{displayValue(phoneNumber)}</p>
                            <p className='text-xl'>{displayValue(telegramLink)}</p>
                            <p className='text-xl'>{displayValue(instagramLink)}</p>
                            <p className='text-xl'>{displayValue(facebookLink)}</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className='lg:w-3/4 w-full h-auto mx-1'>
                <div className='bg-[#cccccc] dark:bg-[#60606d] mt-3 p-4 py-5 w-full'>
                    <div>
                        <p className='text-2xl'>{t("siderbar_profile")}:</p>
                    </div>
                    <div className='my-3'><hr /></div>
                    <div className='flex justify-between lg:w-[60%]'>
                        <div className='flex flex-col gap-10'>
                            <p className='text-xl font-semibold'>Имя</p>
                            <p className='text-xl font-semibold'>Фамилия</p>
                            <p className='text-xl font-semibold'>Никнейм</p>
                            <p className='text-xl font-semibold'>Пол</p>
                            <p className='text-xl font-semibold'>Возраст</p>
                            <p className='text-xl font-semibold'>Регион</p>
                            <p className='text-xl font-semibold'>Город</p>
                            <p className='text-xl font-semibold'>Адрес</p>
                        </div>
                        <div className='flex flex-col gap-10'>
                            <p className='text-xl'>{displayValue(firstName)}</p>
                            <p className='text-xl'>{displayValue(lastName)}</p>
                            <p className='text-xl'>{displayValue(nickname)}</p>
                            <p className='text-xl'>{displayValue(gender)}</p>
                            <p className='text-xl'>{displayValue(age)}</p>
                            <p className='text-xl'>{displayValue(regionName)}</p>
                            <p className='text-xl'>{displayValue(districtName)}</p>
                            <p className='text-xl'>{displayValue(address)}</p>
                        </div>
                    </div>
                </div>
                <div className='bg-[#cccccc] dark:bg-[#60606d] p-4 py-5 w-full mt-3'>
                    <div>
                        <p className='text-2xl'>Информация о профессии:</p>
                    </div>
                    <div className='my-3'><hr /></div>
                    <div className='flex lg:w-[60%] justify-between '>
                        <div className='flex flex-col gap-10'>
                            <p className='text-xl font-semibold'>Место работы</p>
                            <p className='text-xl font-semibold'>Напраление по полу</p>
                            <p className='text-xl font-semibold'>Категория услуг</p>
                            <p className='text-xl font-semibold'>Специализация</p>
                            <p className='text-xl font-semibold'>Тип расписания</p>
                        </div>
                        <div className='flex flex-col gap-10'>
                            <p className='text-xl'>{displayValue(placeOfWork)}</p>
                            <p className='text-xl'>{displayArray(directionByGender)}</p>
                            <p className='text-xl'>{displayArray(masterServiceCategory)}</p>
                            <p className='text-xl'>{displayArray(masterSpecialization)}</p>
                            <p className='text-xl'>{displayValue(scheduleType)}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default FirstTab;
