import React from 'react';
import userImg from '../../../../images/user.png';
import { GoDotFill } from "react-icons/go";
import { useTranslation } from 'react-i18next';
import { getFileId } from '../../../../helpers/api';
import { LazyLoadImage } from 'react-lazy-load-image-component';

interface FirstTabProp {
    phoneNumber?: string;
    telegramLink?: string;
    facebookLink?: string;
    masterImgId?: string;
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
    masterImgId,
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
    const displayValue = (value: string | undefined | null) => value ? value : t('not_configured');
    const displayArray = (array: string[] | undefined) => array && array.length > 0 ? array.join(', ') : t('not_configured');
    const { t } = useTranslation();

    console.log("masterImgPath", masterImgId);


    return (
        <div className='flex lg:flex-row flex-col justify-between'>
            <div className='lg:w-1/4 w-full mx-1 mt-3'>
                <div className='bg-[#cccccc] dark:bg-[#60606d] w-full h-[27%]'>
                    <div className='flex justify-end p-3 items-center'>
                        <GoDotFill className={masterChatStatus === 'OFFLINE' ? 'text-red-700' : 'text-[#24FF00]'} />
                        <p className='ml-2 dark:text-white'>{masterChatStatus === 'OFFLINE' ? t("Not_network") : t("Online")}</p>
                    </div>
                    <div className='flex justify-center'>
                        <LazyLoadImage
                            className="w-45 h-45 rounded-full"
                            src={masterImgId ? `${getFileId}${masterImgId}` : userImg}
                            alt="User Profile Picture"
                            effect="blur"
                        />

                    </div>
                </div>
                <div className='bg-[#cccccc] dark:bg-[#60606d] w-full h-[71.8%] mt-3 p-4 py-5'>
                    <div>
                        <p className='text-2xl dark:text-white'>{t("Contacts")}:</p>
                    </div>
                    <div className='my-3'><hr /></div>
                    <div className='flex justify-between w-full'>
                        <div className='flex flex-col gap-10'>
                            <p className='text-xl dark:text-white font-semibold'>{t("Phone")}: </p>
                            <p className='text-xl dark:text-white font-semibold'>{t("Phone")}: </p>
                            <p className='text-xl dark:text-white font-semibold'>{t("Instagram")}: </p>
                            <p className='text-xl dark:text-white font-semibold'>{t("Facebook")}: </p>
                        </div>
                        <div className='flex flex-col gap-10'>
                            <p className='text-xl dark:text-white'>{displayValue(phoneNumber)}</p>
                            <p className='text-xl dark:text-white'>{displayValue(telegramLink)}</p>
                            <p className='text-xl dark:text-white'>{displayValue(instagramLink)}</p>
                            <p className='text-xl dark:text-white'>{displayValue(facebookLink)}</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className='lg:w-3/4 w-full h-auto mx-1'>
                <div className='bg-[#cccccc] dark:bg-[#60606d] mt-3 p-4 py-5 w-full'>
                    <div>
                        <p className='text-2xl dark:text-white'>{t("siderbar_profile")}:</p>
                    </div>
                    <div className='my-3'><hr /></div>
                    <div className='flex justify-between lg:w-[60%]'>
                        <div className='flex flex-col gap-10'>
                            <p className='text-xl font-semibold dark:text-white'>{t("Name")}</p>
                            <p className='text-xl font-semibold dark:text-white'>{t("Surname")}</p>
                            <p className='text-xl font-semibold dark:text-white'>{t("Nickname")}</p>
                            <p className='text-xl font-semibold dark:text-white'>{t("Gender")}</p>
                            <p className='text-xl font-semibold dark:text-white'>{t("Age")}</p>
                            <p className='text-xl font-semibold dark:text-white'>{t("Region")}</p>
                            <p className='text-xl font-semibold dark:text-white'>{t("City")}</p>
                            <p className='text-xl font-semibold dark:text-white'>{t("Address")}</p>
                        </div>
                        <div className='flex flex-col gap-10'>
                            <p className='text-xl dark:text-white'>{displayValue(firstName)}</p>
                            <p className='text-xl dark:text-white'>{displayValue(lastName)}</p>
                            <p className='text-xl dark:text-white'>{displayValue(nickname)}</p>
                            <p className='text-xl dark:text-white'>{displayValue(gender)}</p>
                            <p className='text-xl dark:text-white'>{displayValue(age)}</p>
                            <p className='text-xl dark:text-white'>{displayValue(regionName)}</p>
                            <p className='text-xl dark:text-white'>{displayValue(districtName)}</p>
                            <p className='text-xl dark:text-white'>{displayValue(address)}</p>
                        </div>
                    </div>
                </div>
                <div className='bg-[#cccccc] dark:bg-[#60606d] p-4 py-5 w-full mt-3'>
                    <div>
                        <p className='text-2xl dark:text-white'>{t("Profession_information")}:</p>
                    </div>
                    <div className='my-3'><hr /></div>
                    <div className='flex lg:w-[60%] justify-between '>
                        <div className='flex flex-col gap-10'>
                            <p className='text-xl dark:text-white font-semibold'>{t("Place_of_work")}</p>
                            <p className='text-xl dark:text-white font-semibold'>{t("Direction_by_gender")}</p>
                            <p className='text-xl dark:text-white font-semibold'>{t("Service_category")}</p>
                            <p className='text-xl dark:text-white font-semibold'>{t("Specialization")}</p>
                            <p className='text-xl dark:text-white font-semibold'>{t("Schedule_Type")}</p>
                        </div>
                        <div className='flex flex-col gap-10'>
                            <p className='text-xl dark:text-white'>{displayValue(placeOfWork)}</p>
                            <p className='text-xl dark:text-white'>{displayArray(directionByGender)}</p>
                            <p className='text-xl dark:text-white'>{displayArray(masterServiceCategory)}</p>
                            <p className='text-xl dark:text-white'>{displayArray(masterSpecialization)}</p>
                            <p className='text-xl dark:text-white'>{displayValue(scheduleType)}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default FirstTab;
