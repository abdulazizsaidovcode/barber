import { ReactNode } from 'react';
import DefaultLayout from '../../layout/DefaultLayout';
import RequestSidebar from '../../components/request/sidebar/RequestSidebar';

const RequestLayout = ({ children } : { children: ReactNode }) => {
    return (
        <DefaultLayout padding={true}>
            <div className='w-full flex justify-between'>
                <p className='w-1/4 p-2'>
                    <RequestSidebar />
                </p>
                <div className='w-3/4'>{children}</div>
            </div>
        </DefaultLayout>
    );
};

export default RequestLayout;
