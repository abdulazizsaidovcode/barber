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


export interface Data {
  attachmentId: string | null;
  content: string;
  date: string;
  fileId: string;
  fileName: string | null;
  id: number;
  subject: null | string;
  toWhom: string;
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
