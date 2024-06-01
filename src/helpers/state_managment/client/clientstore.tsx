import { create } from 'zustand';

interface ClientData {
    clientData: Data[];
    setData: (data: Data[]) => void;
    totalPage: number;
    setTotalPage: (val: number) => void;
}

export interface Data {
    id: string;
    imgUrl: string;
    fullName: string;
    serviceCategory: string[] | null;
    startedWork: string
    orderCount: number
    rating: number
    status: null | string,
    schedule: string
    canceled: number
    specialization: string[] | null;
    totalClient: number
    phoneNumber: string
    workPlace: string
    lat: number
    lng: number
}

const clientStore = create<ClientData>((set) => ({
    clientData: [],
    setData: (val: Data[]) => set({ clientData: val }),
    totalPage: 0,
    setTotalPage: (val: number) => set({ totalPage: val })
}));

export default clientStore;