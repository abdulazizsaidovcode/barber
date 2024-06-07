import { create } from 'zustand';

interface ChatLetters {
  subject: string;
  chatData: Data[];
  date: string;
  page: string;
  size: string;
  setSubject: (val: string) => void;
  setLetterData: (val: Data[]) => void;
}

interface ChatDto {
  attachmentIds: string[];
  content: string;
  createdAt: "3924-07-04T22:00:00.000+00:00";
  id: number;
  read: boolean;
  recipientId: string;
  replayDto: string | null;
  senderId: string;
}

export interface Data {
  attachmentId: string | null;
  chatDto: ChatDto;
  name: string;
  newMessageCount: number;
  nickname: string | null;
  phone: string;
  status: null | string;
  userId: string;
}

const MailStore = create<ChatLetters>((set) => ({
  subject: '',
  chatData: [],
  date: '',
  page: '',
  size: '',
  setSubject: (val: string) => set({ subject: val }),
  setLetterData: (val: Data[]) => set({ chatData: val }),
}));

export default MailStore;
