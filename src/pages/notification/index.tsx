import { useEffect } from 'react';
import DefaultLayout from '../../layout/DefaultLayout';
import Chat from './chat/index';
import { getMasters } from '../../helpers/api-function/master/master';
import masterStore from '../../helpers/state_managment/master/masterStore';
import clientStore from '../../helpers/state_managment/client/clientstore';
import { getClients } from '../../helpers/api-function/client/client';
import chatStore from '../../helpers/state_managment/chat/chatStore.tsx';


const Natification = () => {
  const { setTotalPage } = masterStore();
  const { setClientTotalPage } = clientStore();
  const { role, setChatData } = chatStore();

  useEffect(() => {
    if (role === 'master') {
      getMasters({
        setData: setChatData,
        setTotalPage
      });
      console.log('role master');
    }
    if (role === 'client') {
      getClients({
        setData: setChatData,
        setTotalPage: setClientTotalPage
      });
      console.log('role client');
    }
  }, []);

  useEffect(() => {
    if (role === 'master') {
      getMasters({
        setData: setChatData,
        setTotalPage
      });
      console.log('role master');
    }
    if (role === 'client') {
      getClients({
        setData: setChatData,
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