import { useEffect } from 'react';
import DefaultLayout from '../../layout/DefaultLayout';
import Chat from './chat/index';
import { getMasters } from '../../helpers/api-function/master/master';
import { getClients } from '../../helpers/api-function/client/client';

import masterStore from '../../helpers/state_managment/master/masterStore';
import clientStore from '../../helpers/state_managment/client/clientstore';
import chatStore from '../../helpers/state_managment/chat/chatStore.tsx';
import { GetChatList } from '../../helpers/api-function/chat/chat.tsx';
import MailStore from '../../helpers/state_managment/chat/mailStore.tsx';
import { GetChatLetters } from '../../helpers/api-function/chat/mail.tsx';

const Natification = () => {
  const { setData, setTotalPage, page, size } = masterStore();
  const { setClientData, setClientTotalPage } = clientStore();
  const { role, setChatData } = chatStore();

  const { setLetterData } = MailStore();

  useEffect(() => {
    GetChatLetters({
      setLetterData: setLetterData,
      page: page,
      size: size
    });
  }, [setLetterData]);

  useEffect(() => {
    if (role === 'master') {
      GetChatList({
        status: 'MASTER',
        setData: setChatData
      });
      getMasters({
        setData,
        setTotalPage
      });
      console.log('role master');
    }
    if (role === 'client') {
      GetChatList({
        status: 'CLIENT',
        setData: setChatData
      });
      getClients({
        setData: setClientData,
        setTotalPage: setClientTotalPage
      });
      console.log('role client');
    }
  }, []);

  useEffect(() => {
    if (role === 'master') {
      GetChatList({
        status: 'MASTER',
        setData: setChatData
      });
      getMasters({
        setData,
        setTotalPage
      });
      console.log('role master');
    }
    if (role === 'client') {
      GetChatList({
        status: 'CLIENT',
        setData: setChatData
      });
      getClients({
        setData: setClientData,
        setTotalPage: setClientTotalPage
      });
      console.log('role client');
    }
  }, [role]);

  return (
    <DefaultLayout>
      <Chat />
    </DefaultLayout>
  );
};

export default Natification;