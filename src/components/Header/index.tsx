import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { IoIosNotifications, IoMdSettings } from 'react-icons/io';
import { MdOutlineQuestionMark } from "react-icons/md";
import LogoIcon from '../../images/logo/logo.jpeg';
import DarkModeSwitcher from './DarkModeSwitcher';
import LanguageSelector from './LanguageSelector';
import DropdownUser from './DropdownUser';

interface HeaderProps {
  sidebarOpen: boolean;
  setSidebarOpen: (isOpen: boolean) => void;
}

const Header: React.FC<HeaderProps> = ({ sidebarOpen, setSidebarOpen }) => {
  const location = useLocation();

  const getButtonClass = (path: string) =>
    location.pathname.startsWith(path)
      ? 'dark:bg-danger bg-[#c2c2c2] text-black dark:text-white'
      : 'dark:bg-white bg-[#f1f5f9] dark:text-black';

  return (
    <header className="sticky top-0 z-999 flex w-full bg-graymedium drop-shadow-1 dark:bg-[#30303d] dark:drop-shadow-none">
      <div className="flex flex-grow items-center justify-between px-4 py-4 shadow-2 md:px-6 2xl:px-11">
        <div className="flex items-center gap-2 sm:gap-4 lg:hidden">
          <Link className="block flex-shrink-0 lg:hidden" to="/">
            <img src={LogoIcon} alt="Logo" className="w-9 rounded" />
          </Link>
          <button
            aria-controls="sidebar"
            onClick={(e) => {
              e.stopPropagation();
              setSidebarOpen(!sidebarOpen);
            }}
            className="z-99999 block rounded-sm border border-stroke bg-white p-1.5 shadow-sm dark:border-strokedark dark:bg-boxdark lg:hidden"
          >
            <span className="relative block h-5.5 w-5.5 cursor-pointer">
              <span className="absolute right-0 h-full w-full">
                <span
                  className={`relative block h-0.5 w-full bg-black dark:bg-white transition-all duration-200 ease-in-out ${sidebarOpen ? 'w-0' : ''}`}
                ></span>
                <span
                  className={`relative block h-0.5 w-full bg-black dark:bg-white transition-all duration-200 ease-in-out delay-150 ${sidebarOpen ? 'w-0' : ''}`}
                ></span>
                <span
                  className={`relative block h-0.5 w-full bg-black dark:bg-white transition-all duration-200 ease-in-out delay-300 ${sidebarOpen ? 'w-0' : ''}`}
                ></span>
              </span>
              <span className="absolute right-0 h-full w-full rotate-45">
                <span
                  className={`absolute block h-full w-0.5 bg-black dark:bg-white transition-all duration-200 ease-in-out ${sidebarOpen ? 'h-0 delay-300' : ''}`}
                ></span>
                <span
                  className={`delay-150 absolute block h-0.5 w-full bg-black dark:bg-white transition-all duration-200 ease-in-out ${sidebarOpen ? 'h-0 delay-150' : ''}`}
                ></span>
              </span>
            </span>
          </button>
        </div>

        <div className="hidden sm:block">
          <form action="https://formbold.com/s/unique_form_id" method="POST">
            <div className="relative"></div>
          </form>
        </div>

        <div className="flex items-center gap-3 2xsm:gap-7">
          <div className="flex gap-3">
            <Link to="/notifications">
              <div className={`${getButtonClass('/notifications')} rounded-full flex justify-center items-center w-[40px] h-[40px]`}>
                <IoIosNotifications className="text-2xl" />
              </div>
            </Link>
            <Link to="/request/new-masters">
              <div className={`${getButtonClass('/request')} rounded-full flex justify-center items-center w-[40px] h-[40px]`}>
                <MdOutlineQuestionMark className="text-2xl" />
              </div>
            </Link>
            <Link to="/settings">
              <div className={`${getButtonClass('/settings')} rounded-full flex justify-center items-center w-[40px] h-[40px]`}>
                <IoMdSettings className="text-2xl" />
              </div>
            </Link>
          </div>
          <ul className="flex items-center gap-2 2xsm:gap-4">
            <LanguageSelector />
            <DarkModeSwitcher />
          </ul>
          <DropdownUser />
        </div>
      </div>
    </header>
  );
};

export default Header;