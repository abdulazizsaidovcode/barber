import Accordion from '../../components/accordion/accordion';
// import Switch from '../../components/settings/details/TableSwitcher';
import { useTranslation } from 'react-i18next';
import { updateHelp } from '../../helpers/api-function/help/help.tsx';
import helpStore from '../../helpers/state_managment/help/helpStore.tsx';
import { Buttons } from '../../components/buttons';
import Modal from '../../components/modals/modal.tsx';
import masterStore from '../../helpers/state_managment/master/masterStore.tsx';
import { useEffect, useState } from 'react';
import { MdEdit } from 'react-icons/md';


const ClientDocument = () => {
  const {
    dataClient,
    setDataClient,
    setUpdateTextArea,
    updateTextArea,
    // filesList,
    // uploadFileID,
    // selectedFilesDef,
    setSelectedFilesDef,
    helpRole
  } = helpStore();
  const { isModal, setIsModal, isLoading, setIsLoading } = masterStore();
  const [modalVal, setModalVal] = useState<{ text: string; active: boolean }>({ text: '', active: false });
  const { t } = useTranslation();

  useEffect(() => {
    setSelectedFilesDef([]);
  }, [helpRole]);

  const openModal = () => setIsModal(!isModal);

  return (
    <div className="p-2">
      <div className="flex flex-col gap-3 mb-3 ">
        {dataClient.map(item => (
          <Accordion title={t('Terms_of_use')}>
            {item.text && (
              <div
                className="border-[1px] text-[.8rem] sm:text-base px-2 sm:px-5 py-3 rounded-xl dark:border-white bg-white dark:bg-black text-slate-700 dark:text-slate-300">
                {item.text}
              </div>
            )}
            <div className={`${item.text ? 'mt-3' : ''} flex justify-end items-center text-slate-700 dark:text-slate-300`}>
              {/*<div className="flex gap-3 items-center my-7 text-slate-700 dark:text-slate-300">*/}
              {/*  <p className={`text-[.8rem] sm:text-base`}>{t('Show_in_apps')}</p>*/}
              {/*  <Switch*/}
              {/*    isOn={item.active}*/}
              {/*    handleToggle={() => updateIsActive(item, setDataClient, 'FOR_CLIENT')}*/}
              {/*  />*/}
              {/*</div>*/}
              <button
                onClick={() => {
                  setUpdateTextArea(item);
                  setModalVal({ text: item.text, active: item.active });
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
      {/*update save button*/}
      {/*<button*/}
      {/*  className={`bg-[#9C0A35] ${selectedFilesDef.length === 0 ? 'opacity-70 cursor-not-allowed' : ''} text-white px-3 py-2 rounded-lg`}*/}
      {/*  onClick={() => updateSaveButtons(filesList, uploadFileID, setDataClient, 'FOR_CLIENT', setSelectedFilesDef)}*/}
      {/*  disabled={selectedFilesDef.length === 0}*/}
      {/*>*/}
      {/*  {t('Save_changes')}*/}
      {/*</button>*/}

      {/*update modal*/}
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
              value={modalVal.text}
              onChange={e => setModalVal({ ...modalVal, text: e.target.value })}
            ></textarea>
            {/*<div className={`flex justify-start items-center gap-5 mt-5`}>*/}
            {/*  <input*/}
            {/*    className={`w-5 h-5 rounded-full`}*/}
            {/*    type="checkbox"*/}
            {/*    id={`helpActiveInputMaster`}*/}
            {/*    checked={modalVal.active}*/}
            {/*    onChange={e => setModalVal({ ...modalVal, active: e.target.checked })}*/}
            {/*  />*/}
            {/*  <label htmlFor={`helpActiveInputMaster`}*/}
            {/*         className={`text-lg text-black dark:text-white font-semibold`}>{t('Active')}</label>*/}
            {/*</div>*/}
            <div className={`flex justify-center items-center gap-6 mt-5`}>
              <Buttons bWidth={`w-[150px]`} onClick={openModal}>{t('Close')}</Buttons>
              <Buttons
                bWidth={`w-[150px]`}
                onClick={() => updateHelp(updateTextArea, setDataClient, 'FOR_CLIENT', modalVal, setIsLoading, openModal)}
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

export default ClientDocument;
