import { useState } from 'react'
import admin from '../../../images/user/admin-panel.png';


const Chatusers = ({ user }: any) => {
    const [widths, setSidebarWidth] = useState('w-max');



    return (
        <div className='h-full overflow-y-auto'>
            <ul>
                {user ? 
                // user.map((item: any) =>
                    <li className='flex gap-2 items-center  md:my-1 border p-2'>
                        <img src={user.attachmentId ? user.attachmentId : admin } alt="user img" className='w-10 rounded-full bg-slate-300 p-1' />
                        <div className={`${widths} flex gap-1  flex-col w-max`}>
                            <div className={`flex  gap-1 flex-col items-start}`}>
                                <p className='text-sm'>{user.name ? user.name : "namae "} </p>
                                <p className='text-xs'> ({user.number ? user.number : "number"})</p>
                            </div>
                            <div className='flex w-full justify-between items-center '>
                                <div className='bg-blue-400 text-xs px-1 w-max rounded-sm text-white'>
                                    detailes
                                </div>
                                {user.status !== "OFFLINE" && <p>✅</p>}
                            </div>
                        </div>
                    </li>
                // )
                    :
                    <div className='w-full flex items-center mt-3 flex-col'>
                        <p>user not found</p>
                        "not found"
                    </div>}
            </ul>
        </div>

    )
}

export default Chatusers