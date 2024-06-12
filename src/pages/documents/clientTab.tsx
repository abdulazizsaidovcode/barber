import React from 'react';
import Accordion from '../../components/accordion/accordion';
import Switch from '../../components/settings/details/TableSwitcher';
import FileUploader from '../../components/FileDowlander';
import { useTranslation } from 'react-i18next';
import { updateIsActive } from '../../helpers/api-function/help/help.tsx';
import helpStore from '../../helpers/state_managment/help/helpStore.tsx';


const ClientDocument: React.FC = () => {
  const {dataClient, setDataClient} = helpStore()
  const { t } = useTranslation()

  return (
    <div className="p-2">
      <div className="flex flex-col gap-3 mb-3 ">
        {dataClient.map(item => (
          <Accordion title={t("Terms_of_use")}>
            <div className="mt-3 flex justify-between items-center text-slate-700 dark:text-slate-300">
              <div className="flex gap-3 items-center">
                <p>{t("Show_in_apps")}</p>
                <Switch
                  isOn={item.active}
                  handleToggle={() => updateIsActive(item, setDataClient, 'FOR_CLIENT')}
                />
              </div>
              <FileUploader id={`fileInput${item.id}`} />
            </div>
          </Accordion>
        ))}
      </div>
      <button className={`bg-[#9C0A35] text-white px-3 py-2 rounded-lg`}>
        {t("Save_changes")}
      </button>
    </div >
  );
};

export default ClientDocument;
