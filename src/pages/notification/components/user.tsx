import { useEffect, useState } from 'react'
import admin from '../../../images/user/admin-panel.png';
import { Data } from '../../../helpers/state_managment/master/masterStore';

interface Props {
    user: Data[];
    role: string;
    userIds: any;
}
const Chatusers = ({ user, role, userIds }: Props) => {
    let i = 0
    const [userId, setUserId] = useState('');
    const [chatData, setChatData] = useState<any>(null);

    useEffect(() => {
        setChatData(user)
    }, [user])
    useEffect(() => {
        userIds(userId)
    }, [userId])
    console.log(user);
    


    return (
        <div className='h-full overflow-y-auto'>
            <ul>
                {chatData ?
                    chatData.map((item: any) =>
                        <li key={i++} onClick={() => setUserId(item.id)} className='flex gap-2 items-center  md:my-1 border p-2'>
                            <img src={item.attachmentId ? item.attachmentId : admin} alt="user img" className='w-10 rounded-full bg-slate-300 p-1' />
                            <div className={`flex gap-1  flex-col w-full`}>
                                <div className='flex justify-between w-full'>
                                    <div className={`flex  gap-1 flex-col items-start}`}>
                                        <p className='text-sm'>{item.fullName ? item.fullName : "Master "} </p>
                                        <p className='text-xs'>{item.phoneNumber ? item.phoneNumber : "phoneNumber"}</p>
                                    </div>
                                    <div className='flex'>
                                        <p>{item.startedWork}</p>
                                    </div>
                                </div>
                                <div className='flex w-full justify-between items-center '>
                                    <div className='bg-blue-400 text-xs px-1 w-max rounded-sm text-white'>
                                        detailes
                                    </div>
                                    {item.status !== "OFFLINE" && <p>✅</p>}
                                </div>
                            </div>
                        </li>
                    )
                    :
                    <div className='w-full flex items-center mt-3 flex-col'>
                        <p>{role} not found</p>
                    </div>}
            </ul>
        </div>

    )
}

export default Chatusers