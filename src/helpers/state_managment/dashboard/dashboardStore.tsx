import { create } from 'zustand';

interface Data {
  masterCount?: number;
  clientCount?: number;
  orderCount?: number;
  clientCanselOrder?: number;
  masterCanselOrder?: number;
  totalTurnover?: number;
  income?: number;
  customerDissatisfaction?: number;
  masterDissatisfaction?: number;
  masterAverageClient?: number;
}

const dashboardStore = create<{
  data: Data;
  setData: (val: Data[] | Data) => void;
}>((set) => ({
  data: {},
  setData: (val) => set({ data: Array.isArray(val) ? val[0] : val }),
}));

export default dashboardStore;
