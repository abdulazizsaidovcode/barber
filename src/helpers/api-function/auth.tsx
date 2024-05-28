import axios from 'axios';
import { login_url } from '../api.tsx';

export const handleSubmit = (
  event: React.FormEvent<HTMLFormElement>,
  username: string,
  password: string,
  setLoading: (loading: boolean) => void
): void => {
  event.preventDefault();
  const data = {
    phone: `+998${username}`,
    password: password
  }

  if (username && password) {
    setLoading(true);
    axios.post(login_url, data)
      .then(res => {
        setLoading(false);
        console.log(res);
        if (res.data.success === false) console.log('Telefon raqam yoki parol xato kirgizildi!!!');
        else sessionStorage.setItem('token', `Bearer ${res.data.body}`)
      })
      .catch(() => setLoading(false));
  } else setLoading(false);
};
