import { useEffect, useState } from 'react'
import admin from '../../../../images/user/admin-panel.png';
import { HiOutlineChatBubbleBottomCenterText } from "react-icons/hi2";
import { ChatusersListType } from '../../../../types/chat';
import { t } from 'i18next';

const ChatusersList = ({ user, role, userIds }: ChatusersListType) => {
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
                        <li key={i++} onClick={() => setUserId(item.userId)} className={`${item.userId == userId ? "dark:bg-[#9c0936] bg-gray" : ""} flex gap-2 items-center  md:my-1 border p-3 my-2  cursor-pointer dark:hover:bg-slate-800 hover:bg-slate-50`}>
                            <img src={item.attachmentId ? item.attachmentId : admin} alt="user img" className='w-10 h-10 rounded-full bg-slate-300 p-1' />
                            <div className={`flex gap-1 flex-col w-full relative`}>
                                <div className='flex gap-3 justify-between w-full'>
                                    <div className={`flex  gap-1 flex-col items-start}`}>
                                        <p className='text-sm'>{item.name ? item.name : t("master")} </p>
                                        <p className='text-xs'>{item.phone ? item.phone : t("Phone")}</p>
                                    </div>
                                    <div className='flex'>
                                        {item.chatDto.createdAt ?
                                            `${item.chatDto.createdAt}`
                                            : t("was_recently_oline")}
                                    </div>
                                </div>
                                <div className='flex w-full justify-between items-center '>

                                    {item.status !== "OFFLINE" && <p>✅</p>}
                                </div>
                                {item.newMessageCount > 0 && <div className='absolute right-3 -top-4 bg-green-600 text-white text-xs w-4 h-4 flex justify-center items-center rounded-full'>{item.newMessageCount}</div>}
                            </div>
                        </li>
                    )
                    :
                    <div className='w-full flex items-center mt-3 flex-col'>
                        <HiOutlineChatBubbleBottomCenterText className='text-4xl' />
                        <p>{role == "client" ? t("no_correspondence_with_the_client") : t("no_correspondence_with_the_master")}</p>
                    </div>}
            </ul>
        </div>

    )
}

export default ChatusersList