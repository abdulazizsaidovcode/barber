import { create } from 'zustand';

interface FinanceStore {
  data: Data[];
  setData(data: Data[]): void;
  monthVal: string | null;
  setMonthVal(monthVal: string | null): void;
  yearVal: number | null;
  setYearVal(yearVal: number | null): void;
}

export interface Data {
  addressName: string;
  nonCashTurnover: number;
  turnoverTotal: number;
  totalIncome: number;
  mastersNumber: number;
  clientNumber: number;
}

const financeStore = create<FinanceStore>((set) => ({
  data: [],
  setData: (val: Data[]) => set({ data: val }),
  monthVal: null,
  setMonthVal: (val: string) => set({ monthVal: val }),
  yearVal: null,
  setYearVal: (val: number) => set({ yearVal: val }),
}));

export default financeStore;