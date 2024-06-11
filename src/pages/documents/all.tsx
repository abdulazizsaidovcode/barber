import React, { useState } from 'react';
import Accordion from '../../components/accordion/accordion';
import Switch from '../../components/settings/details/TableSwitcher';
import FileUploader from '../../components/FileDowlander';
import { MdEdit } from 'react-icons/md';
import helpStore from '../../helpers/state_managment/help/helpStore.tsx';
import { HelpList } from '../../types/help.ts';
import { updateHelp, updateIsActive } from '../../helpers/api-function/help/help.tsx';
import { Toaster } from 'react-hot-toast';
import Modal from '../../components/modals/modal.tsx';
import masterStore from '../../helpers/state_managment/master/masterStore.tsx';
import { Buttons } from '../../components/buttons';

const All: React.FC = () => {
  const { dataAll, setDataAll, updateTextArea, setUpdateTextArea } = helpStore();
  const { isModal, setIsModal, isLoading, setIsLoading } = masterStore();
  const [modalVal, setModalVal] = useState<{text: string; active: boolean}>({ text: '', active: false });

  const trueFalse = (status: string) => status !== 'LICENSES' && status !== 'CERTIFICATES';
  const openIsModal = () => setIsModal(!isModal);

  function accordionList(params: boolean, id: number | string, name: string | null, item: HelpList) {
    return (
      <>
        {name && params && (
          <div
            className="border-[1px] px-5 py-3 rounded-xl dark:border-white bg-white dark:bg-black text-slate-700 dark:text-slate-300">
            {name}
          </div>
        )}
        <div className="mt-3 flex justify-between items-center text-slate-700 dark:text-slate-300">
          <div className="flex gap-3 items-center">
            <p>Отображать в приложениях</p>
            <Switch
              isOn={item.active}
              handleToggle={() => updateIsActive(item, setDataAll, 'ALL')}
            />
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
          {!params && <FileUploader id={`fileInput${id}`} />}
        </div>
      </>
    );
  }

  return (
    <div className="p-2">
      <Toaster position={`top-center`} />
      <div className="flex flex-col gap-3 mb-3 text-slate-700 dark:text-slate-300">
        {dataAll.map(item => (
          <Accordion
            title={
              item.helpStatus === 'ABOUT_SERVICE' ? 'О сервисе'
                : item.helpStatus === 'PRIVACY_POLICY' ? 'Политика конфиденциальности'
                  : item.helpStatus === 'LICENSE_AGREEMENT' ? 'Лицензионное соглашение'
                    : item.helpStatus === 'LICENSES' ? 'Лицензии'
                      : item.helpStatus === 'CERTIFICATES' ? 'Сертификаты и прочие документы'
                        : 'Использование приложения'
            }
            key={item.id}>
            {accordionList(trueFalse(item.helpStatus), item.id, item.text, item)}
          </Accordion>
        ))}
      </div>
      {/*${!Object.values(switchStates).some(state => state) ? 'opacity-50 cursor-not-allowed' : ''}*/}
      <button
        className={`bg-[#9C0A35] text-white px-3 py-2 rounded-lg mt-4`}
        // disabled={!Object.values(switchStates).some(state => state)}
      >
        Сохранить изменения
      </button>

      <Modal isOpen={isModal} onClose={openIsModal}>
        <div className={`w-[12rem] sm:w-[18rem] md:w-[25rem] lg:w-[30rem]`}>
          <div className={`flex flex-col justify-center`}>
            <p className={`font-bold text-xl text-black dark:text-white opacity-80 text-center`}>
              Help message update
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
            <div className={`flex justify-start items-center gap-5 mt-5`}>
              <input
                className={`w-5 h-5 rounded-full`}
                type="checkbox"
                id={`helpActiveInput`}
                checked={modalVal.active}
                onChange={e => setModalVal({ ...modalVal, active: e.target.checked })}
              />
              <label htmlFor={`helpActiveInput`} className={`text-lg text-black dark:text-white font-semibold`}>Active</label>
            </div>
            <div className={`flex justify-center items-center gap-6 mt-5`}>
              <Buttons bWidth={`w-[150px]`} onClick={() => updateHelp(updateTextArea, setDataAll, 'ALL', modalVal, setIsLoading, openIsModal)}>
                {isLoading ? 'loading...' : 'save'}
              </Buttons>
              <Buttons bWidth={`w-[150px]`} onClick={openIsModal}>close</Buttons>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default All;
