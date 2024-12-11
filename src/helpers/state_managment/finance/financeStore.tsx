import { create } from 'zustand';

interface FinanceStore {
  data: Data | null;
  setData(data: Data | null): void;
  monthVal: string | null;
  setMonthVal(monthVal: string | null): void;
  yearVal: string | null;
  setYearVal(yearVal: string | null): void;
}

export interface Data {
  object: FinanceData[];
  addressName: string;
  nonCashTurnover: number;
  turnoverTotal: number;
  totalIncome: number;
}

export interface FinanceData {
  addressName: string,
  nonCashTurnover: number,
  turnoverTotal: number,
  totalIncome: number
}

const financeStore = create<FinanceStore>((set) => ({
  data: null,
  setData: (val: Data) => set({ data: val }),
  monthVal: null,
  setMonthVal: (val: string) => set({ monthVal: val }),
  yearVal: null,
  setYearVal: (val: string) => set({ yearVal: val }),
}));

export default financeStore;