import React, { useEffect, useRef, useState } from 'react';
import { CgMenuLeft } from 'react-icons/cg';
import Chatusers from '../components/chat components/user';
import Notselected from '../components/chat components/notselected';
import ChatEmptyState from '../components/chat components/emptychat';
import { Input, Select } from 'antd';
import { Buttons } from '../../../components/buttons';
import { IoSearchOutline, IoSend } from 'react-icons/io5';
import { IoMdAttach } from 'react-icons/io';
import { FaCheck } from 'react-icons/fa6';
import axios from 'axios';
import { chat_user_url } from '../../../helpers/api';

import { Client, Stomp } from '@stomp/stompjs';
import SockJS from 'sockjs-client';

const Chatdetail: React.FC = () => {
  const [chats, setChats] = useState(false);
  const [admin, setAdmin] = useState<any>(null);
  const [sidebarWidth, setSidebarWidth] = useState('w-max');
  const [siteBar, setSiteBar] = useState<boolean>(false);
  const [siteBarClass, setSiteBarClass] = useState<string>('');

  const [messages, setMessages] = useState<any>('');
  const [message, setMessage] = useState<string>('');
  // const [chatId, setChatId] = useState<string>('');
  const [stompClient, setStompClient] = useState<any>([]);
  const [nickName, setNickName] = useState<string>('');


  useEffect(() => {
    // setConfig()
    axios.get(chat_user_url, {

      headers: {
        Authorization: "Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIrOTk4OTk2NzY1MDc3In0.uqLtkSGi18oOwOR6GZa2gTrE3OlqausESCugorzSyb2tsC3REuBH1uf_3iciMtBwJkJh6eiE13O3_HMsuucWLw"
      }
    })
      .then(res => {
        setAdmin(res.data.body)
      }).catch((err) => {
        console.error(err)
      })
  }, [])

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

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setSidebarWidth('w-1/4');
      } else {
        setSidebarWidth('fixed z-10 left-0');
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, []);


  useEffect(() => {
    const socket = new SockJS('http://45.67.35.86:8080/wp');
    const client = Stomp.over(socket)

    client.connect({}, () => {
      client.subscribe('/user/3e129de3-cb68-4c72-b626-66d56f6cb2b2/queue/messages', (response) => {
        const data = JSON.parse(response.body);
        setMessages((prevMessage: any) => [...prevMessage, data])
      });
    })
    setStompClient(client)

    return () => {
      client.disconnect()
    }

    // const client = new Client({
    //   webSocketFactory: () => socket,
    //   debug: (str) => {
    //     console.log(str);
    //   },

    //   onConnect: (frame) => {
    //     console.log('Connected: ' + frame);
    //     client.subscribe('/user/3e129de3-cb68-4c72-b626-66d56f6cb2b2/queue/messages', (response) => {
    //       console.log(response);
    //     });
    //   },
    //   onStompError: (frame) => {
    //     console.error('Error: ' + frame.headers['message']);
    //   },
    //   onDisconnect(frame) {
    //     console.error('Error: ' + frame.headers['message']);
    //   },
    //   onWebSocketError(res){
    //     console.log(res)
    //   }
    // });
    // client.activate();
    // setStompClient(client);
  }, []);
  const handleNickName = (e: any) => {
    setNickName(e.target.value)
  }
  const handleMessage = (e: any) => {
    setMessage(e.target.value)
  }

  const sendMessage = () => {

    const chatMessage = {
      id: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
      senderId: 'c6bd41df-574d-4d3e-afc1-3b65a2daad99',
      recipientId: '3e129de3-cb68-4c72-b626-66d56f6cb2b2',
      content: message,
      isRead: false,
      createdAt: new Date(),
      attachmentIds: []
    };

    stompClient.send('/app/chat', {}, JSON.stringify(chatMessage));
    // sendMessage()
  };

  // const messageDelete = () => {
  //   if (stompClient && stompClient.connected) {
  //     stompClient.publish({
  //       destination: '/app/deleteMessage',
  //       body: JSON.stringify(chatId)
  //     });
  //   }
  // };

  // const editMessage = () => {
  //   const editMessage = {
  //     messageId: chatId,
  //     chatDto: {
  //       id: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
  //       senderId: 'c6bd41df-574d-4d3e-afc1-3b65a2daad99',
  //       recipientId: '3e129de3-cb68-4c72-b626-66d56f6cb2b2',
  //       content: message,
  //       isRead: false,
  //       createdAt: new Date(),
  //       attachmentIds: []
  //     }
  //   };
  //   if (stompClient && stompClient.connected) {
  //     stompClient.publish({
  //       destination: '/app/editMessage',
  //       body: JSON.stringify(editMessage)
  //     });
  //   }
  // };


  const toggleSidebar = () => {
    setSidebarWidth((currentWidth) => (currentWidth === 'w-max' ? 'fixed' : 'w-max'));
    setSiteBarClass(() => {
      if (siteBar) {
        setSiteBar(false);
        return 'translate-x-0 left-0 ';
      } else {
        setSiteBar(true);
        return '-translate-x-full -left-10';
      }
    });
  };

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

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className=''>
      <div className="w-full pb-5 flex gap-10 items-center flex-wrap ">
        <button onClick={toggleSidebar} className="md:hidden text-black mb-2">
          <CgMenuLeft className="text-[1.5rem] font-bold" />
        </button>

        <Input prefix={<IoSearchOutline />} className="w-max dark:bg-gray" />
        <Select
          defaultValue="lucy"
          className="w-40 dark:bg-gray"
          dropdownClassName="my-custom-dropdown"
          options={[
            { value: 'jack', label: 'Jack' },
            { value: 'lucy', label: 'Lucy' },
            { value: 'Yiminghe', label: 'yiminghe' },
            { value: 'disabled', label: 'Disabled', disabled: true }
          ]}
        />
        <Buttons>button</Buttons>
        <Buttons>button</Buttons>
      </div>

      <div className="flex w-[100%] relative">
        <div
          className={`${sidebarWidth} ${siteBar} ${siteBarClass} transition-all sidebar md:translate-x-0 -translate-x-full sm:w-2/3 w-3/4 bg-graymedium drop-shadow-1 dark:bg-[#30303d] md:static fixed z-10 top-[130px] md:px-3 p-5 y border md:py-5 h-[83vh] duration-300 flex flex-col`}
        >
          <div className={`w-full`}>
            <Chatusers user={admin} />
          </div>
        </div>
        <div className="w-full relative overflow-y-auto">
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
                    <input
                      className="w-1/2 border-none rounded-full py-2 px-4 mr-2 bg-transparent focus:outline-none focus:ring-0"
                      type="text"
                      placeholder="Type your message..."
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                    />
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
            <div className="w-full relative z-0">
              <Notselected />
            </div>
          )}
        </div>
      </div>
      <div id="response"></div>
    </div>
  );
};

export default Chatdetail;
