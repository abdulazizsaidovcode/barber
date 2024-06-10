import { useEffect, useRef, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import Logo from '../../images/logo/logo.png';
import { AiOutlineDashboard } from 'react-icons/ai';
import { CiCalendar } from 'react-icons/ci';
import { BsCurrencyDollar, BsFillPersonLinesFill } from 'react-icons/bs';
import { IoChatbubbleEllipsesOutline, IoDocumentTextOutline } from 'react-icons/io5';
import { MdOutlineShoppingBag, MdReviews } from 'react-icons/md';
import { useTranslation } from 'react-i18next';
import { GiHairStrands } from 'react-icons/gi';
import { PiHandshakeBold } from 'react-icons/pi';
import '../../i18n';

interface SidebarProps {
  sidebarOpen: boolean;
  setSidebarOpen: (arg: boolean) => void;
}

const Sidebar = ({ sidebarOpen, setSidebarOpen }: SidebarProps) => {
  const location = useLocation();
  const { pathname } = location;
  const { t } = useTranslation();

  const trigger = useRef<any>(null);
  const sidebar = useRef<any>(null);

  const storedSidebarExpanded = localStorage.getItem('sidebar-expanded');
  const [sidebarExpanded] = useState(
    storedSidebarExpanded === null ? false : storedSidebarExpanded === 'true',
  );

  useEffect(() => {
    const clickHandler = ({ target }: MouseEvent) => {
      if (!sidebar.current || !trigger.current) return;
      if (
        !sidebarOpen ||
        sidebar.current.contains(target) ||
        trigger.current.contains(target)
      )
        return;
      setSidebarOpen(false);
    };
    document.addEventListener('click', clickHandler);
    return () => document.removeEventListener('click', clickHandler);
  });

  useEffect(() => {
    const keyHandler = ({ keyCode }: KeyboardEvent) => {
      if (!sidebarOpen || keyCode !== 27) return;
      setSidebarOpen(false);
    };
    document.addEventListener('keydown', keyHandler);
    return () => document.removeEventListener('keydown', keyHandler);
  });

  useEffect(() => {
    localStorage.setItem('sidebar-expanded', sidebarExpanded.toString());
    if (sidebarExpanded) {
      document.querySelector('body')?.classList.add('sidebar-expanded');
    } else {
      document.querySelector('body')?.classList.remove('sidebar-expanded');
    }
  }, [sidebarExpanded]);

  return (
    <aside
      ref={sidebar}
      className={`absolute left-0 z-10 top-0 flex h-screen w-72.5 flex-col overflow-y-hidden bg-white duration-300 ease-linear dark:bg-boxdark lg:static lg:translate-x-0 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
    >
      <div className="flex items-center justify-between gap-2 px-6 py-5.5 lg:py-6.5">
        <NavLink to="/" className="flex items-center gap-5">
          <img src={Logo} alt="Logo" className="w-10 rounded" />
          <p className="text-xl">Bookers</p>
        </NavLink>
        <button
          ref={trigger}
          onClick={() => setSidebarOpen(!sidebarOpen)}
          aria-controls="sidebar"
          aria-expanded={sidebarOpen}
          className="block lg:hidden"
        >
          <svg
            className="fill-current"
            width="20"
            height="18"
            viewBox="0 0 20 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M19 8.175H2.98748L9.36248 1.6875C9.69998 1.35 9.69998 0.825 9.36248 0.4875C9.02498 0.15 8.49998
               0.15 8.16248 0.4875L0.399976 8.3625C0.0624756 8.7 0.0624756 9.225 0.399976 9.5625L8.16248 17.4375C8.31248
                17.5875 8.53748 17.7 8.76248 17.7C8.98748 17.7 9.17498 17.625 9.36248 17.475C9.69998 17.1375 9.69998
              16.6125 9.36248 16.275L3.02498 9.8625H19C19.45 9.8625 19.825 9.4875 19.825 9.0375C19.825 8.55 19.45 8.175 19 8.175Z"
              fill=""
            />
          </svg>
        </button>
      </div>

      <div className="no-scrollbar flex flex-col overflow-y-auto duration-300 ease-linear">
        <nav className="py-4 px-4 lg:px-6">
          <div>
            <h3 className="mb-4 ml-4 text-sm font-semibold text-black dark:text-white">
              {t('sidebar_menu_text')}
            </h3>

            <ul className="mb-6 flex flex-col gap-1.5">
              <li>
                <NavLink
                  to="/"
                  className={`reviews-shadow dark:hover:text-black dark:shadow-white group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-black duration-300 ease-in-out hover:bg-gray dark:text-white ${pathname === '/' && 'bg-gray dark:bg-[#9c0a36]'
                    }`}
                >
                  <AiOutlineDashboard />
                  {t('siderbar_dashboard')}
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/master"
                  className={`reviews-shadow dark:hover:text-black dark:shadow-white group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-black duration-300 ease-in-out hover:bg-gray dark:text-white ${pathname.includes('master') && 'bg-gray dark:bg-[#9c0a36]'
                    }`}
                >
                  <GiHairStrands />
                  {t('master')}
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/client"
                  className={`reviews-shadow dark:hover:text-black dark:shadow-white group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-black duration-300 ease-in-out hover:bg-gray dark:text-white ${pathname.includes('client') && 'bg-gray dark:bg-[#9c0a36]'
                    }`}
                >
                  <BsFillPersonLinesFill />
                  {t('siderbar_client')}
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/documents"
                  className={`reviews-shadow dark:hover:text-black hover:bg-gray dark:shadow-white group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-black duration-300 ease-in-out dark:text-white ${pathname.includes('documents') && 'bg-gray dark:bg-[#9c0a36]'
                    }`}
                >
                  <IoDocumentTextOutline />
                  {t('siderbar_documents')}
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/calendar"
                  className={`reviews-shadow dark:hover:text-black dark:shadow-white group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-black duration-300 ease-in-out hover:bg-gray dark:text-white ${pathname.includes('calendar') && 'bg-gray dark:bg-[#9c0a36]'
                    }`}
                >
                  <CiCalendar />
                  {t('siderbar_calendar')}
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/orders"
                  className={`reviews-shadow dark:hover:text-black dark:shadow-white group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-black duration-300 ease-in-out hover:bg-gray dark:text-white ${pathname.includes('orders') && 'bg-gray dark:bg-[#9c0a36]'
                    }`}
                >
                  <MdOutlineShoppingBag />
                  {t('siderbar_calculation')}
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/finance"
                  className={`reviews-shadow dark:hover:text-black dark:shadow-white group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-black duration-300 ease-in-out hover:bg-gray dark:text-white ${pathname.includes('finance') && 'bg-gray dark:bg-[#9c0a36]'
                    }`}
                >
                  <BsCurrencyDollar />
                  {t('siderbar_finance')}
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/mutual_settlements"
                  className={`reviews-shadow dark:hover:text-black dark:shadow-white group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-black duration-300 ease-in-out hover:bg-gray dark:text-white ${pathname.includes('mutual_settlements') && 'bg-gray dark:bg-[#9c0a36]'
                    }`}
                >
                  <PiHandshakeBold />
                  {t('Взаиморасчёты')}
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/reviews"
                  className={`reviews-shadow dark:hover:text-black dark:shadow-white group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-black duration-300 ease-in-out hover:bg-gray dark:text-white ${pathname.includes('reviews') && 'bg-gray dark:bg-[#9c0a36]'
                    }`}
                >
                  <MdReviews />
                  {t('Отзывы')}
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/chat"
                  className={`reviews-shadow dark:hover:text-black dark:shadow-white group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-black duration-300 ease-in-out hover:bg-gray dark:text-white ${pathname.includes('chat') && 'bg-gray dark:bg-[#9c0a36]'
                    }`}
                >
                  <IoChatbubbleEllipsesOutline />
                  {t('siderbar_chat')}
                </NavLink>
              </li>
            </ul>
          </div>
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;