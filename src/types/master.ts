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