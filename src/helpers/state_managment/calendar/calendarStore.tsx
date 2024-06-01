import { create } from "zustand";

interface CategoryList {
  categoryFatherId: any;
  categoryFatherName: any;
  id: string;
  name: string;
  new: boolean;
}




interface CalendarStore {
  show: boolean;
  loading: boolean;
  date: string;
  category: CategoryList[];
  categoryId: string;
  setShow: (val: boolean) => void;
  setCategory: (val: CategoryList[]) => void;
  setCategoryId: (val: string) => void;
  setDate: (val: string) => void;
  setLoading: (val: boolean) => void;
}  

const calendarStore = create<CalendarStore>((set) => ({
  show: false,
  loading: false,
  category: [
    {
      categoryFatherId: null,
      categoryFatherName: null,
      id: "",
      name: "",
      new: true,
    },
  ],
  date: "",
  categoryId: "",
  setShow: (val: boolean) => set({ show: val }),
  setCategory: (val: CategoryList[]) => set({ category: val }),
  setCategoryId: (val: string) => set({ categoryId: val }),
  setDate: (val: string) => set({ date: val }),
  setLoading: (val: boolean) => set({ loading: val }),
}));

export default calendarStore;
