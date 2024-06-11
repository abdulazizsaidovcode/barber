import React, { useState } from 'react';
import Accordion from '../../components/accordion/accordion';
import Switch from '../../components/settings/details/TableSwitcher';
import { MdEdit } from 'react-icons/md';
import FileUploader from '../../components/FileDowlander';
import helpStore from '../../helpers/state_managment/help/helpStore.tsx';
import { updateIsActive } from '../../helpers/api-function/help/help.tsx';
import masterStore from '../../helpers/state_managment/master/masterStore.tsx';
import { Toaster } from 'react-hot-toast';


const MasterDocument: React.FC = () => {
  const { dataMaster, setDataMaster, setUpdateTextArea } = helpStore();
  const { isModal, setIsModal } = masterStore();
  const [modalVal, setModalVal] = useState<{ text: string; active: boolean }>({ text: '', active: false });

  const trueFalse = (status: string) => status !== 'SERVICE_SPECIFICATION';
  const openModal = () => setIsModal(!isModal);

  console.log(modalVal);
  return (
    <div className="p-2">
      <Toaster position={`top-center`} />
      <div className="flex flex-col gap-3 mb-3">
        {dataMaster.map(item => (
          <Accordion title={item.helpStatus === 'SERVICE_SPECIFICATION' ? 'Спецификация услуг' : 'Оферта'}>
            <>
              {trueFalse(item.helpStatus) && item.text && (
                <div
                  className="border-[1px] px-5 py-3 rounded-xl dark:border-white bg-white dark:bg-black text-slate-700 dark:text-slate-300">
                  {item.text}
                </div>
              )}
              <div className="mt-3 flex justify-between items-center text-slate-700 dark:text-slate-300">
                <div className="flex gap-3 items-center">
                  <p>Отображать в приложениях</p>
                  <Switch
                    isOn={item.active}
                    handleToggle={() => updateIsActive(item, setDataMaster, 'FOR_MASTER')}
                  />
                </div>
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
                {!trueFalse(item.helpStatus) && <FileUploader id={`fileInput${item.id}`} />}
              </div>
            </>
          </Accordion>
        ))}
      </div>
      <button className={`bg-[#9C0A35] text-white px-3 py-2 rounded-lg`}>
        Сохранить изменения
      </button>
    </div>
  );
};

export default MasterDocument;
