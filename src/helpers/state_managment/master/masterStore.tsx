import {create} from 'zustand'

interface MasterData {
  data: Data[],
  setData: (data: Data[]) => void
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

const masterStore = create<MasterData>((set) => ({
  data: [],
  setData: (val: Data[]) => set({data: val}),
}))

export default masterStore;