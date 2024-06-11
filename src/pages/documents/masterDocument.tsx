import React, { useState } from 'react';
import Accordion from '../../components/accordion/accordion';
import Switch from '../../components/settings/details/TableSwitcher';
import { MdEdit } from 'react-icons/md';
import FileUploader from '../../components/FileDowlander';
import helpStore from '../../helpers/state_managment/help/helpStore.tsx';
import { updateIsActive } from '../../helpers/api-function/help/help.tsx';


const MasterDocument: React.FC = () => {
  const {dataMaster} = helpStore()
  const [isSwitchOn, setIsSwitchOn] = useState(false);

  const toggleSwitch = () => setIsSwitchOn(!isSwitchOn);
  const handleButtonClick = () => {
  };

  console.log(dataMaster);
  return (
    <div className="p-2">
      <div className="flex flex-col gap-3 mb-3">
        {dataMaster.map(item => (
          <Accordion title='Лицензионное соглашение'>
            {/*<>*/}
            {/*  {name && params && (*/}
            {/*    <div*/}
            {/*      className="border-[1px] px-5 py-3 rounded-xl dark:border-white bg-white dark:bg-black text-slate-700 dark:text-slate-300">*/}
            {/*      {name}*/}
            {/*    </div>*/}
            {/*  )}*/}
            {/*  <div className="mt-3 flex justify-between items-center text-slate-700 dark:text-slate-300">*/}
            {/*    <div className="flex gap-3 items-center">*/}
            {/*      <p>Отображать в приложениях</p>*/}
            {/*      <Switch*/}
            {/*        isOn={item.active}*/}
            {/*        handleToggle={() => updateIsActive(item, setDataAll, 'ALL')}*/}
            {/*      />*/}
            {/*    </div>*/}
            {/*    {params && (*/}
            {/*      <button*/}
            {/*        onClick={() => {*/}
            {/*          setUpdateTextArea(item);*/}
            {/*          setModalVal({ text: item.text, active: item.active });*/}
            {/*          openIsModal();*/}
            {/*        }}*/}
            {/*        className="p-[6px] dark:border-[#fff] border-[#000] border-[1px] rounded-lg"*/}
            {/*      >*/}
            {/*        <MdEdit size={20} className="dark:text-white" />*/}
            {/*      </button>*/}
            {/*    )}*/}
            {/*    {!params && <FileUploader id={`fileInput${id}`} />}*/}
            {/*  </div>*/}
            {/*</>*/}
          </Accordion>
        ))}

      </div>
      <button
        className={`bg-[#9C0A35] text-white px-3 py-2 rounded-lg ${!isSwitchOn ? 'opacity-50 cursor-not-allowed' : ''}`}
        disabled={!isSwitchOn}
        onClick={handleButtonClick}
      >
        Сохранить изменения
      </button>
    </div>
  );
};

export default MasterDocument;
