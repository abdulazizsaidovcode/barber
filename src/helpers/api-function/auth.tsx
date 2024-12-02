import axios from 'axios';
import { getMe, login_url } from '../api.tsx';
import toast from 'react-hot-toast';
import { clearFunction } from '../../common/clear-function/clear-function.tsx';

export const handleSubmit = (
  event: React.FormEvent<HTMLFormElement>,
  username: string,
  password: string,
  setLoading: (loading: boolean) => void,
  setGoPage: (val: string) => void
): void => {
  event.preventDefault();
  const data = {
    phone: username,
    password: password
  }

  if (username && password) {
    setLoading(true);
    axios.post(login_url, data)
      .then(res => {
        console.log(data);
        setLoading(false);
        if (res.data.success === false) toast.error('Nimadur xato ketti qaytadan urinib ko\'ring');
        else {
          res.data.status === "ACCEPTED" ? setGoPage('/') : setGoPage('/auth/signin')
          sessionStorage.setItem('token', `Bearer ${res.data.body}`)
          if (res.data.body) getMe(res.data.body)
          clearFunction()
        }
      })
      .catch(() => {
        setLoading(false)
        toast.error('Serverda xatolik yuz berdi!!!')
        clearFunction()
      });
  } else {
    setLoading(false)
    toast.error('Telefon raqam yoki parol kirgizilmagan!!!')
    clearFunction()
  }
};
