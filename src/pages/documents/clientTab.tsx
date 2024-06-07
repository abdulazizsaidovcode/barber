import React, { useState } from 'react';
import Accordion from '../../components/accordion/accordion';
import Switch from '../../components/settings/details/TableSwitcher';
import { MdEdit } from 'react-icons/md';
import FileUploader from '../../components/FileDowlander';


const ClientDocument: React.FC = () => {
  const [isSwitchOn, setIsSwitchOn] = useState(false);

  const toggleSwitch = () => setIsSwitchOn(!isSwitchOn);
  const handleButtonClick = () => {
  };


  return (
    <div className="p-2">
      <div className="flex flex-col gap-3 mb-3 ">
        <Accordion title='Пользовательское соглашение'>
          <div>
            <FileUploader />
          </div>
          <div className='flex gap-3'>
            <p>Отображать в приложениях</p>
            <Switch isOn={isSwitchOn} handleToggle={toggleSwitch} />
          </div>
        </Accordion>
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

export default ClientDocument;
