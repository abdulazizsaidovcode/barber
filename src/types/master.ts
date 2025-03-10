import { ReactNode } from 'react';

// data page tabs interface
export interface IMasterItems {
  key: string;
  label: JSX.Element;
  children: JSX.Element;
}

// master global table
export interface IMasterTableProps {
  thead: IThead[];
  children: ReactNode;
  px?: boolean;
}

// master global table thead lists
export interface IThead {
  id: number;
  name: string;
}

//master store types
export interface MasterData {
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
  category: CategoryChild[];
  setCategory: (val: CategoryChild[]) => void;
  isModal: boolean;
  setIsModal: (isModal: boolean) => void;
  isLoading: boolean;
  setIsLoading: (isLoading: boolean) => void;
  page: number;
  setPage: (val: number) => void;
  size: number,
  setSize: (val: number) => void;
  masterLoading: boolean;
  setMasterLoading: (val: boolean) => void;
}

export interface Data {
  id: string;
  imgId: string;
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

// region global interface
export interface RegionData {
  id: number;
  name: string;
}

// district global interface
export interface DistrictData {
  id: number;
  name: string;
  regionId: number | string;
}

// category child global interface
export interface CategoryChild {
  id: string;
  name: string;
  categoryFatherId: string;
  categoryFatherName: null | string;
  isNew: boolean;
}

// master filters global interface
export interface FilterTypes {
  searchValue: string;
  regionValue: string | null;
  cityValue: string | null;
  registrationPeriodValue: string | null | any;
  serviceCategoryValue: string | null;
  // reels two
  // scheduleTypeValue: string | null;
  tariffStatus: boolean | null | string;
  statusValue: string | null;
  placeOfWorkValue: string | null;
}