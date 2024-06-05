import { create } from 'zustand';
import { CategoryChild, Data, DistrictData, FilterTypes, MasterData, RegionData } from '../../../types/master.ts';

const masterStore = create<MasterData>((set) => ({
  data: [],
  setData: (val: Data[]) => set({ data: val }),
  totalPage: 0,
  setTotalPage: (val: number) => set({ totalPage: val }),
  regionData: [],
  setRegionData: (val: RegionData[]) => set({ regionData: val }),
  districtData: [],
  setDistrictData: (val: DistrictData[]) => set({ districtData: val }),
  category: [],
  setCategory: (val: CategoryChild[]) => set({ category: val }),
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