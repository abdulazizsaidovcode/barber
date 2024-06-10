import { ReactNode, useEffect, useState } from 'react';
import DefaultLayout from '../../layout/DefaultLayout';
import RequestSidebar from '../../components/request/sidebar/RequestSidebar';
import { CgMenuLeft } from 'react-icons/cg';
import { ArrowLeftOutlined } from '@ant-design/icons';

const RequestLayout = ({ children, newMastersCount }: { children: ReactNode, newMastersCount?: number }) => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [isMobileView, setIsMobileView] = useState(window.innerWidth < 768);

    useEffect(() => {
        const handleResize = () => {
            setIsMobileView(window.innerWidth < 768);
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    return (
        <DefaultLayout padding={true}>
            <div className="w-full md:flex md:justify-between">
                <button onClick={toggleSidebar} className="md:hidden ms-4 text-black mb-2">
                    <CgMenuLeft className="text-[1.5rem] font-bold" />
                </button>
                <div
                    className={`${
                        isSidebarOpen ? '-mt-8 left-0 top-0 z-10 w-full' : 'hidden'
                    } md:flex md:w-1/4 md:static bg-white dark:bg-gray-800 h-full transition-all duration-300 ease-in-out transform`}>
                    {isMobileView && (
                        <button onClick={toggleSidebar} className="text-black dark:text-blue-950 bg-transparent">
                            <ArrowLeftOutlined className="text-[1.5rem] font-bold" />
                        </button>
                    )}
                    <RequestSidebar newMastersCount={newMastersCount} />
                </div>
                <div className="w-full md:w-3/4 p-2">
                    {children}
                </div>
            </div>
        </DefaultLayout>
    );
};

export default RequestLayout;
