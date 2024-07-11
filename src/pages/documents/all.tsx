import { useEffect, useState } from 'react';
import Accordion from '../../components/accordion/accordion';
import Switch from '../../components/settings/details/TableSwitcher';
import FileUploader from '../../components/FileDowlander';
import { MdEdit } from 'react-icons/md';
import helpStore from '../../helpers/state_managment/help/helpStore.tsx';
import { HelpList } from '../../types/help.ts';
import { deleteHelpFile, updateHelp, updateIsActive, updateSaveButtons } from '../../helpers/api-function/help/help.tsx';
import Modal from '../../components/modals/modal.tsx';
import masterStore from '../../helpers/state_managment/master/masterStore.tsx';
import { Buttons } from '../../components/buttons';
import { useTranslation } from 'react-i18next';
import FileGetUploader from '../../components/FileDowlanderGet.tsx';

const All = () => {
  const {
    dataAll,
    setDataAll,
    updateTextArea,
    setUpdateTextArea, filesList,
    uploadFileID,
    setSelectedFilesDef,
    selectedFilesDef,
    deleteFileId,
    helpRole
  } = helpStore();
  const { isModal, setIsModal, isLoading, setIsLoading } = masterStore();
  const [modalVal, setModalVal] = useState<{ text: string; active: boolean }>({ text: '', active: false });
  const [deleteFile, setDeleteFile] = useState(false);
  const { t } = useTranslation();

  useEffect(() => {
    setSelectedFilesDef([]);
  }, [helpRole]);

  const trueFalse = (status: string) => status !== 'LICENSES' && status !== 'CERTIFICATES';
  const openIsModal = () => setIsModal(!isModal);
  const openDeleteModal = () => setDeleteFile(!deleteFile);

  function accordionList(params: boolean, id: number | string, name: string | null, item: HelpList) {
    return (
      <>
        {name && params && (
          <div
            className="border-[1px] text-[.8rem] sm:text-base px-2 sm:px-5 py-3 rounded-xl dark:border-white bg-white dark:bg-black text-slate-700 dark:text-slate-300">
            {name}
          </div>
        )}
        <div className={`mt-3 ${params && 'flex justify-between items-center'} text-slate-700 dark:text-slate-300`}>
          {!params && <FileGetUploader getList={item.attachments} openModal={openDeleteModal} idIn={item.id} />}
          <div className="flex gap-3 items-center my-3">
            {item.helpStatus !== 'ABOUT_SERVICE' && (
              <>
                <p className={`text-[.8rem] sm:text-base`}>{t('Show_in_apps')}</p>
                <Switch
                  isOn={item.active}
                  handleToggle={() => updateIsActive(item, setDataAll, 'ALL')}
                />
              </>
            )}
          </div>
          {params && (
            <button
              onClick={() => {
                setUpdateTextArea(item);
                setModalVal({ text: item.text, active: item.active });
                openIsModal();
              }}
              className="p-[6px] dark:border-[#fff] border-[#000] border-[1px] rounded-lg"
            >
              <MdEdit size={20} className="dark:text-white" />
            </button>
          )}
          {!params && <FileUploader id={`${item.id}`} item={item.attachments} />}
        </div>
      </>
    );
  }

  return (
    <div className="p-2">
      <div className="flex flex-col gap-3 mb-3 text-slate-700 dark:text-slate-300">
        {dataAll.map(item => (
          <Accordion
            title={
              item.helpStatus === 'ABOUT_SERVICE' ? t('About_the_service')
                : item.helpStatus === 'PRIVACY_POLICY' ? t('Privacy_Policy')
                  : item.helpStatus === 'LICENSE_AGREEMENT' ? t('License_agreement')
                    : item.helpStatus === 'LICENSES' ? t('License')
                      : item.helpStatus === 'CERTIFICATES' ? t('Certificates_and_other_documents')
                        : t('Using_the_application')
            }
            key={item.id}>
            {accordionList(trueFalse(item.helpStatus), item.id, item.text, item)}
          </Accordion>
        ))}
      </div>
      <button
        className={`bg-[#9C0A35] ${selectedFilesDef.length === 0 ? 'opacity-70 cursor-not-allowed' : ''} text-white px-3 py-2 rounded-lg mt-4`}
        onClick={() => updateSaveButtons(filesList, uploadFileID, setDataAll, 'ALL', setSelectedFilesDef)}
        disabled={selectedFilesDef.length === 0}
      >
        {t('Save_changes')}
      </button>

      {/*update modal*/}
      <Modal isOpen={isModal} onClose={openIsModal}>
        <div className={`w-[12rem] sm:w-[18rem] md:w-[25rem] lg:w-[30rem]`}>
          <div className={`flex flex-col justify-center`}>
            <p className={`font-bold text-xl text-black dark:text-white opacity-80 text-center`}>
              {t('Help_message_update')}
            </p>
          </div>
          <div className={`mt-5`}>
            <textarea
              placeholder={t('update_message')}
              className={`w-full px-3 py-2 outline-0 border border-graydark dark:border-white dark:bg-black dark:text-white rounded-lg`}
              rows={5}
              value={modalVal.text}
              onChange={e => setModalVal({ ...modalVal, text: e.target.value })}
            ></textarea>
            {updateTextArea?.helpStatus !== 'ABOUT_SERVICE' && (
              <div className={`flex justify-start items-center gap-5 mt-5`}>
                <input
                  className={`w-5 h-5 rounded-full`}
                  type="checkbox"
                  id={`helpActiveInput`}
                  checked={modalVal.active}
                  onChange={e => setModalVal({ ...modalVal, active: e.target.checked })}
                />
                <label htmlFor={`helpActiveInput`}
                  className={`text-lg text-black dark:text-white font-semibold`}>{t('Active')}</label>
              </div>
            )}
            <div className={`flex justify-center items-center gap-6 mt-5`}>
              <Buttons bWidth={`w-[150px]`} onClick={openIsModal}>{t('Close')}</Buttons>
              <Buttons
                bWidth={`w-[150px]`}
                onClick={() => updateHelp(updateTextArea, setDataAll, 'ALL', modalVal, setIsLoading, openIsModal)}
              >
                {isLoading ? t('Loading') : t('Save')}
              </Buttons>

            </div>
          </div>
        </div>
      </Modal>

      {/*  file delete modal*/}
      <Modal isOpen={deleteFile} onClose={openDeleteModal}>
        <div className={`w-[12rem] sm:w-[18rem] md:w-[25rem] lg:w-[30rem]`}>
          <div className={`flex flex-col justify-center`}>
            <p className={`font-bold text-xl text-black dark:text-white opacity-80 text-center`}>
              Bu fileni uchirishga ishonchingiz komilmi?
            </p>
          </div>
          <div className={`mt-5`}>
          </div>
          <div className={`flex justify-center items-center gap-6 mt-5`}>
            <Buttons
              bWidth={`w-[150px]`}
              onClick={() => deleteHelpFile(deleteFileId, setIsLoading, setDataAll, 'ALL', openDeleteModal)}
            >
              {isLoading ? 'loading...' : 'O\'chirish'}
            </Buttons>
            <Buttons bWidth={`w-[150px]`} onClick={openDeleteModal}>{t('Close')}</Buttons>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default All;
