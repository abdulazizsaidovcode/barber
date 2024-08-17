export interface SalonData {
    id: string;
    name: string;
    lat: number;
    lon: number;
    attachmentId: string;
}

export interface RequestsSalon {
    id: number,
    clientId: null,
    masterId: string,
    adminId: string
    message: string,
    title: string,
    masterFullName: string,
    phoneNumber: string,
    masterPhoto: string,
    messageStatus: string,
    sendDate: string,
    sendTime: string,
    isRead: boolean
}

export interface RequestMessage {
    title: string,
    message: string
}