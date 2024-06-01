import React, { useEffect, useRef, useState } from 'react'
import ChatEmptyState from '../components/emptychat';
import { IoMdAttach } from 'react-icons/io';
import { FaCheck } from 'react-icons/fa6';
import { IoSend } from 'react-icons/io5';
import Notselected from '../components/notselected';
interface SmsProp {
  sendMessage: () => void,
  chat: string,
  contents: string
}

const Sms = ({ sendMessage, chat, contents }: SmsProp) => {
  const [chats, setChats] = useState<string>("");
  const [content, setContent] = useState<any>('');

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleClick = () => {
    fileInputRef.current?.click();
  };
  useEffect(() => {
    setChats(chat)
  }, [chats])

  useEffect(() => {
    setContent(contents);
  }, [contents]);

  // sented qismini sozlash

  useEffect(() => {
    const updateWidth = () => {
      const parent = document.getElementById('parent-container') as HTMLElement;
      const footer = document.getElementById('fixed-footer') as HTMLElement;

      if (parent && footer) {
        const parentWidth = parent.offsetWidth;
        footer.style.width = `${parentWidth}px`;
      }
    };

    window.addEventListener('resize', updateWidth);
    updateWidth();

    return () => {
      window.removeEventListener('resize', updateWidth);
    };
  }, []);

  const data = [
    {
      id: 1,
      attachmentId: null,
      name: 'Abdulaziz',
      number: '91 959 55 99'
    },
    {
      id: 2,
      attachmentId: null,
      name: 'Abdulaziz',
      number: '91 959 55 99'
    }
  ];

  return (
    <div className='custom-container py-14'>
      {data.length > 0 ? (
        <div className="w-full h-[100%] flex flex-col overflow-auto">
          <div className="bg-gray-200 flex-1 overflow-y-auto pb-20 pt-5 px-4">
            {!chats ? (
              <h1 className="text-xl hover:text-lime-600 mb-10">
                Teshavoy (998 91 959 55 99)
              </h1>
            ) : (
              ''
            )}
            {!chats ? (
              <div className="py-2">
                <div>
                  <div className="flex items-center mb-2">
                    <img
                      className="w-8 h-8 rounded-full mr-2"
                      src="https://picsum.photos/50/50"
                      alt="User Avatar"
                    />
                    <div className="font-medium">John Doe</div>
                  </div>
                  <div className="bg-white rounded-lg p-2 shadow mb-2 max-w-sm">
                    Hi, how can I help you?
                  </div>
                  <p className="text-xs">12.23.2024</p>
                </div>
                <div className="flex items-end justify-end flex-col">
                  <div className="flex items-center mb-2">
                    <img
                      className="w-8 h-8 rounded-full mr-2"
                      src="https://picsum.photos/50/50"
                      alt="User Avatar"
                    />
                    <div className="font-medium">Abdul Aziz</div>
                  </div>
                  <div className="bg-lime-500 text-white rounded-lg p-2 shadow max-w-sm mb-2">
                    Sure, I can help with that.
                  </div>
                  <p className="text-xs">12.23.2024</p>
                </div>
              </div>
            ) : (
              <ChatEmptyState />
            )}
            {chats ? <p className="text-center">thats all 🙂</p> : ''}
          </div>
          <div id="parent-container" className="container">
            <div
              className="bg-gray-100 px-4 py-2 border fixed bottom-3 w-full sm:ml-[12px] sm:left-auto left-[50%] sm:translate-x-0 -translate-x-[50%]"
              style={{ width: 'inherit' }}
              id="fixed-footer"
            >
              <div className="flex items-center gap-5 w-full">
                {/* <textarea
                  rows={1} id="chat"
                  className="w-full border-none rounded-full py-2 px-4 mr-2 bg-transparent focus:outline-none focus:ring-0"
                  placeholder="Type your message..."
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                ></textarea> */}
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
                  <button onClick={sendMessage}>
                    <IoSend />
                  </button>
                </div>
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