import { create } from 'zustand';

interface MasterData {
  data: Data[];
  setData: (data: Data[]) => void;
  totalPage: number;
  setTotalPage: (val: number) => void;
  regionData: RegionData[];
  setRegionData: (val: RegionData[]) => void;
  districtData: DistrictData[];
  setDistrictData: (val: DistrictData[]) => void;
  filterObj: FilterTypes;
  filters: FilterTypes;
  setFilters: (filters: FilterTypes) => void;
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

export interface RegionData {
  id: number;
  name: string;
}

export interface DistrictData {
  id: number;
  name: string;
  regionId: number;
}

export interface FilterTypes {
  searchValue: string;
  regionValue: string | null;
  cityValue: string | null;
  registrationPeriodValue: string | null;
  serviceCategoryValue: string | null;
  scheduleTypeValue: string | null;
  selfEmployedStatusValue: boolean | null;
  statusValue: string | null;
  placeOfWorkValue: string | null;
}

const masterStore = create<MasterData>((set) => ({
  data: [],
  setData: (val: Data[]) => set({ data: val }),
  totalPage: 0,
  setTotalPage: (val: number) => set({ totalPage: val }),
  regionData: [],
  setRegionData: (val: RegionData[]) => set({ regionData: val }),
  districtData: [],
  setDistrictData: (val: DistrictData[]) => set({ districtData: val }),
  // default filters
  filterObj: {
    searchValue: '', //Поиск по ФИО
    regionValue: null, //Регион
    cityValue: null, //Город
    registrationPeriodValue: null, // false => Период регистраци мастеров
    serviceCategoryValue: null, // false => Категория услуг
    scheduleTypeValue: null, // false => Тип расписания
    selfEmployedStatusValue: null, //Статус самозанятых
    statusValue: null, //Статус
    placeOfWorkValue: null //Место работы
  },
  // update filters
  filters: {
    searchValue: '',
    regionValue: null,
    cityValue: null,
    registrationPeriodValue: null,
    serviceCategoryValue: null,
    scheduleTypeValue: null,
    selfEmployedStatusValue: null,
    statusValue: null,
    placeOfWorkValue: null
  },
  setFilters: (val: FilterTypes) => set({filters: val})
}));

export default masterStore;