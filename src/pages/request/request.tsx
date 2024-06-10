import { ReactNode, useEffect, useState } from 'react';
import DefaultLayout from '../../layout/DefaultLayout';
import RequestSidebar from '../../components/request/sidebar/RequestSidebar';
import { CgMenuLeft } from 'react-icons/cg';
import { ArrowLeftOutlined } from '@ant-design/icons';

const RequestLayout = ({ children, newMastersCount }: { children: ReactNode, newMastersCount?: number }) => {
    const [sidebarWidth, setSidebarWidth] = useState('w-max');
    const [siteBar, setSiteBar] = useState<boolean>(false);
    const [siteBarClass, setSiteBarClass] = useState<string>('');

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 768) {
                setSidebarWidth('w-1/4');
            } else {
                setSidebarWidth('fixed z-10 left-0');
            }
        };

        window.addEventListener('resize', handleResize);
        handleResize();
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const toggleSidebar = () => {
        setSidebarWidth((currentWidth) => (currentWidth === 'w-max' ? 'fixed' : 'w-max'));
        setSiteBarClass(() => {
            if (siteBar) {
                setSiteBar(false);
                return 'translate-x-0 left-0 ';
            } else {
                setSiteBar(true);
                return '-translate-x-full -left-10';
            }
        });
    };

    return (
        <DefaultLayout padding={true}>
            <div className='w-full flex justify-between'>
                <button onClick={toggleSidebar} className="md:hidden text-black mb-2">
                    <CgMenuLeft className="text-[1.5rem] font-bold" />
                </button>
                <div
                    className={`${sidebarWidth} ${siteBar} ${siteBarClass} top-[80px] mr-3 transition-all  md:translate-x-0 -translate-x-full drop-shadow-1 md:static fixed md:px-3 p-5 md:py-5 h-full duration-300 flex flex-col`}>
                    <RequestSidebar newMastersCount={newMastersCount} />
                    <button onClick={toggleSidebar} className="md:hidden text-black dark:text-white mb-2">
                        <ArrowLeftOutlined className="text-[1.5rem] font-bold" />
                    </button>
                </div>
                <div className='w-3/4 p-2'>{children}</div>
            </div>
        </DefaultLayout>
    );
};

export default RequestLayout;
