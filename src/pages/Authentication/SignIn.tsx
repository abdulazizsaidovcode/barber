import React, { useEffect } from 'react';
import { BiSolidShow } from 'react-icons/bi';
import { BiSolidHide } from 'react-icons/bi';
import logo from '../../images/logo/bookers.jpg';
import authStore from '../../helpers/state_managment/auth/authStore.tsx';
import { handleSubmit } from '../../helpers/api-function/auth.tsx';
import { useNavigate } from 'react-router-dom';

interface StylesType {
  container: string;
  card: string;
  title: string;
  input: string;
  button: string;
  hideShowIcon: string;
}

export const Login: React.FC = () => {
  const {
    show,
    username,
    password,
    loading,
    goPage,
    setGoPage,
    setLoading,
    setPassword,
    setUsername,
    setShow
  } = authStore();
  const navigate = useNavigate();

  useEffect(() => {
    navigate(goPage);
  }, [goPage]);

  const styles: StylesType = {
    container: 'select-none min-h-screen flex items-center justify-center bg-gray-100 px-4 sm:px-0',
    card: 'max-w-md w-full space-y-8 z-10',
    title: 'mb-6 text-center text-xl md:text-3xl font-extrabold text-slate-900',
    input: 'appearance-none rounded-none relative block w-full p-4 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm duration-150',
    button: 'group relative w-full flex justify-center py-2.5 px-4 border border-transparent text-sm font-medium rounded-md text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500',
    hideShowIcon: 'absolute top-4 right-4 text-[1.5rem] hover:cursor-pointer opacity-60 hover:opacity-90 duration-150 z-40'
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <div className={`flex justify-center items-center`}>
          <img src={logo} alt={`bookers logo`} className={`w-28 h-28 rounded-full`} />
        </div>
        <h2 className={styles.title + ' tracking-wide'}>Bookers Beauty</h2>
        <form
          className="mt-8 space-y-6"
          onSubmit={(event) => handleSubmit(event, username, password, setLoading, setGoPage)}
        >
          <div className="rounded-md shadow-sm -space-y-px">
            <div className="mb-6">
              <label htmlFor="username" className="sr-only">Username</label>
              <input
                id="username"
                value={username}
                onChange={e => setUsername(e.target.value)}
                name="username"
                type="text"
                autoComplete="username"
                required
                className={`rounded-xl ${styles.input} `}
                placeholder="Phone number" />
            </div>
            <div className="relative">
              <label htmlFor="password" className="sr-only">Password</label>
              <input
                id="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                name="password"
                type={`${show ? 'password' : 'text'}`}
                autoComplete="current-password"
                required
                className={`rounded-xl ${styles.input}`}
                placeholder="Password" />
              {show
                ? <BiSolidShow onClick={() => setShow(false)} className={styles.hideShowIcon} />
                : <BiSolidHide onClick={() => setShow(true)} className={styles.hideShowIcon} />
              }
            </div>
          </div>
          <button type="submit" className={`bg-[#9C0A35] ${styles.button}`}>
            {loading ? 'loading...' : 'LOGIN'}
          </button>
        </form>
      </div>
    </div>
  );
};
