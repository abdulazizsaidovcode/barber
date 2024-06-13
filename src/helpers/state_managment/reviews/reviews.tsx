import create from 'zustand';
import { ListData, MainData } from '../../../types/review';


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
}))

export default useReviewsStore;
