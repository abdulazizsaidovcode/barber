// file download qilish uchun funcsiya <url> va file skachat qilganda buttonni loading qilish uchun <setIsLoading>

import axios from 'axios';
import { config } from '../token.tsx';
import toast from 'react-hot-toast';
import React from 'react';
import { UploadedFile } from '../../components/FileDowlander.tsx';

export const downloadExcelFile = (url: string, setIsLoading: (val: boolean) => void, successMessage: string, errorMessage: string, page?: number) => {
  setIsLoading(true);
  axios.get(url, { ...config, responseType: 'blob' })
    .then((res) => {
      const blob = new Blob([res.data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `Bookers${page ? `-sahifa-${page}` : ''}.xlsx`;
      document.body.appendChild(a);
      a.click();
      setIsLoading(false);
      toast.success(`${successMessage}`);
    })
    .catch(() => {
      toast.error(`${errorMessage}`);
      setIsLoading(false);
    });
};


// file help posts
export const handleFileChange = async (
  event: React.ChangeEvent<HTMLInputElement>,
  getFileType: (val: string) => string,
  setSelectedFiles: React.Dispatch<React.SetStateAction<UploadedFile[]>>,
  setFileIds: React.Dispatch<React.SetStateAction<string[]>>,
  setIsLoading: (val: boolean) => void
) => {
  const file = event.target.files && event.target.files[0];
  if (file) {
    const fileData: UploadedFile = {
      name: file.name,
      size: file.size,
      type: getFileType(file.name)
    };

    try {
      const formData = new FormData();
      formData.append('file', file);
      setIsLoading(true)

      const response = await axios.post('http://45.67.35.86:8080/attachment/upload', formData, config);
      if (response.data && response.data.body) {
        setSelectedFiles((prevState: UploadedFile[]) => [...prevState, fileData]);
        setFileIds((prevState: string[]) => [...prevState, response.data.body]);
        setIsLoading(false)
      } else {
        console.error('Invalid response from the server');
        setIsLoading(false)
      }
    } catch (error) {
      console.error('Error uploading file:', error);
      setIsLoading(false)
    }
  }
};