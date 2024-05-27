// import axios from 'axios';
// import { login_url } from '../api.tsx';

export const handleSubmit = (
  event: React.FormEvent<HTMLFormElement>,
  username: string,
  password: string
): void => {
  event.preventDefault();
  console.log(username);
  console.log(password);
};

// if (!data.username && !data.password) {
// setLoading(true);
//   axios.post(login_url, '')
//     .then(res => {
//       setLoading(false);
//       if (res.data.success === false) console.log('Telefon raqam yoki parol xato kirgizildi!!!');
//       else {
//         sessionStorage.setItem('token', `Bearer ${res.data.body}`);
//         //         if (res.data.message === "ROLE_SUPER_ADMIN") {
//         //           setRole('/super-admin/boshqaruv-paneli');
//         //           toast.success("Tizimga muvaffaqiyatli kirdingiz✔");
//         //         } else if (res.data.message === "ROLE_ADMIN") {
//         //           setRole('/admin/hisobot');
//         //           toast.success("Tizimga muvaffaqiyatli kirdingiz✔");
//         //         } else if (res.data.message === "ROLE_LEADER") {
//         //           setRole('/brigadir/boshqaruv-qismi');
//         //           toast.success("Tizimga muvaffaqiyatli kirdingiz✔");
//         //         }
//       }
//     })
//     .catch(() => setLoading(false));
// } else setLoading(false);
// };
