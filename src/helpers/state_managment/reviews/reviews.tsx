import { create } from 'zustand';
import { ListData, ListMasterData, MainData } from '../../../types/review';

interface FiltersReview {
  firstNameOrLastName: string;
  GENDER: string | null;
  regionId: string | null;
  districtId: string | null;
  rating: string | null | number;
  MASTER_OR_CLIENT: string | null;
  date: string | null | any;
  startDate: string | null | any;
  endDate: string | null | any;
}

interface MasterFiltersReview {
  firstNameOrLastName: string;
  regionId: string | null;
  districtId: string | null;
  startRating: string | null | number;
  endRating: string | null | number;
  combinedRating: string | null;
  date: string | null | any;
  startDate: string | null | any;
  endDate: string | null | any;
}

interface ReviewsStore {
  mainData: MainData;
  listData: ListData[];
  listMasterData: ListMasterData[];
  totalPage: number;
  currentPage: number;
  pageSize: number;
  totalMasterPage: number;
  currentMasterPage: number;
  pageMasterSize: number;
  isDelModal: boolean;
  filters: FiltersReview;
  masterFilters: MasterFiltersReview;
  filterObj: FiltersReview;
  setMainData: (data: MainData) => void;
  setDelModal: (isDel: boolean) => void;
  setListData: (data: ListData[]) => void;
  setListMasterData: (data: ListMasterData[]) => void;
  setTotalPage: (page: number) => void;
  setCurrentPage: (currentPage: number) => void;
  setPageSize: (size: number) => void;
  setMasterTotalPage: (page: number) => void;
  setMasterCurrentPage: (currentPage: number) => void;
  setMasterPageSize: (size: number) => void;
  setFilters: (val: FiltersReview) => void;
  setMasterFilters: (val: MasterFiltersReview) => void;
}

const useReviewsStore = create<ReviewsStore>((set) => ({
  mainData: {
    allAverageFeedback: 0,
    allReviewsCount: 0,
    clientAverageFeedback: 0,
    clientReviewsCount: 0,
    femaleClientCount: 0,
    femaleClientFeedback: 0,
    femaleMasterCount: 0,
    femaleMasterFeedback: 0,
    fiveStarFeedbackCount: 0,
    fourStarFeedbackCount: 0,
    maleClientCount: 0,
    maleClientFeedback: 0,
    maleMasterCount: 0,
    maleMasterFeedback: 0,
    masterAverageFeedback: 0,
    masterReviewsCount: 0,
    oneStarFeedbackCount: 0,
    threeStarFeedbackCount: 0,
    twoStarFeedbackCount: 0,
  },
  filterObj: {
    firstNameOrLastName: '',
    GENDER: null,
    regionId: null,
    districtId: null,
    rating: null,
    MASTER_OR_CLIENT: null,
    date: null,
    startDate: null,
    endDate: null
  },
  filters: {
    firstNameOrLastName: '',
    GENDER: null,
    regionId: null,
    districtId: null,
    rating: null,
    MASTER_OR_CLIENT: null,
    date: null,
    startDate: null,
    endDate: null,
  },
  masterFilters: {
    firstNameOrLastName: '',
    regionId: null,
    districtId: null,
    startRating: null,
    endRating: null,
    combinedRating: null,
    date: null,
    startDate: null,
    endDate: null,
  },
  setFilters: (val: FiltersReview) => set({ filters: val }),
  setMasterFilters: (val: MasterFiltersReview) => set({ masterFilters: val }),
  listData: [],
  listMasterData: [],
  totalPage: 0,
  currentPage: 0,
  totalMasterPage: 0,
  currentMasterPage: 0,
  isDelModal: false,
  pageSize: 10,
  pageMasterSize: 10,
  setMainData: (val: MainData) => set({ mainData: val }),
  setDelModal: (val: boolean) => set({ isDelModal: val }),
  setListData: (val: ListData[]) => set({ listData: val }),
  setListMasterData: (val: ListMasterData[]) => set({ listMasterData: val }),
  setTotalPage: (page: number) => set({ totalPage: page }),
  setPageSize: (size: number) => set({ pageSize: size }),
  setCurrentPage: (current: number) => set({ currentPage: current }),
  setMasterTotalPage: (page: number) => set({ totalMasterPage: page }),
  setMasterPageSize: (size: number) => set({ pageMasterSize: size }),
  setMasterCurrentPage: (current: number) => set({ currentMasterPage: current }),
}));

export default useReviewsStore;