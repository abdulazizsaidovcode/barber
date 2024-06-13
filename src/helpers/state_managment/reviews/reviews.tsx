import create from 'zustand';
import { ListData, MainData } from '../../../types/review';

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

interface ReviewsStore {
  mainData: MainData;
  listData: ListData[];
  totalPage: number;
  currentPage: number;
  pageSize: number;
  isDelModal: boolean;
  setMainData: (data: MainData) => void;
  setDelModal: (isDel: boolean) => void;
  setListData: (data: ListData[]) => void;
  setTotalPage: (page: number) => void;
  setCurrentPage: (currentPage: number) => void;
  setPageSize: (size: number) => void;
  filterObj: FiltersReview;
  filters: FiltersReview;
  setFilters: (val: FiltersReview) => void;
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
    endDate: null,
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
  setFilters: (val: FiltersReview) => set({ filters: val }),
  listData: [],
  totalPage: 0,
  currentPage: 0,
  isDelModal: false,
  pageSize: 10,
  setMainData: (val: MainData) => set({ mainData: val }),
  setDelModal: (val: boolean) => set({ isDelModal: val }),
  setListData: (val: ListData[]) => set({ listData: val }),
  setTotalPage: (page: number) => set({ totalPage: page }),
  setPageSize: (size: number) => set({ pageSize: size }),
  setCurrentPage: (current: number) => set({ currentPage: current }),
}));

export default useReviewsStore;