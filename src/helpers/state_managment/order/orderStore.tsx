import { create } from "zustand";
import { Data } from "../../../types/order";
import { DistrictData, RegionData } from "../../../types/master";

export interface OrderData {
  data: Data[];
  setData: (data: Data[]) => void;
  totalPage: number;
  setTotalPage: (val: number) => void;
  statusO: string;
  setStatus: (val: string) => void
  regionData: RegionData[];
  setRegionData: (val: RegionData[]) => void;
  districtData: DistrictData[];
  setDistrictData: (val: DistrictData[]) => void;
}

const orderStore = create<OrderData>((set) => ({
  data: [],
  setData: (val: Data[]) => set({ data: val }),
  totalPage: 0,
  setTotalPage: (val: number) => set({ totalPage: val }),
  statusO: "UPCOMING",
  setStatus: (val: string) => set({ statusO: val }),
  regionData: [],
  setRegionData: (val: RegionData[]) => set({ regionData: val }),
  districtData: [],
  setDistrictData: (val: DistrictData []) => set({ districtData: val }),
}));

export default orderStore;
