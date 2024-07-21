import { TiDeleteOutline } from 'react-icons/ti';
import { Attachments } from '../types/help.ts';
import { getFileId } from '../helpers/api.tsx';
import { Link } from 'react-router-dom';
import helpStore from '../helpers/state_managment/help/helpStore.tsx';
import { useTranslation } from 'react-i18next';

const FileGetUploader = ({ getList, openModal, idIn }: { getList: Attachments[], openModal: () => void, idIn: number }) => {
  const { setDeleteFileId } = helpStore();
  const { t } = useTranslation();
  const getFileType = (fileName: string) => {
    const parts = fileName.split('.');
    return parts.length > 1 ? parts[parts.length - 1] : 'unknown';
  };

  return (
    <div className="flex w-[100%] flex-col flex-wrap">
      <h2 className="my-3 text-[.8rem] sm:text-base text-black dark:text-white text-center sm:text-start">{t('attachments')}</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-2 sm:gap-3">
        {getList.length > 0 && (
          getList.map((item, idx) => (
            <div
              className="border-[1px] border-[#000] dark:border-white p-3 h-17 rounded-md flex justify-between"
              key={idx}
            >
              <Link to={`${getFileId}${item.id}`} id={`getFileAttachment`} className={`flex`}>
                <div className="bg-black dark:bg-danger px-3 flex rounded-md justify-center items-center">
                  <p className="text-sm text-white">{getFileType(item.name)}</p>
                </div>
                <div className="flex flex-col justify-center ms-2">
                  <p className="text-md font-bold tracking-normal text-[#000] dark:text-white sm:text-[1rem] text-[.75rem]">
                    {item.name.length > 10 ? item.name.slice(0, 10) + '...' : item.name}
                  </p>
                  <p className="text-sm text-black dark:text-white opacity-60">{(item.size / 1024).toFixed(3)} MB</p>
                </div>
              </Link>
              <div>
                <button className="flex justify-end py-[7px]" onClick={() => {
                  openModal();
                  setDeleteFileId([item.id, idIn]);
                }}>
                  <TiDeleteOutline className="text-3xl text-black dark:text-white opacity-75" />
                </button>
              </div>
            </div>
          )))}
      </div>
    </div>
  );
};

export default FileGetUploader;
