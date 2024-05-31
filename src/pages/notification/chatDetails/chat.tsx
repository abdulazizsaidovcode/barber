import React, { useEffect, useState } from 'react';
import { CgMenuLeft } from 'react-icons/cg';
import Chatusers from '../components/user';
import { Input, Select } from 'antd';
import { Buttons } from '../../../components/buttons';
import { IoSearchOutline } from 'react-icons/io5';
import axios from 'axios';
import { chat_user_url, sockjs_url } from '../../../helpers/api';

import { Stomp } from '@stomp/stompjs';
import SockJS from 'sockjs-client';
import NewChat from '../newChat';
import Sms from '../sms/sms';
import { config } from '../../../helpers/token';
interface ChatProp {
  role: string;
}

const Chatdetail = ({ role }: ChatProp) => {
  const [admin, setAdmin] = useState<any>(null);
  const [sidebarWidth, setSidebarWidth] = useState('w-max');
  const [siteBar, setSiteBar] = useState<boolean>(false);
  const [siteBarClass, setSiteBarClass] = useState<string>('');
  const [adminId, setAdminId] = useState<string | null>('');

  const [messages, setMessages] = useState<any>([]);
  const [content] = useState<any>('');
  const [stompClient, setStompClient] = useState<any>([]);


  // ---------- get admin and user ----------- //

  useEffect(() => {
    axios.get(chat_user_url, config)
      .then(res => {
        setAdmin(res.data.body)
        console.log(res.data.body);

      }).catch((err) => {
        console.error(err)
      })

    setAdminId(sessionStorage.getItem('userId'))
  }, [])



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
    connect()

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

  // --------- connect socket with sock js ------
  const connect = () => {
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

  };

  const sendMessage = () => {
    const chatMessage = {
      senderId: adminId,
      recipientId: '5470d9d2-39d5-40c7-9cdc-592953862023',
      content: content,
      isRead: false,
      createdAt: new Date(),
      attachmentIds: [],
    };

    stompClient.send('/app/chat', {}, JSON.stringify(chatMessage));
    console.log('Message sent:', content);
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




  return (
    <div className=''>
      <div className="w-full pb-5 flex gap-10 items-center flex-wrap ">
        <button onClick={toggleSidebar} className="md:hidden text-black mb-2">
          <CgMenuLeft className="text-[1.5rem] font-bold" />
        </button>

        <Input
          placeholder="Search F.I.O"
          prefix={<IoSearchOutline />}
          className='w-56'
        />
        <Select
          defaultValue="lucy"
          className="w-56 "
          dropdownClassName="my-custom-dropdown"
          options={[
            { value: 'jack', label: 'Jack' },
            { value: 'lucy', label: 'Lucy' },
            { value: 'Yiminghe', label: 'yiminghe' },
            { value: 'disabled', label: 'Disabled', disabled: true }
          ]}
        />
        <NewChat />
        <Buttons>Удалить все прочитанные</Buttons>
      </div>

      <div className="flex w-[100%] relative">
        <div
          className={`${sidebarWidth} ${siteBar} ${siteBarClass} transition-all sidebar md:translate-x-0 -translate-x-full sm:w-2/3 w-3/4 bg-graymedium drop-shadow-1 dark:bg-[#30303d] md:static fixed top-[130px] md:px-3 p-5 y border md:py-5 h-[83vh] duration-300 flex flex-col`}
        >
          <div className={`w-full`}>
            <Chatusers user={admin} />
          </div>
        </div>
        <div className="w-full relative overflow-y-auto">
          <Sms sendMessage={sendMessage} chat={"salom"} contents={content} />
        </div>
      </div>
    </div>
  );
};

export default Chatdetail;
