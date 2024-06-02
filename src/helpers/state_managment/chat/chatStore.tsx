import { create } from 'zustand';
import { Data } from '../master/masterStore.tsx';

interface ChatData {
  role: string;
  setRole: (role: string) => void;
  chatData: Data[];
  setChatData: (val: Data[]) => void;
}

const chatStore = create<ChatData>((set) => ({
  role: 'master',
  setRole: (role: string) => set({ role: role }),
  chatData: [],
  setChatData: (val: Data[]) => set({ chatData: val }),
}));

export default chatStore;