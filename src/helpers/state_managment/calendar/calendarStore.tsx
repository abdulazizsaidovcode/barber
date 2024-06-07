import { create } from "zustand";
import { CategoryChild, DistrictData, RegionData } from "../../../types/master";

interface CategoryList {
  categoryFatherId: string | null;
  categoryFatherName: string | null;
  id: string;
  name: string;
  new: boolean;
}

export interface CalendarData {
  canceledOrders?: number | null;
  completedOrders?: number | null;
  date: string | null;
  dayOfWeek: string | null;
  pendingOrders?: number | null;
  toBeConfirmedOrders?: number | null;
  time?: string | null
}

interface CalendarStore {
  show: boolean;
  loading: boolean;
  date: string;
  category: CategoryList[];
  categoryId: string;
  calendarData: CalendarData[];
  setShow: (val: boolean) => void;
  setCategory: (val: CategoryList[]) => void;
  setCategoryId: (val: string) => void;
  setDate: (val: string) => void;
  setLoading: (val: boolean) => void;
  setCalendarData: (val: CalendarData[]) => void;
  regionData: RegionData[];
  setRegionData: (val: RegionData[]) => void;
  districtData: DistrictData[];
  setDistrictData: (val: DistrictData[]) => void;
}

const calendarStore = create<CalendarStore>((set) => ({
  show: false,
  loading: false,
  calendarData: [
    {
      canceledOrders: 0,
      completedOrders: 0,
      pendingOrders: 0,
      toBeConfirmedOrders: 0,
      date: "",
      dayOfWeek: "",
      time: null,
    },
  ],
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
  setCalendarData: (val: CalendarData[]) => set({ calendarData: val }),
  districtData: [],
  setDistrictData: (val: DistrictData[]) => set({ districtData: val }),
  regionData: [],
  setRegionData: (val: RegionData[]) => set({ regionData: val }),
}));

export default calendarStore;
