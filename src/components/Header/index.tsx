import { Link } from 'react-router-dom';
import LogoIcon from '../../images/logo/logo.jpeg';
import DarkModeSwitcher from './DarkModeSwitcher';
import { IoMdSettings } from 'react-icons/io';
import LanguageSelector from './LanguageSelector';
import DropdownUser from './DropdownUser';
import { CiSquareQuestion } from "react-icons/ci";

const Header = (props: { sidebarOpen: boolean | undefined; setSidebarOpen: (isOpen: boolean) => void; }) => {
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
              props.setSidebarOpen(!props.sidebarOpen);
            }}
            className="z-99999 block rounded-sm border border-stroke bg-white p-1.5 shadow-sm dark:border-strokedark dark:bg-boxdark lg:hidden"
          >
            <span className="relative block h-5.5 w-5.5 cursor-pointer">
              <span className="du-block absolute right-0 h-full w-full">
                <span
                  className={`relative left-0 top-0 my-1 block h-0.5 w-0 rounded-sm bg-black delay-[0] duration-200 ease-in-out dark:bg-white ${!props.sidebarOpen && '!w-full delay-300'
                    }`}
                ></span>
                <span
                  className={`relative left-0 top-0 my-1 block h-0.5 w-0 rounded-sm bg-black delay-150 duration-200 ease-in-out dark:bg-white ${!props.sidebarOpen && 'delay-400 !w-full'
                    }`}
                ></span>
                <span
                  className={`relative left-0 top-0 my-1 block h-0.5 w-0 rounded-sm bg-black delay-200 duration-200 ease-in-out dark:bg-white ${!props.sidebarOpen && '!w-full delay-500'
                    }`}
                ></span>
              </span>
              <span className="absolute right-0 h-full w-full rotate-45">
                <span
                  className={`absolute left-2.5 top-0 block h-full w-0.5 rounded-sm bg-black delay-300 duration-200 ease-in-out dark:bg-white ${!props.sidebarOpen && '!h-0 !delay-[0]'
                    }`}
                ></span>
                <span
                  className={`delay-400 absolute left-0 top-2.5 block h-0.5 w-full rounded-sm bg-black duration-200 ease-in-out dark:bg-white ${!props.sidebarOpen && '!h-0 !delay-200'
                    }`}
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
            <Link to="/request/new-masters">
              <div className={`${getButtonClass('/request')} rounded-full flex justify-center items-center md:w-[40px] md:h-[40px] w-[25px] h-[25px]`}>
                <CiSquareQuestion className="md:text-2xl" />
              </div>
            </Link>
            <Link to="/settings">
              <div className={`${getButtonClass('/settings')} rounded-full flex justify-center items-center md:w-[40px] md:h-[40px] w-[25px] h-[25px]`}>
                <IoMdSettings className="md:text-2xl" />
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