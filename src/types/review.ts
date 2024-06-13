export interface MainData {
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


export interface ListData {
    id: string
    count: number,
    masterId: null | string
    master: ReviewsMaster | null,
    clientId: null | string,
    client: ReviewsClient | null,
    serviceId: null | string,
    orderId: null | string,
    clientName: null | string,
    clientPhoto: null | string,
    text: string,
    date: string,
    favouriteStatusName: string
}

export interface ReviewsClient {
    id: string,
    firstName: string,
    lastName: string,
    phoneNumber: string,
    gender: string,
    birthDate: string,
    role: string,
    telegram: null | string,
    ageId: null | string,
    email: null | string,
    status: "ACTIVE",
    specialist: null | string,
    comment: null | string,
    attachmentId: null | string
}

export interface ReviewsMaster {
    id: string,
    firstName: string,
    lastName: string,
    phoneNumber: string,
    gender: string,
    birthDate: string,
    role: string,
    telegram: null | string,
    ageId: null | string,
    email: null | string,
    status: "ACTIVE",
    specialist: null | string,
    comment: null | string,
    attachmentId: null | string
}