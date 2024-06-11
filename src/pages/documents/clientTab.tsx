import React, { useState } from 'react';
import Accordion from '../../components/accordion/accordion';
import Switch from '../../components/settings/details/TableSwitcher';
import FileUploader from '../../components/FileDowlander';
import { useTranslation } from 'react-i18next';


const ClientDocument: React.FC = () => {
  const [isSwitchOn, setIsSwitchOn] = useState(false);
  const { t } = useTranslation()

  const toggleSwitch = () => setIsSwitchOn(!isSwitchOn);
  const handleButtonClick = () => {
  };


  return (
    <div className="p-2">
      <div className="flex flex-col gap-3 mb-3 ">
        <Accordion title={t("Terms_of_use")}>
          <div>
            <FileUploader id='fileinput3' />
          </div>
          <div className='flex gap-3'>
            <p>{t("Show_in_apps")}</p>
            <Switch isOn={isSwitchOn} handleToggle={toggleSwitch} />
          </div>
        </Accordion>
      </div>
      <button
        className={`bg-[#9C0A35] text-white px-3 py-2 rounded-lg ${!isSwitchOn ? 'opacity-50 cursor-not-allowed' : ''}`}
        disabled={!isSwitchOn}
        onClick={handleButtonClick}
      >
        {t("Save_changes")}
      </button>
    </div >
  );
};

export default ClientDocument;
