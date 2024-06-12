import React from 'react';
import Accordion from '../../components/accordion/accordion';
import Switch from '../../components/settings/details/TableSwitcher';
import FileUploader from '../../components/FileDowlander';
import { useTranslation } from 'react-i18next';
import { deleteHelpFile, updateIsActive } from '../../helpers/api-function/help/help.tsx';
import helpStore from '../../helpers/state_managment/help/helpStore.tsx';
import FileGetUploader from '../../components/FileDowlanderGet.tsx';
import { Buttons } from '../../components/buttons';
import Modal from '../../components/modals/modal.tsx';
import masterStore from '../../helpers/state_managment/master/masterStore.tsx';


const ClientDocument: React.FC = () => {
  const { dataClient, setDataClient, deleteFileId } = helpStore();
  const { isModal, setIsModal, isLoading, setIsLoading } = masterStore();
  const { t } = useTranslation();

  const openModal = () => setIsModal(!isModal);
  console.log(deleteFileId);

  return (
    <div className="p-2">
      <div className="flex flex-col gap-3 mb-3 ">
        {dataClient.map(item => (
          <Accordion title={t('Terms_of_use')}>
            <FileGetUploader getList={item.attachments} openModal={openModal} idIn={item.id} />
            <div className="flex gap-3 items-center my-7 text-slate-700 dark:text-slate-300">
              <p>{t('Show_in_apps')}</p>
              <Switch
                isOn={item.active}
                handleToggle={() => updateIsActive(item, setDataClient, 'FOR_CLIENT')}
              />
            </div>
            <FileUploader id={`fileInput${item.id}`} />
          </Accordion>
        ))}
      </div>
      <button className={`bg-[#9C0A35] text-white px-3 py-2 rounded-lg`}>
        {t('Save_changes')}
      </button>

      <Modal isOpen={isModal} onClose={openModal}>
        <div className={`w-[12rem] sm:w-[18rem] md:w-[25rem] lg:w-[30rem]`}>
          <div className={`flex flex-col justify-center`}>
            <p className={`font-bold text-xl text-black dark:text-white opacity-80 text-center`}>
              Bu fileni uchirishga ishonchingiz komilmi?
            </p>
          </div>
          <div className={`mt-5`}>
          </div>
          <div className={`flex justify-center items-center gap-6 mt-5`}>
            <Buttons bWidth={`w-[150px]`} onClick={() => deleteHelpFile(deleteFileId, setIsLoading, setDataClient, 'FOR_CLIENT', openModal)}>
              {isLoading ? 'loading...' : 'O\'chirish'}
            </Buttons>
            <Buttons bWidth={`w-[150px]`} onClick={openModal}>{t('Close')}</Buttons>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default ClientDocument;
