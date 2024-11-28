import { useEffect, useState } from 'react';
import Accordion from '../../components/accordion/accordion';
// import Switch from '../../components/settings/details/TableSwitcher';
import { MdEdit } from 'react-icons/md';
import FileUploader from '../../components/FileDowlander';
import helpStore from '../../helpers/state_managment/help/helpStore.tsx';
import {
  // deleteHelpFile,
  updateHelp,
  updateSaveButtons
} from '../../helpers/api-function/help/help.tsx';
import masterStore from '../../helpers/state_managment/master/masterStore.tsx';
import { Buttons } from '../../components/buttons';
import Modal from '../../components/modals/modal.tsx';
import { useTranslation } from 'react-i18next';
// import FileGetUploader from '../../components/FileDowlanderGet.tsx';

const MasterDocument = () => {
  const {
    dataMaster,
    setDataMaster,
    setUpdateTextArea,
    updateTextArea,
    selectedFilesDef,
    setSelectedFilesDef,
    uploadFileID,
    filesList,
    // deleteFileId,
    helpRole
  } = helpStore();
  const { isModal, setIsModal, isLoading, setIsLoading } = masterStore();
  const [modalVal, setModalVal] = useState<{ text: string; active: boolean }>({ text: '', active: false });
  // const [deleteFile, setDeleteFile] = useState(false);

  useEffect(() => {
    setSelectedFilesDef([]);
  }, [helpRole]);

  const trueFalse = (status: string) => status !== 'SERVICE_SPECIFICATION';
  const openModal = () => setIsModal(!isModal);
  // const openDeleteModal = () => setDeleteFile(!deleteFile);
  const { t } = useTranslation();

  return (
    <div className="p-2">
      <div className="flex flex-col gap-3 mb-3">
        {dataMaster.map(item => (
          <Accordion title={item.helpStatus === 'SERVICE_SPECIFICATION' ? t('Service_Specification') : t('Offer')}>
            {trueFalse(item.helpStatus) && item.text && (
              <div
                className="border-[1px] text-[.8rem] sm:text-base px-2 sm:px-5 py-3 rounded-xl dark:border-white bg-white dark:bg-black text-slate-700 dark:text-slate-300">
                {item.text}
              </div>
            )}
            <div
              className={`mt-3 ${trueFalse(item.helpStatus) && 'flex justify-end items-center'} text-slate-700 dark:text-slate-300`}>
              {/*{!trueFalse(item.helpStatus) && (*/}
              {/*  <FileGetUploader getList={item.attachments} openModal={openDeleteModal} idIn={item.id} />*/}
              {/*)}*/}
              {/*<div className="flex gap-3 items-center my-4">*/}
              {/*  <p className={`text-[.8rem] sm:text-base`}>{t('Show_in_apps')}</p>*/}
              {/*  <Switch*/}
              {/*    isOn={item.active}*/}
              {/*    handleToggle={() => updateIsActive(item, setDataMaster, 'FOR_MASTER')}*/}
              {/*  />*/}
              {/*</div>*/}
              {trueFalse(item.helpStatus) && (
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
              )}
              {!trueFalse(item.helpStatus) && <FileUploader id={`${item.id}`} item={item.attachments} />}
            </div>
          </Accordion>
        ))}
      </div>
      <button
        className={`bg-[#9C0A35] ${selectedFilesDef.length === 0 ? 'opacity-70 cursor-not-allowed' : ''} text-white px-3 py-2 rounded-lg`}
        onClick={() => updateSaveButtons(filesList, uploadFileID, setDataMaster, 'FOR_MASTER', setSelectedFilesDef)}
        disabled={selectedFilesDef.length === 0}
      >
        {t('Save_changes')}
      </button>

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
              <Buttons
                bWidth={`w-[150px]`}
                onClick={() => updateHelp(updateTextArea, setDataMaster, 'FOR_MASTER', modalVal, setIsLoading, openModal)}
              >
                {isLoading ? t('Loading') : t('Save')}
              </Buttons>
              <Buttons bWidth={`w-[150px]`} onClick={openModal}>{t('Close')}</Buttons>
            </div>
          </div>
        </div>
      </Modal>

      {/*  file delete modal*/}
      {/*<Modal isOpen={deleteFile} onClose={openDeleteModal}>*/}
      {/*  <div className={`w-[12rem] sm:w-[18rem] md:w-[25rem] lg:w-[30rem]`}>*/}
      {/*    <div className={`flex flex-col justify-center`}>*/}
      {/*      <p className={`font-bold text-xl text-black dark:text-white opacity-80 text-center`}>*/}
      {/*        Bu fileni uchirishga ishonchingiz komilmi?*/}
      {/*      </p>*/}
      {/*    </div>*/}
      {/*    <div className={`mt-5`}>*/}
      {/*    </div>*/}
      {/*    <div className={`flex justify-center items-center gap-6 mt-5`}>*/}
      {/*      <Buttons bWidth={`w-[150px]`}*/}
      {/*               onClick={() => deleteHelpFile(deleteFileId, setIsLoading, setDataMaster, 'FOR_MASTER', openDeleteModal)}>*/}
      {/*        {isLoading ? 'loading...' : 'O\'chirish'}*/}
      {/*      </Buttons>*/}
      {/*      <Buttons bWidth={`w-[150px]`} onClick={openDeleteModal}>{t('Close')}</Buttons>*/}
      {/*    </div>*/}
      {/*  </div>*/}
      {/*</Modal>*/}
    </div>
  );
};

export default MasterDocument;
