import axios from 'axios';
import { getMe, login_url } from '../api.tsx';
import toast from 'react-hot-toast';
import { clearFunction } from '../../common/clear-function/clear-function.tsx';
import { message } from 'antd';

export const handleSubmit = async (
  event: React.FormEvent<HTMLFormElement>,
  username: string,
  password: string,
  setLoading: (loading: boolean) => void,
  setGoPage: (val: string) => void,
): Promise<void> => {
  event.preventDefault();
  const data = {
    phone: username,
    password: password,
  };

  if (username && password) {
    setLoading(true);
    await axios
      .post(login_url, data)
      .then((res) => {
        console.log(data);
        setLoading(false);
        if (res?.data?.success) {
          sessionStorage.setItem('token', `Bearer ${res?.data?.body}`);
          setGoPage('/');
        }
        if (res?.data?.body) getMe(res?.data?.body);
        clearFunction();
      })
      .catch((res) => {
        setLoading(false);
        toast.error(res.response?.data?.message);
        clearFunction();
      });
  } else {
    setLoading(false);
    toast.error('Telefon raqam yoki parol kirgizilmagan!!!');
    clearFunction();
  }
};
