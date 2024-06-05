import { create } from 'zustand';


interface ChatData {
  tema: string;
  chatData: Data[];
  setChatData: (val: Data[]) => void;
}
interface ChatDto {
  attachmentIds: string[];
  content: string;
  createdAt: "3924-07-04T22:00:00.000+00:00"
  id: number;
  read: boolean
  recipientId: string
  replayDto: string | null
  senderId: string
}
export interface Data {
  attachmentId: string | null;
  chatDto: ChatDto;
  name: string;
  newMessageCount: number
  nickname: string | null
  phone: string
  status: null | string,
  userId: string;
}


const MailStore = create<ChatData>((set) => ({
  tema: '',
  chatData: [],
  setChatData: (val: Data[]) => set({ chatData: val }),
}));


export default MailStore
