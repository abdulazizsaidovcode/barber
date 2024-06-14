import { create } from 'zustand';
interface Data {
  id: number;
  percent: string;
}

interface OnlineBooking {
  data: Data[],
  isInputOpen: boolean;
  isEditModal: boolean;
  items: Data | null;
  setItems: (data: Data | undefined) => void;
  setEditModal: (isEdit: boolean) => void;
  setIsInputOpen: (isOpen: boolean) => void;
  setData: (data: Data[]) => void;
} 

const onlineBookingStore = create<OnlineBooking>((set) => ({
  data: [],
  isInputOpen: false,
  isEditModal: false,
  items: null,
  setItems: (val: Data | undefined) => set({ items: val }),
  setEditModal: (val: boolean) => set({ isEditModal: val }),
  setIsInputOpen: (val: boolean) => set({ isInputOpen: val }),
  setData: (val: Data[]) => set({ data: val }),
}));


export default onlineBookingStore