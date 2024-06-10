import React, { useState } from 'react';
import Accordion from '../../components/accordion/accordion';
import Switch from '../../components/settings/details/TableSwitcher';
import FileUploader from '../../components/FileDowlander';
import { MdEdit } from 'react-icons/md';
import helpStore from '../../helpers/state_managment/help/helpStore.tsx';
import { HelpList } from '../../types/help.ts';
import { updateIsActive } from '../../helpers/api-function/help/help.tsx';
import {Toaster} from 'react-hot-toast';

const All: React.FC = () => {
  const { dataAll, setDataAll } = helpStore();
  const [switchStates, setSwitchStates] = useState<{ [key: string]: boolean }>({});

  const handleToggle = (id: number | string) => {
    setSwitchStates(prevState => ({
      ...prevState,
      [id]: !prevState[id]
    }));
  };

  const trueFalse = (status: string) => status !== 'LICENSES' && status !== 'CERTIFICATES';

  function accordionList(params: boolean, id: number | string, name: string | null, item: HelpList) {
    return (
      <>
        {name && params && (
          <div
            className="border-[1px] p-5 rounded-2xl dark:border-white bg-white dark:bg-black text-slate-700 dark:text-slate-300">
            {name}
          </div>
        )}
        <div className="mt-3 flex justify-between items-center text-slate-700 dark:text-slate-300">
          <div className="flex gap-3 items-center">
            <p>Отображать в приложениях</p>
            <Switch
              isOn={item.active}
              handleToggle={() => {
                handleToggle(id);
                updateIsActive(item, setDataAll, 'ALL')
              }}
            />
          </div>
          {params && (
            <button className="p-[6px] dark:border-[#fff] border-[#000] border-[1px] rounded-lg">
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
      <button
        className={`bg-[#9C0A35] text-white px-3 py-2 rounded-lg ${!Object.values(switchStates).some(state => state) ? 'opacity-50 cursor-not-allowed' : ''}`}
        disabled={!Object.values(switchStates).some(state => state)}
      >
        Сохранить изменения
      </button>
    </div>
  );
};

export default All;
