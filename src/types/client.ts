// src/types/client.ts

export interface IClientTableProps {
  thead: IThead[];
  children: React.ReactNode;
}

export interface IThead {
  id: number;
  name: string;
}

export interface ITbody {
  id: number;
  img: string;
  name: string;
  category: string;
  invoiceDate: string;
  totalSessions: number;
  rating: number;
  status: string;
  scheduleType: string;
  canceled: number;
  preferences: string;
  contacts: string;
  phoneNumber: string;
  placeOfWork: string;
  selfEmployed: string;
}

export interface IClientItems {
  key: string;
  label: React.ReactNode;
  children: React.ReactNode;
}
