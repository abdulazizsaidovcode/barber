import { create } from 'zustand';

export interface MailItem {
  attachmentId: string | null;
  content: string;
  date: string;
  fileId: string;
  fileName: string | null;
  id: number;
  subject: string | null;
  toWhom: string;
}

interface MailData {
  object: MailItem[];
  totalElements: number;
}

const MailStore = create<{
  chatData: any;
  setLetterData: (val: any) => void;
  page: number;
  setPage: (val: number) => void;
  size: number;
  setSize: (val: number) => void;
}>((set) => ({
  chatData: null,
  setLetterData: (val) => set({ chatData: val }),
  page: 0,
  setPage: (val) => set({ page: val }),
  size: 10,
  setSize: (val) => set({ size: val }),
}));

export default MailStore;
