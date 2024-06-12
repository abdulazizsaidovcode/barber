import { TiDeleteOutline } from 'react-icons/ti';
import { Attachments } from '../types/help.ts';
import { getFileId } from '../helpers/api.tsx';
import { Link } from 'react-router-dom';
import helpStore from '../helpers/state_managment/help/helpStore.tsx';

const FileGetUploader = ({ getList, openModal, idIn }: { getList: Attachments[], openModal: () => void, idIn: number }) => {
  const {setDeleteFileId} = helpStore()
  const getFileType = (fileName: string) => {
    const parts = fileName.split('.');
    return parts.length > 1 ? parts[parts.length - 1] : 'unknown';
  };

  return (
    <div className="flex w-[100%] flex-col flex-wrap">
      <h2 className="my-3">Вложения</h2>
      <div className="flex gap-3 flex-wrap">
        {getList.length > 0 && (
          getList.map((item, idx) => (
            <div className="border-[1px] border-[#000] dark:border-white p-3 w-max h-17 rounded-md flex" key={idx}>
              <Link to={`${getFileId}${item.id}`} id={`getFileAttachment`} className={`flex`}>
                <div className="bg-black dark:bg-danger px-3 flex rounded-md justify-center items-center">
                  <p className="text-sm text-white">{getFileType(item.name)}</p>
                </div>
                <div className="flex flex-col justify-center p-2">
                  <p className="text-md font-bold tracking-normal text-[#000] dark:text-white ">{item.name}</p>
                  <p className="text-sm">{(item.size / 1024).toFixed(3)} MB</p>
                </div>
              </Link>
              <div>
                <div>
                  <button className="flex justify-end py-[7px] ms-5" onClick={() => {
                    openModal()
                    setDeleteFileId([item.id, idIn])
                  }}>
                    <TiDeleteOutline className="text-3xl" />
                  </button>
                </div>
              </div>
            </div>
          )))}
      </div>
    </div>
  );
};

export default FileGetUploader;
