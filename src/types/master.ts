import { ReactNode } from 'react';

export interface IMasterItems {
  key: string;
  label: JSX.Element;
  children: JSX.Element;
}

export interface IMasterTableProps {
  thead: IThead[];
  children: ReactNode;
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
  specialization: string;
  clients: number;
  phoneNumber: string;
  placeOfWork: string;
  selfEmployed: string;
}