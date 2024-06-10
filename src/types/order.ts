export interface Data {
  clientFullName: string;
  clientPhone: string;
  clientPhotoId: string;
  didNotStart: string[] | null;
  discount: number;
  masterFeedback: number;
  masterFullName: string;
  masterPhone: null | string;
  masterPhotoId: string | null;
  masterSpecialist: string[];
  orderDate: string[] | null;
  orderFrom: string;
  orderId: string;
  orderStatus: string;
  orderTo: string;
  paid: number;
  paymentTypes: [];
  prePayment: number;
  price: number | null;
  recordDurationTime: string | null;
  serviceName: string;
  serviceTime: string;
  toPay: number;
  whoCanceled: string | null;
}

export interface Filter {
  status: string;
  page?: number;
  size?: number;
  fullName?: string;
  regionName?: string;
  cityName?: string;
  orderDate?: string;
  categoryName?: string;
  orderStatus?: string;
  paymentType?: string;
  setData: (val: Data[]) => void;
  setTotalPage: (val: number) => void;
}

export interface OrderData {
    data: Data[];
    setData: (data: Data[]) => void;
    totalPage: number;
    setTotalPage: (val: number) => void;
}
