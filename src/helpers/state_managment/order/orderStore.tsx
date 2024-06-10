import { create } from "zustand";
import { Data } from "../../../types/order";

export interface OrderData {
  data: Data[];
  setData: (data: Data[]) => void;
  totalPage: number;
  setTotalPage: (val: number) => void;
  
}

const orderStore = create<OrderData>((set) => ({
  data: [],
  setData: (val: Data[]) => set({ data: val }),
  totalPage: 0,
  setTotalPage: (val: number) => set({ totalPage: val }),
}));

export default orderStore;
