import axios from 'axios';
import { useEffect, useState, ReactNode } from 'react';
import DefaultLayout from '../../layout/DefaultLayout';
import RequestSidebar from '../../components/request/sidebar/RequestSidebar';
import { CgMenuLeft } from 'react-icons/cg';
import { Toaster } from 'react-hot-toast';
import { requestes_count } from '../../helpers/api';
import { config } from '../../helpers/token';

const RequestLayout = ({ children }: { children: ReactNode }) => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [isMobileView, setIsMobileView] = useState(window.innerWidth < 768);
    const [counts, setCounts] = useState({
        allCount: 0,
        categoryCount: 0,
        galleryCount: 0,
        masterCount: 0,
        serviceCount: 0,
    });

    useEffect(() => {
        const handleResize = () => {
            setIsMobileView(window.innerWidth < 768);
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    useEffect(() => {
        fetchCounts();
    }, []);

    const fetchCounts = async () => {
        try {
            const res = await axios.get(requestes_count, config);
            setCounts(res.data.body);
        } catch { }
    };

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
                    className={`fixed z-10 h-full transition-transform transform ${
                        isSidebarOpen ? 'translate-x-0 top-9' : '-translate-x-full'
                    } md:translate-x-0 lg:w-1/5 md:w-[240px] sm:w-3/5 w-4/5 dark:bg-gray-800`}>
                   
                    <RequestSidebar
                        newMastersCount={counts.masterCount}
                        toggleSidebar={toggleSidebar}
                        isMobileView={isMobileView}
                        newFotoCount={counts.galleryCount}
                        categoryCount={counts.categoryCount}
                        serviceCount={counts.serviceCount}
                        allCount={counts.allCount}
                    />
                </div>
                <div className="md:w-4/5 p-2 md:ms-[25%]">
                    {children}
                </div>
            </div>
            <Toaster position='top-center' reverseOrder={false} />
        </DefaultLayout>
    );
};

export default RequestLayout;
