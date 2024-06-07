import { useEffect, useRef, useState } from 'react'
import ChatEmptyState from '../components/emptychat';
import { IoMdAttach } from 'react-icons/io';
import { FaCheck } from 'react-icons/fa6';
import { IoSend } from 'react-icons/io5';
import Notselected from '../components/notselected';
import { ChatSentSmsType, ChatSentSmstList } from '../../../types/chat';


const Sms = ({ senderId, sendMessage, chat, setContent, content }: ChatSentSmsType) => {
  const [chats, setChats] = useState<ChatSentSmstList[]>([]);
  // const [content, setContent] = useState<any>('');

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleClick = () => {
    fileInputRef.current?.click();
  };
  useEffect(() => {
    setChats(chat)
  }, [chats, chat])
  console.log(chat);


  // useEffect(() => {
  //   contents(content)
  // }, [content]);


  const formatDateTime = (dateTimeString: string) => {
    const [datePart, timePart] = dateTimeString.split('T');
    const [time,] = timePart.split('.');
    return {
      date: datePart,
      time: time
    };
  };

  return (
    <div className='h-full relative pl-4'>
      {chat.length > 0 ? (
        <div className="w-full h-full flex flex-col">
          <div className="bg-gray-200 flex-1 h-full   overflow-hidden">
            <div className='w-full h-full overflow-y-auto'>
              {chats ? chats.map((item) =>
                <div className={`py-2 ${item.senderId == senderId ? "flex items-end justify-end flex-col" : "justify-start"}`}>
                  <div className="flex items-center mb-2">
                    <img
                      className="w-8 h-8 rounded-full mr-2"
                      src={`${item.userImgId ? item.userImgId : "https://picsum.photos/50/50"}`}
                      alt="User Avatar"
                    />
                    <div className="font-medium">{item.senderId == senderId ? item.senderName : item.receiverName}</div>
                  </div>
                  <p className={` ${item.senderId == senderId ? "bg-white rounded-lg py-2 px-3 shadow mb-2 max-w-sm w-max" : " bg-lime-500 text-white rounded-lg py-2 px-3 shadow mb-2 max-w-max"}`} >
                    {item.content ? item.content : "(null)"}
                  </p>
                  <p className="text-xs">{item.createdAt}</p>
                </div>
              )
                : (
                  <ChatEmptyState />
                )}
            </div>
          </div>

          <div className="px-4 py-2 border ">
            <div className="flex items-center gap-5 w-full">
              <textarea
                rows={1} id="chat"
                className="w-full border-none rounded-full py-2 px-4 mr-2 bg-transparent focus:outline-none focus:ring-0"
                placeholder="Type your message..."
                value={content}
                onChange={(e) => setContent(e.target.value)}
              ></textarea>
              <div className="flex justify-end items-center text-2xl w-1/2 gap-5">
                <div>
                  <input type="file" className="hidden" ref={fileInputRef} />
                  <IoMdAttach className="cursor-pointer text-xl" onClick={handleClick} />
                </div>
                <FaCheck />
                {content.trim() &&
                  <button onClick={sendMessage}>
                    <IoSend />
                  </button>}
              </div>
            </div>
          </div>

        </div>
      ) : (
        <div className="w-full h-96 relative z-0">
          <Notselected />
        </div>
      )}
    </div>
  )
}

export default Sms