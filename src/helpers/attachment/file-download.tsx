// file download qilish uchun funcsiya <url> va file skachat qilganda buttonni loading qilish uchun <setIsLoading>

import axios from 'axios';
import { config } from '../token.tsx';
import toast from 'react-hot-toast';

export const downloadExcelFile = (url: string, setIsLoading: (val: boolean) => void) => {
  setIsLoading(true);
  axios.get(url, { ...config, responseType: 'blob' })
    .then((res) => {
      const blob = new Blob([res.data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `Bookers.xlsx`;
      document.body.appendChild(a);
      a.click();
      setIsLoading(false);
      toast.success('Downloading file...');
    })
    .catch((err) => {
      toast.error('There was an error fetching the data!');
      console.log(err);
      setIsLoading(false);
    });
};