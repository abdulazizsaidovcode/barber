import axios from 'axios';
import { useEffect, useState, ReactNode } from 'react';
import DefaultLayout from '../../layout/DefaultLayout';
import RequestSidebar from '../../components/request/sidebar/RequestSidebar';
import { CgMenuLeft } from 'react-icons/cg';
import { ArrowLeftOutlined } from '@ant-design/icons';
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
                    className={`${isSidebarOpen ? '-mt-8 left-0 top-0 z-10 w-full' : 'hidden'
                        } md:flex md:w-1/5 md:fixed dark:bg-gray-800 h-full transition-all duration-300 ease-in-out transform`}>
                    {isMobileView && (
                        <button onClick={toggleSidebar} className="text-black dark:text-blue-950 bg-transparent">
                            <ArrowLeftOutlined className="text-[1.5rem] font-bold" />
                        </button>
                    )}
                    <RequestSidebar
                        newMastersCount={counts.masterCount}
                        newFotoCount={counts.galleryCount}
                        categoryCount={counts.categoryCount}
                        serviceCount={counts.serviceCount}
                        allCount={counts.allCount}
                    />
                </div>
                <div className="w-full p-2 md:ms-[310px]">
                    {children}
                </div>
            </div>
            <Toaster position='top-center' reverseOrder={false} />
        </DefaultLayout>
    );
};

export default RequestLayout;
