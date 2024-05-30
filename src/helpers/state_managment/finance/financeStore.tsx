import { create } from 'zustand';

interface FinanceStore {
  data: Data[];
  setData(data: Data[]): void;
}

interface Data {
  addressName: string;
  nonCashTurnover: number;
  turnoverTotal: number;
  totalIncome: number;
  mastersNumber: number;
  clientNumber: number;
}

const financeStore = create<FinanceStore>((set) => ({
  data: [],
  setData: (val: Data[]) => set({ data: val })
}));

export default financeStore;