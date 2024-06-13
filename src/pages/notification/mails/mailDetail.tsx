import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import DefaultLayout from '../../../layout/DefaultLayout';
import MailStore from '../../../helpers/state_managment/chat/mailStore';
import { Buttons } from '../../../components/buttons';
import Breadcrumbs from '../../../components/Breadcrumbs/Breadcrumb';
import { getFileId } from '../../../helpers/api';
import { Image } from 'antd';
import { truncateText } from '../../../helpers/splitText';
import { useTranslation } from 'react-i18next';

const MailDetail: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [mail, setMail] = useState<any>(null);
    const { chatData } = MailStore();

    useEffect(() => {
        const selectedMail = chatData.find((item: any) => item.id === Number(id));
        setMail(selectedMail);
        console.log(selectedMail);

    }, [id, chatData]);

    if (!mail) {
        return (
            <DefaultLayout>
                <Breadcrumbs pageName='Maildetail' />
                <div className="p-5 dark:bg-boxdark dark:text-white">
                    <p>{t("Mail_not_found")}.</p>
                </div>
            </DefaultLayout>
        );
    }
    const { t } = useTranslation()

    return (
        <DefaultLayout>
            <Breadcrumbs pageName='Maildetail' />
            <div className="h-max w-full p-5 dark:bg-boxdark bg-slate-200 dark:text-white rounded-md">
                <div className="mb-4">
                    <p className="text-lg"><strong>{t("Subject")}:</strong> {mail.subject}</p>
                </div>
                <div className="mb-4">
                    <p className="text-lg"><strong>{t("That")}:</strong> {mail.toWhom}</p>
                </div>
                <div className="mb-4">
                    <p className="text-lg"><strong>{t("Date")}:</strong> {mail.date}</p>
                </div>
                <div className="mb-4 w-full text-wrap">
                    <strong>{t("Content")}:</strong>
                    <p className="text-lg w-full"> {mail.content}</p>
                </div>
                {mail.attachmentId ? (
                    <div className="mb-4 p-3 border h-64 object-cover  rounded-md dark:border-[#9c0935] flex flex-col">
                        <strong>{t("Attachment")}:</strong>
                        <Image style={{ width: 200, height: 200 }} src={getFileId + mail.attachmentId} alt="Attachment" className="mt-2 w-full h-full rounded-md" />
                    </div>
                ) :
                    <div>{t("Image_not")}.</div>
                }
                {mail.fileId && (
                    <div className="mb-4">
                        <strong>File:</strong>
                        <div className='flex gap-2'>
                            <p>{mail.fileName}</p>
                            <a href={getFileId + mail.fileId} download className="text-blue-500 underline ml-2">{t("Download")}</a>
                        </div>
                    </div>
                )}
                <div className="mt-5 flex gap-2">
                    <Buttons onClick={() => window.history.back()}>{t("Back")}</Buttons>
                </div>
            </div>

        </DefaultLayout>
    );
};

export default MailDetail;
