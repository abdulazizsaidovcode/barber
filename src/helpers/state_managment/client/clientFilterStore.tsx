import { create } from 'zustand';

interface ClientFilterData {
    clientFilterData: FilterData[];
    setClientFilterData: (data: FilterData[] | any) => void;
    totalPage: number;
    setClientTotalPage: (val: number) => void;
}

export interface FilterData {
    id: string;
    imgUrl: string | null;
    fullName: string;
    registrationDate: string | null;
    phoneNumber: string
    turnover: any
    status: string
    telegram: string | null,
    instagram: string | null
    completedOrder: string | null
    canceledOrder: number;
    masterCount: number
    firstName: string
    lastName: string
    birthDate: any
    gender: string
    age: number | null
    region: string
    district: string
}

const clientFilterStore = create<ClientFilterData>((set) => ({
    clientFilterData: [],
    setClientFilterData: (val: FilterData[]) => set({ clientFilterData: val }),
    totalPage: 0,
    setClientTotalPage: (val: number) => set({ totalPage: val })
}));

export default clientFilterStore;