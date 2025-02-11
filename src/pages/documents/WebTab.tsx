import Accordion from '../../components/accordion/accordion';
import { Buttons } from '../../components/buttons';
import Modal from '../../components/modals/modal.tsx';
import { useEffect, useState } from 'react';
import { MdEdit } from 'react-icons/md';
import axios from 'axios';
import { t } from 'i18next';
import { config } from '../../helpers/token.tsx';


const WebTab = () => {
    const [dataWeb, setDataWeb] = useState<any>()
    const [isModal, setIsModal] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const getApi = async () => {
        const res = await axios.get('http://207.154.246.120:8080/api/help/type?HELP_TYPE=ALL', config);
        setDataWeb(res?.data?.body);
    }
    useEffect(() => {
        getApi();
    }, []);

    const openModal = () => setIsModal(!isModal);

    return (
        <div className="p-2">
            <div className="flex flex-col gap-3 mb-3 ">
                {dataWeb && dataWeb?.map((item: any) => (
                    <Accordion title={t('Terms_of_use')}>
                        <div
                            className="border-[1px] text-[.8rem] sm:text-base px-2 sm:px-5 py-3 rounded-xl dark:border-white bg-white dark:bg-black text-slate-700 dark:text-slate-300">
                            {item.text || '-'}
                        </div>
                        <div className={`${item.text ? 'mt-3' : ''} flex justify-end items-center text-slate-700 dark:text-slate-300`}>
                            <div className="flex gap-3 items-center my-7 text-slate-700 dark:text-slate-300">
                                <p className={`text-[.8rem] sm:text-base`}>{t('Show_in_apps')}</p>
                                
                            </div>
                            <button
                                onClick={() => {
                                    openModal();
                                }}
                                className="p-[6px] dark:border-[#fff] border-[#000] border-[1px] rounded-lg"
                            >
                                <MdEdit size={20} className="dark:text-white" />
                            </button>
                        </div>
                    </Accordion>
                ))}
            </div>
            <Modal isOpen={isModal} onClose={openModal}>
                <div className={`w-[12rem] sm:w-[18rem] md:w-[25rem] lg:w-[30rem]`}>
                    <div className={`flex flex-col justify-center`}>
                        <p className={`font-bold text-xl text-black dark:text-white opacity-80 text-center`}>
                            {t('Help_message_update')}
                        </p>
                    </div>
                    <div className={`mt-5`}>
                        <textarea
                            placeholder={`update message...`}
                            className={`w-full px-3 py-2 outline-0 border border-graydark dark:border-white dark:bg-black dark:text-white rounded-lg`}
                            rows={5}
                        // value={modalVal.text}
                        // onChange={e => setModalVal({ ...modalVal, text: e.target.value })}
                        ></textarea>
                        <div className={`flex justify-center items-center gap-6 mt-5`}>
                            <Buttons bWidth={`w-[150px]`} onClick={openModal}>{t('Close')}</Buttons>
                            <Buttons
                                bWidth={`w-[150px]`}
                             // onClick={() => updateHelp(updateTextArea, setDataClient, 'FOR_CLIENT', modalVal, setIsLoading, openModal)}
                            >
                                {isLoading ? t('Loading') : t('Save')}
                            </Buttons>
                        </div>
                    </div>
                </div>
            </Modal>
        </div>
    );
};

export default WebTab;
