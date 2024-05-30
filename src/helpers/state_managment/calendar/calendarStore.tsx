import { create } from 'zustand';

interface CalendarStore {
  show: boolean;
  loading: boolean;
  date: string;
  setShow: (val: boolean) => void;
  setDate: (val: string) => void;
  setLoading: (val: boolean) => void;
}

const calendarStore = create<CalendarStore>((set) => ({
  show: false,
  loading: false,
  date: "",
  setShow: (val: boolean) => set({ show: val }),
  setDate: (val: string) => set({ date: val }),
  setLoading: (val: boolean) => set({ loading: val }),
}));

export default calendarStore;