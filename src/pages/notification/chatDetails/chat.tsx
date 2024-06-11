import React, { useEffect, useState } from 'react';
import { CgMenuLeft } from 'react-icons/cg';
import ChatusersList from '../components/user';
import { Input, Select } from 'antd';
import { Buttons } from '../../../components/buttons';
import { IoSearchOutline } from 'react-icons/io5';
import { chat_url, messages_url, sockjs_url } from '../../../helpers/api';

import { Stomp } from '@stomp/stompjs';
import SockJS from 'sockjs-client';
import NewChat from '../newChat';
import Sms from '../sms/sms';
import Notselected from '../components/notselected';
import chatStore from '../../../helpers/state_managment/chat/chatStore.tsx';
import { ArrowLeftOutlined } from '@ant-design/icons';
import axios from 'axios';
import { config } from '../../../helpers/token.tsx';
import { GetChatList } from '../../../helpers/api-function/chat/chat.tsx';
import toast from 'react-hot-toast';

const Chatdetail: React.FC = () => {
  const { role, chatData, setChatData } = chatStore()

  const [sidebarWidth, setSidebarWidth] = useState('w-max');
  const [siteBar, setSiteBar] = useState<boolean>(false);
  const [siteBarClass, setSiteBarClass] = useState<string>('');

  const [recipientId, setRecipientId] = useState<string | null>(null);
  const [adminId, setAdminId] = useState<string | null>('');

  // const [chatData, setChatData] = useState<Data[]>([]);

  // const [client, setClient] = useState<object | null>(null);
  // const [masters, setMasters] = useState<null | object>(null);

  const [messages, setMessages] = useState<any>([]);
  const [content, setContent] = useState<string>('');
  const [stompClient, setStompClient] = useState<any>([]);

  // filter
  const [fullName, setFullName] = useState<string>('');
  const [messageStatus, setMessageStatus] = useState('ALL_MESSAGES');


  // ---------- get admin and user ----------- //

  useEffect(() => {
    setAdminId(sessionStorage.getItem('userId'));
    connect();
  }, []);

  // console.log(chatData, role);

  // useEffect(() => {
  //   console.log(recipientId);
  // }, [recipientId])

  // function checkRole(text: string) {
  //   if (text === 'master') setChatData(data);
  //   else setChatData(clientData);
  // }

  // chat sitebar sizing
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

  // chat/web?status=MASTER&fullName=m
  // chat/web?status=MASTER 

  // chat/web
  // chat/web?status=MASTER&messageStatus=READ
  // chat/web&messageStatus=READ

  //  connect socket with sock js 
  const connect = () => {
    if (adminId) {
      const socket = new SockJS(sockjs_url);
      const stomp = Stomp.over(socket);

      stomp.connect({}, (frame: any) => {
        console.log('Connected: ' + frame);
        setStompClient(stomp);
        stomp.subscribe(`/user/${adminId}/queue/messages`, (response) => {
          const receivedMessages = JSON.parse(response.body);
          setMessages((prevState: any) => [...prevState, receivedMessages]);

        });
      }, (error: any) => {
        console.error('Error connecting: ', error);
      });
      // onStompError: (frame) => {
      //       console.error('Error: ' + frame.headers['message']);
      //     },
      //     onDisconnect(frame) {
      //       console.error('Error: ' + frame.headers['message']);
      //     },
      //     onWebSocketError(res){
      //       console.log(res)
      //     }
      //   });
      //   client.activate();
      //   setStompClient(client);
    };
  }


  const sendMessage = () => {
    const chatMessage = {
      senderId: adminId,
      recipientId: '5470d9d2-39d5-40c7-9cdc-592953862023',
      content: content,
      isRead: false,
      createdAt: new Date(),
      attachmentIds: []
    };
    if (content) {
      stompClient.send('/app/chat', {}, JSON.stringify(chatMessage));
      setContent('');
      console.log('Message sent:', content);

    } else {
      alert('toldiiiiiir ❗️')
    }


  };
  useEffect(() => {
    if (recipientId) {
      axios.get(`${messages_url}/${adminId}/${recipientId}`, config)
        .then(res => {
          setMessages(res.data.body);
        }).catch(err => {
          console.error(err);
        })
    }
  }, [recipientId])

  const readAllMessages = () => {
    axios.get(`${chat_url}/all-message-ready`, config)
      .then(res => {
        toast.success('پیام ها با موفقیت خوانده ش')
      }).catch(err => {
        console.log(err);
        
      })
  }

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


  return (
    <div className="h-[92%]">
      <div className="w-full py-5 flex gap-10 items-center flex-wrap ">
        <button onClick={toggleSidebar} className="md:hidden text-black mb-2">
          <CgMenuLeft className="text-[1.5rem] font-bold" />
        </button>

        <Input
          placeholder="Поиск по ФИО"
          prefix={<IoSearchOutline />}
          className="w-56"
          onChange={(e) => {
            const value = e.target.value;
            setFullName(value);
            GetChatList({
              status: role,
              fullName: value,
              setData: setChatData
            });
          }}
        />
        <Select
          defaultValue="ALL_MESSAGES"
          className="w-56"
          dropdownClassName="my-custom-dropdown"
          onChange={(value) => {
            setMessageStatus(value);
            GetChatList({
              status: role,
              messageStatus: value,
              setData: setChatData
            });
          }}
          options={[
            { value: 'ALL_MESSAGES', label: 'Все сообщения' },
            { value: 'UNREAD', label: 'Непрочитанные' },
            { value: 'READ', label: 'Прочитанные' },
          ]}
        />

        {/* yangi chat yaratuvchi button va component */}
        <NewChat />
        <Buttons onClick={readAllMessages}>Удалить все прочитанные</Buttons>
      </div>

      {/* chat list */}
      <div className="flex w-[100%] h-full relative">
        <div
          className={`${sidebarWidth} ${siteBar} ${siteBarClass} top-[80px] transition-all  md:translate-x-0 -translate-x-full sm:w-2/3 w-3/4 bg-[#eaeaea] drop-shadow-1 dark:bg-[#30303d] md:static fixed md:px-3 p-5  border md:py-5 h-full duration-300 flex flex-col`}>
          <div className='flex justify-end mb-4'>
            <button onClick={toggleSidebar} className="md:hidden text-black dark:text-white mb-2">
              <ArrowLeftOutlined className="text-[1.5rem] font-bold" />
            </button>
          </div>
          <ChatusersList user={chatData} role={role} userIds={setRecipientId} />
        </div>
        <div className="w-full relative ">
          {recipientId ? <Sms senderId={adminId} sendMessage={sendMessage} chat={messages} content={content} setContent={setContent} /> : <Notselected />}
        </div>
      </div>

    </div>
  );
};

export default Chatdetail;
