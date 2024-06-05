import axios from 'axios';
import { getChatList_url } from '../../api.tsx';
import { config } from '../../token.tsx';
import { Data } from '../../state_managment/chat/chatStore.tsx';

interface IChat {
    status?: string;
    fullName?: string;
    messageStatus?: string;
    setData: (val: Data[]) => void;
  }
  

export const GetChatList = ({ status, fullName, messageStatus, setData }: IChat) => {
    console.log(status);
    
    axios.get(`${getChatList_url}${status ? `?status=${status}` : ''}${fullName ? `&fullName=${fullName}` : ''}${messageStatus ? `&messageStatus=${messageStatus}` : ''}`, config)
        .then(res => {
            if (res.data.success === true) {
                setData(res.data.body)
                console.log(res);
                
            } else setData([])
        })
        .catch(() => setData([]));
};
