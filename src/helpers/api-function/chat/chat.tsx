import axios from 'axios';
import { getChatList_url } from '../../api.tsx';
import { config } from '../../token.tsx';
import { Data } from '../../state_managment/chat/chatStore.tsx';

interface IChat {
    role: string;
    status: string;
    fullName?: string;
    messageStatus: string;
    setData: (val: Data[]) => void;
    setTotalPage: (val: number) => void;
  }
  

export const GetChatList = ({ status, fullName, messageStatus, setData, setTotalPage }: IChat) => {
    axios.get(`${getChatList_url}?${status ? `status=${status}&` : ''}&${fullName ? `fullName=${fullName}&` : ''}${messageStatus ? `messageStatus=${messageStatus}&` : ''}`, config)
        .then(res => {
            if (res.data.success === true) {
                setData(res.data.body)
                setTotalPage(res.data.body.totalPage)
            }
        })
        .catch(err => console.log(err));
};
