import { useEffect, useRef, useState } from 'react';
import ChatEmptyState from '../components/emptychat';
import { IoMdAttach } from 'react-icons/io';
import { FaCheck } from 'react-icons/fa6';
import { IoSend } from 'react-icons/io5';
import Notselected from '../components/notselected';
import { ChatSentSmsType, ChatSentSmstList } from '../../../types/chat';
import { getFileId } from '../../../helpers/api';
import { Dropdown, Menu } from 'antd';
import { PiDotsThreeOutlineVertical } from 'react-icons/pi';
import { BiReply } from 'react-icons/bi';
import { ImCancelCircle } from "react-icons/im";

const Sms = ({ editId, replyId, chatId, senderId, sendMessage, chat, setContent, content }: ChatSentSmsType) => {
  const [chats, setChats] = useState<ChatSentSmstList[]>(chat);
  const [selreplyId, setSelreplyId] = useState<string>("");

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  useEffect(() => {
    setChats(chat);
  }, [chat]);
  console.log(chat);


  const handleMenuClick = (id: any) => {
    chatId(id);
  };

  const handleReply = (id: any) => {
    setSelreplyId(id)
    replyId(id);
  };

  const handleEdit = (id: any) => {
    editId(id);
  };

  const items = (id: number) => [
    {
      key: '1',
      onClick: () => handleMenuClick(id),
      label: "Удалить",
    },
    {
      key: '2',
      onClick: () => handleReply(id),
      label: "otvet",
    },
    {
      key: '3',
      onClick: () => handleEdit(id),
      label: "edit",
    },
  ];

  return (
    <div className='h-full relative pl-4'>
      {chat.length > 0 ? (
        <div className="w-full h-full flex flex-col">
          <div className="bg-gray-200 flex-1 h-full overflow-hidden">
            <div className='w-full h-full overflow-y-auto'>
              {chats.length > 0 ? (
                chats.map((item, index) => (
                  <div key={index} className={`py-2 ${item.senderId === senderId ? "flex items-end justify-end flex-col" : "justify-start"}`}>
                    <div className="flex items-center mb-2">
                      <img
                        className="w-8 h-8 rounded-full mr-2"
                        src={item.senderId !== senderId ? getFileId + item.receiverImg : getFileId + item.senderImg}
                        alt="User Avatar"
                      />
                      <div className="font-medium">{item.senderId === senderId ? item.senderName : item.receiverName}</div>
                    </div>
                    <div className={`p-2 rounded-md flex flex-col  ${item.replayDto ? "dark:bg-[#9c093543] bg-[#85828343]" : ""} ${item.senderId === senderId ? "items-end ml-20" : "items-start mr-20"}`}>
                      {item.replayDto &&
                        <div className={`flex gap-2 items-center ${item.senderId === senderId ? "justify-end" : "justify-start"}`}>
                          <div className='w-10 h-10 flex justify-center items-center'>
                            <BiReply style={{ fontSize: 25 }} />
                          </div>
                          <div className={`bg-gray text-black py-1 px-3 mb-1 rounded-md  dark:border-[#9c0935] ${item.senderId === senderId ? "border-r-2" : "border-l-2"}`}>{item.replayDto.content}</div>
                        </div>
                      }
                      <p className={`flex items-center gap-5 ${item.senderId === senderId ? "bg-white rounded-lg py-2 px-3 shadow max-w-sm w-max" : "bg-lime-500 text-white rounded-lg py-2 px-3 shadow mb-2 max-w-max flex-col-reverse"}`}>
                        <p className='w-[95%]'>{item.content ? item.content : "(null)"}</p>
                        <Dropdown overlay={<Menu items={items(item.id)} />} placement="bottomLeft" arrow>
                          <PiDotsThreeOutlineVertical style={{ fontSize: 16 }} />
                        </Dropdown>
                      </p>
                    </div>
                    <p className="text-xs">{item.createdAt}</p>
                  </div>
                ))
              ) : (
                <ChatEmptyState />
              )}
            </div>
          </div>
          {
            selreplyId &&
              chats.length > 0 ? chats.filter(item => item.id === selreplyId).map((item, index) => (
                <div key={index} className='border flex gap-3 justify-between rounded-t-md p-3'>
                  <div className='flex gap-3'>
                    <BiReply style={{ fontSize: 25 }} />
                    <p>{item.content}</p>
                  </div>
                  <button onClick={() => {
                    setSelreplyId("")
                    replyId("")
                  }}>
                    <ImCancelCircle />
                  </button>
                </div>
              )) : null

          }
          <div className="px-4 py-2 border">
            <div className="flex items-center gap-5 w-full">
              <textarea
                rows={1}
                id="chat"
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
                {content.trim() && (
                  <button onClick={sendMessage}>
                    <IoSend />
                  </button>
                )}
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
  );
};

export default Sms;
