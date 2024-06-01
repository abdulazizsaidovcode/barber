import { create } from 'zustand';

interface ClientData {
    clientData: Data[];
    setClientData: (data: Data[] | any) => void;
    totalPage: number;
    setClientTotalPage: (val: number) => void;
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
    setClientData: (val: Data[]) => set({ clientData: val }),
    totalPage: 0,
    setClientTotalPage: (val: number) => set({ totalPage: val })
}));

export default clientStore;