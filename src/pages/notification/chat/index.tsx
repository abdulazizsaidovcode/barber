import Chatdetail from '../chatDetails/chat';
import { BsFillPersonLinesFill } from 'react-icons/bs';
import { MdAdminPanelSettings } from 'react-icons/md';
import ChatTable from '../mails';
import { BiChat } from 'react-icons/bi';
import chatStore from '../../../helpers/state_managment/chat/chatStore.tsx';

function Chat() {
  const { role, setRole } = chatStore();
  return (
    <div>
      <div className="w-full pb-5 ">
        <div className="border-b border-gray-200 dark:border-gray-700">
          <ul className="flex flex-wrap -mb-px text-sm font-medium text-center text-gray-500 dark:text-gray-400">
            <li className="me-2 cursor-pointer">
              <div
                className={`inline-flex items-center justify-center p-4 border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300 ${role === 'master' ? 'text-[#9c0936] border-[#9c0936]' : 'text-gray-500 border-gray-200 dark:border-gray-700'}`}
                onClick={() => setRole('master')}
              >
                <MdAdminPanelSettings className="text-2xl" />

                <p className="ml-2">Мастера</p>
              </div>
            </li>
            <li className="me-2 cursor-pointer">
              <div
                className={`inline-flex items-center justify-center p-4 border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300 ${role === 'client' ? 'text-[#9c0936] border-[#9c0936]' : 'text-gray-500 border-gray-200 dark:border-gray-700'}`}
                onClick={() => setRole('client')}
              >
                <BsFillPersonLinesFill className="text-2xl" />
                <p className="ml-2">Клиенты</p>
              </div>
            </li>
            <li className="me-2 cursor-pointer">
              <div
                className={`inline-flex items-center justify-center p-4 border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300 ${role === 'mailings' ? 'text-[#9c0936] border-[#9c0936]' : 'text-gray-500 border-gray-200 dark:border-gray-700'}`}
                onClick={() => setRole('mailings')}
              >
                <BiChat className="text-2xl" />
                <p className="ml-2">Рассылки</p>
              </div>
            </li>
          </ul>
        </div>
      </div>
      {role === 'master' ? <Chatdetail /> : role === 'client' ? <Chatdetail /> : role === 'mailings' ? <ChatTable /> : ''}
    </div>
  );
}

export default Chat;
