import { useEffect, useState } from 'react'
import admin from '../../../images/user/admin-panel.png';
import { Data } from '../../../helpers/state_managment/chat/chatStore'
import { HiOutlineChatBubbleBottomCenterText } from "react-icons/hi2";
interface Props {
    user: Data[];
    role: string;
    userIds: any;
}
const Chatusers = ({ user, role, userIds }: Props) => {
    let i = 0
    const [userId, setUserId] = useState('');
    const [chatData, setChatData] = useState<any>([]);

    useEffect(() => {
        setChatData(user)
    }, [user])
    useEffect(() => {
        userIds(userId)
    }, [userId])


    return (
        <div className='h-full overflow-y-auto'>
            <ul>
                {chatData.length > 0 ?
                    chatData.map((item: any) =>
                        <li key={i++} onClick={() => setUserId(item.userId)} className='flex gap-2 items-center  md:my-1 border p-2'>
                            <img src={item.attachmentId ? item.attachmentId : admin} alt="user img" className='w-10 rounded-full bg-slate-300 p-1' />
                            <div className={`flex gap-1 flex-col w-full relative`}>
                                <div className='flex justify-between w-full'>
                                    <div className={`flex  gap-1 flex-col items-start}`}>
                                        <p className='text-sm'>{item.name ? item.name : "Master "} </p>
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
                                <div className='absolute right-3 -top-3 bg-green-600 text-white w-5 h-5 flex justify-center items-center rounded-full'>{item.newMessageCount}</div>
                            </div>
                        </li>
                    )
                    :
                    <div className='w-full flex items-center mt-3 flex-col'>
                        <HiOutlineChatBubbleBottomCenterText className='text-4xl'/>
                        <p>{role == "client" ? "никакой переписки с клиентом" : "никакой переписки с мастером"}</p>
                    </div>}
            </ul>
        </div>

    )
}

export default Chatusers