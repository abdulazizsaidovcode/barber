import React, { useState } from 'react';
import Accordion from '../../components/accordion/accordion';
import Switch from '../../components/settings/details/TableSwitcher';
import FileUploader from '../../components/FileDowlander';
import { MdEdit } from 'react-icons/md';
import helpStore from '../../helpers/state_managment/help/helpStore.tsx';

const data = [
  {
    id: 1,
    title: 'О сервисе',
    fileActive: true
  },
  {
    id: 2,
    title: 'Политика конфиденциальности',
    fileActive: true
  },
  {
    id: 3,
    title: 'Лицензионное соглашение',
    fileActive: true
  },
  {
    id: 4,
    title: 'Лицензии',
    fileActive: false
  },
  {
    id: 5,
    title: 'Сертификаты и прочие документы',
    fileActive: false
  }
];

const All: React.FC = () => {
  const {dataAboutService} = helpStore()
  const [isSwitchOn, setIsSwitchOn] = useState(false);
  const toggleSwitch = () => setIsSwitchOn(!isSwitchOn);

  console.log(dataAboutService);

  function accordionList(params: boolean, id?: number | string, name?: string) {
    if (params) {
      return (
        <>
          <div
            className="border-[1px] p-5 rounded-2xl dark:border-white bg-white dark:bg-black text-slate-700 dark:text-slate-300">
            <p>{name}</p>
          </div>
          <div className="mt-3 flex justify-between items-center text-slate-700 dark:text-slate-300">
            <div className="flex gap-3">
              <p>Отображать в приложениях</p>
              <Switch isOn={isSwitchOn} handleToggle={toggleSwitch} />
            </div>
            <div>
              <button className="p-[6px] dark:border-[#fff] border-[#000] border-[1px] rounded-lg">
                <MdEdit size={20} className="dark:text-white" />
              </button>
            </div>
          </div>
        </>
      );
    } else {
      return (
        <>
          <div>
            <FileUploader id={`fileInput${id}`} />
          </div>
          <div className="flex gap-3">
            <p>Отображать в приложениях</p>
            <Switch isOn={isSwitchOn} handleToggle={toggleSwitch} />
          </div>
        </>
      );
    }
  }

  return (
    <div className="p-2">
      <div className="flex flex-col gap-3 mb-3 text-slate-700 dark:text-slate-300">
        {data.map(item => (
          <Accordion title={item.title}>
            {accordionList(item.fileActive, item.id)}
          </Accordion>
        ))}
      </div>
      <button
        className={`bg-[#9C0A35] text-white px-3 py-2 rounded-lg ${!isSwitchOn ? 'opacity-50 cursor-not-allowed' : ''}`}
        disabled={!isSwitchOn}
      >
        Сохранить изменения
      </button>
    </div>
  );
};

export default All;