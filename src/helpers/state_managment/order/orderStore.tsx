import { create } from "zustand";
import { CategoryChild, Data } from "../../../types/order";
import { DistrictData, RegionData } from "../../../types/master";

export interface OrderData {
  data: Data[];
  setData: (data: Data[]) => void;
  orderDetail: Data | null;
  setOrderDetail: (orderDetail: Data) => void;
  childCategory: CategoryChild[];
  setChildCategoy: (data: CategoryChild[]) => void;
  totalPage: number;
  setTotalPage: (val: number) => void;
  statusO: string;
  setStatus: (val: string) => void
  regionData: RegionData[];
  setRegionData: (val: RegionData[]) => void;
  districtData: DistrictData[];
  setDistrictData: (val: DistrictData[]) => void;
  isLoading: boolean;
  setIsLoading: (isLoading: boolean) => void;
  page: number;
  setPage: (val: number) => void;
  isModal: boolean;
  setIsModal: (isModal: boolean) => void;
  isComplated: boolean;
  setIsComplated: (isComplated: boolean) => void;
  isDetail: boolean;
  setIsDetail: (isDetail: boolean) => void;
  message: string;
  setMessage: (isModal: string) => void;
}

const orderStore = create<OrderData>((set) => ({
  data: [],
  setData: (val: Data[]) => set({ data: val }),
  orderDetail: null,
  setOrderDetail: (val: Data) => set({ orderDetail: val }),
  childCategory: [],
  setChildCategoy: (val: CategoryChild[]) => set({ childCategory: val }),
  totalPage: 0,
  setTotalPage: (val: number) => set({ totalPage: val }),
  statusO: "UPCOMING",
  setStatus: (val: string) => set({ statusO: val }),
  regionData: [],
  setRegionData: (val: RegionData[]) => set({ regionData: val }),
  districtData: [],
  setDistrictData: (val: DistrictData []) => set({ districtData: val }),
  isLoading: false,
  setIsLoading: (val: boolean) => set({ isLoading: val }),
  page: 0,
  setPage: (val: number) => set({ page: val }), 
  isModal: false,
  setIsModal: (val: boolean) => set({ isModal: val }),
  isComplated: false,
  setIsComplated: (val: boolean) => set({ isComplated: val }),
  isDetail: true,
  setIsDetail: (val: boolean) => set({ isDetail: val }),
  message: "",
  setMessage: (val: string) => set({ message: val }),
}));

export default orderStore;
