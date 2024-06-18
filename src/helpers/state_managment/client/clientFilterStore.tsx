import { create } from "zustand";
import { DistrictData, RegionData } from "../../../types/master";

interface ClientFilterData {
  clientFilterData: FilterData[];
  setClientFilterData: (data: FilterData[] | any) => void;
  totalPage: number;
  setClientTotalPage: (val: number) => void;
  regionData: RegionData[];
  setRegionData: (val: RegionData[]) => void;
  districtData: DistrictData[];
  setDistrictData: (val: DistrictData[]) => void;
  isModal: boolean;
  setIsModal: (isModal: boolean) => void;
  isMessageModal: boolean;
  setIsMessageModal: (isModal: boolean) => void;
  isLoading: boolean;
  setIsLoading: (isLoading: boolean) => void;
  page: number;
  setPage: (val: number) => void;
  message: string;
  setMessage: (isModal: string) => void;
  id: string;
  setid: (isModal: string) => void;
  size: number,
  setSize: (val: number) => void;
}

export interface FilterData {
  id: string;
  imgUrl: string | null;
  fullName: string;
  registrationDate: string | null;
  phoneNumber: string;
  turnover: any;
  status: string;
  telegram: string | null;
  instagram: string | null;
  completedOrder: string | null;
  canceledOrder: number;
  masterCount: number;
  firstName: string;
  lastName: string;
  birthDate: any;
  gender: string;
  age: number | null;
  region: string;
  district: string;
}

const clientFilterStore = create<ClientFilterData>((set) => ({
  clientFilterData: [],
  setClientFilterData: (val: FilterData[]) => set({ clientFilterData: val }),
  totalPage: 0,
  setClientTotalPage: (val: number) => set({ totalPage: val }),
  regionData: [],
  setRegionData: (val: RegionData[]) => set({ regionData: val }),
  districtData: [],
  setDistrictData: (val: DistrictData[]) => set({ districtData: val }),
  isModal: false,
  setIsModal: (val: boolean) => set({ isModal: val }),
  isMessageModal: false,
  setIsMessageModal: (val: boolean) => set({ isMessageModal: val }),
  isLoading: false,
  setIsLoading: (val: boolean) => set({ isLoading: val }),
  page: 0,
  setPage: (val: number) => set({ page: val }), 
  message: "",
  setMessage: (val: string) => set({ message: val }),
  id: "",
  setid: (val: string) => set({ id: val }),
  size: 10,
  setSize: (val: number) => set({ size: val }),
}));

export default clientFilterStore;
