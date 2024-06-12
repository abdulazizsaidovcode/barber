import { useState } from 'react';
import { TiDeleteOutline } from 'react-icons/ti';
import { MdFileDownload } from 'react-icons/md';
import { useTranslation } from 'react-i18next';
import { handleFileChange } from '../helpers/attachment/file-download.tsx';

export interface UploadedFile {
  name: string;
  size: number;
  type: string;
}

const FileUploader = ({ id }: { id: string }) => {
  const [selectedFiles, setSelectedFiles] = useState<UploadedFile[]>([]);
  const { t } = useTranslation();
  const [fileIds, setFileIds] = useState<string[]>([]);

  console.log(fileIds);

  const getFileType = (fileName: string): string => {
    const extension = fileName.split('.').pop()?.toLowerCase();
    if (extension === 'jpg' || extension === 'jpeg' || extension === 'png' || extension === 'gif') return 'image';
    else if (extension === 'pdf' || extension === 'doc' || extension === 'docx' || extension === 'ppt' || extension === 'pptx' || extension === 'xlsx') return 'file';
    else return 'unknown';
  };

  const handleUploadButtonClick = () => {
    const fileInput = document.getElementById(id);
    if (fileInput) fileInput.click();
  };

  const handleRemoveFile = (index: number) => {
    setSelectedFiles(prevState => prevState.filter((file, i) => i !== index));
    setFileIds(prevState => prevState.filter((_, i) => i !== index));
  };

  const convertBytesToMegabytes = (bytes: number): number => bytes / (1024 * 1024);

  return (
    <div>
      {selectedFiles.length > 0 && (
        <div className="flex w-[100%] flex-col flex-wrap">
          <div className="flex gap-3 flex-wrap">
            {selectedFiles.map((file, index) => (
              <div className="border-[1px] border-[#000] dark:border-white p-3 w-max h-17 rounded-md flex" key={index}>
                <div className="flex">
                  <div className="bg-black dark:bg-danger px-3 flex rounded-md justify-center items-center">
                    <p className="text-sm text-white">{file.type}</p>
                  </div>
                  <div className="flex flex-col justify-center p-2">
                    <p className="text-md font-bold tracking-normal text-[#000] dark:text-white ">{file.name}</p>
                    <p className="text-sm">{convertBytesToMegabytes(file.size).toFixed(2)} MB</p>
                  </div>
                </div>
                <div>
                  <div>
                    <button
                      className="flex justify-end py-[7px] ms-5"
                      onClick={() => handleRemoveFile(index)}
                    >
                      <TiDeleteOutline className="text-3xl" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      <input
        type="file" id={id} style={{ display: 'none' }}
        onChange={(e) => handleFileChange(e, getFileType, setSelectedFiles, setFileIds)}
      />
      <button className="flex items-center my-3" onClick={handleUploadButtonClick}>{t('Attach_file')}
        <MdFileDownload
          className="ms-1 text-[#000] dark:text-white"
        />
      </button>
    </div>
  );
};

export default FileUploader;
