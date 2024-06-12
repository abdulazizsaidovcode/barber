import React, { useState } from 'react';
import axios from 'axios';
import { TiDeleteOutline } from 'react-icons/ti';
import { MdFileDownload } from 'react-icons/md';
import { useTranslation } from 'react-i18next';
import { config } from '../helpers/token.tsx';

interface UploadedFile {
  name: string;
  size: number;
  type: string;
}

interface FileUploaderProps {
  id: string;
  title?: string;
}

const FileUploader: React.FC<FileUploaderProps> = ({ id, title = 'Вложения' }) => {
  const [selectedFiles, setSelectedFiles] = useState<UploadedFile[]>([]);
  const { t } = useTranslation()
  const [fileIds, setFileIds] = useState<string[]>([]);

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files && event.target.files[0];
    console.log(file);
    if (file) {
      const fileData: UploadedFile = {
        name: file.name,
        size: file.size,
        type: getFileType(file.name)
      };

      // Upload the file to the server
      try {
        const formData = new FormData();
        formData.append('file', file);

        const response = await axios.post('http://45.67.35.86:8080/attachment/upload', formData, config);
        console.log(response);
        if (response.data && response.data.body) {
          setSelectedFiles(prevState => [...prevState, fileData]);
          setFileIds(prevState => [...prevState, response.data.body]);
        } else {
          console.error('Invalid response from the server');
        }
      } catch (error) {
        console.error('Error uploading file:', error);
      }
    }
  };

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

  const convertBytesToMegabytes = (bytes: number): number => {
    return bytes / (1024 * 1024); // 1 megabayt = 1024 kilobayt * 1024
  };

  return (
    <div>
      {selectedFiles.length > 0 && (
        <div className="flex w-[100%] flex-col flex-wrap">
          <div>
            <h2 className="my-3">{title}</h2>
          </div>
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
      <input type="file" id={id} style={{ display: 'none' }} onChange={handleFileChange} />
      <button className="flex items-center my-3" onClick={handleUploadButtonClick}>{t("Attach_file")}<MdFileDownload
        className="ms-1 text-[#000] dark:text-white" /></button>
    </div>
  );
};

export default FileUploader;
