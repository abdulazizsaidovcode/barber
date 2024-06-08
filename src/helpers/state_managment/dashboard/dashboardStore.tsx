import { create } from 'zustand';

interface DashboardStore {
    data: Data[];
    setData: (data: Data[]) => void;
}

export interface Data {
    masterCount: number;
    clientCount: number;
    orderCount: number;
    clientCanselOrder: number;
    masterCanselOrder: number;
    totalTurnover: number;
    income: number;
    customerDissatisfaction: number;
    masterDissatisfaction: number;
    masterAverageClient: number;
    theOutgoingMaster: number;
    theOutgoingClient: number;
    positiveFeedbackInService: number;
    negativeFeedbackInService: number;
}

const dashboardStore = create<DashboardStore>((set) => ({
    data: [],
    setData: (val: Data[]) => set({ data: val })
}));

export default dashboardStore;
