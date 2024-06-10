import { create } from 'zustand';

interface FinanceDestrictStore {
  data: Data[];
  setData(data: Data[]): void;
  monthVal: string | null;
  setMonthVal(monthVal: string | null): void;
  yearVal: number | null;
  setYearVal(yearVal: number | null): void;
}

export interface Data {
  // object: any;
  addressName: string;
  nonCashTurnover: number;
  turnoverTotal: number;
  totalIncome: number;
}

const financeDestrictStore = create<FinanceDestrictStore>((set) => ({
  data: [],
  setData: (val: Data[]) => set({ data: val }),
  monthVal: null,
  setMonthVal: (val: string) => set({ monthVal: val }),
  yearVal: null,
  setYearVal: (val: number) => set({ yearVal: val }),
}));

export default financeDestrictStore;