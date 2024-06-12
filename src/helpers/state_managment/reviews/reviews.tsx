import create from 'zustand';

interface MainData {
  allAverageFeedback: number;
  allReviewsCount: number;
  clientAverageFeedback: number;
  clientReviewsCount: number;
  femaleClientCount: number;
  femaleClientFeedback: number;
  femaleMasterCount: number;
  femaleMasterFeedback: number;
  fiveStarFeedbackCount: number;
  fourStarFeedbackCount: number;
  maleClientCount: number;
  maleClientFeedback: number;
  maleMasterCount: number;
  maleMasterFeedback: number;
  masterAverageFeedback: number;
  masterReviewsCount: number;
  oneStarFeedbackCount: number;
  threeStarFeedbackCount: number;
  twoStarFeedbackCount: number;
}

interface ReviewsStore {
  mainData: MainData;
  reviewsData: any[];
  setMainData: (mainData: MainData) => void;
  setReviewsData: (reviewsData: any[]) => void;
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
  reviewsData: [],
  setMainData: (mainData) => set({ mainData }),
  setReviewsData: (reviewsData) => set({ reviewsData }),
}));

export default useReviewsStore;
