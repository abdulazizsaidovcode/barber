import { create } from 'zustand';


interface ChatData {
  role: string;
  setRole: (role: string) => void;
  chatData: Data[];
  setChatData: (val: Data[]) => void;
}
export interface Data {
  id: string;
  imgUrl: string;
  fullName: string;
  serviceCategory: string[] | null;
  startedWork: string
  orderCount: number
  rating: number
  status: null | string,
  schedule: string
  canceled: number
  specialization: string[] | null;
  totalClient: number
  phoneNumber: string
  workPlace: string
  lat: number
  lng: number
}

const chatStore = create<ChatData>((set) => ({
  role: 'master',
  setRole: (role: string) => set({ role: role }),
  chatData: [],
  setChatData: (val: Data[]) => set({ chatData: val }),
}));

export default chatStore;