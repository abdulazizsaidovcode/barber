import { create } from 'zustand';
import { DistrictData, RegionData } from '../../../types/master';

interface ClientFilterData {
    clientFilterData: FilterData[];
    setClientFilterData: (data: FilterData[] | any) => void;
    totalPage: number;
    setClientTotalPage: (val: number) => void;
    regionData: RegionData[];
  setRegionData: (val: RegionData[]) => void;
  districtData: DistrictData[];
  setDistrictData: (val: DistrictData[]) => void;
   
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
    setClientTotalPage: (val: number) => set({ totalPage: val }),
    regionData: [],
    setRegionData: (val: RegionData[]) => set({ regionData: val }),
    districtData: [],
    setDistrictData: (val: DistrictData[]) => set({ districtData: val }),
}));

export default clientFilterStore;