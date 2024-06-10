import axios from 'axios';
import { config } from '../../token.tsx';
import { finance_list } from '../../api.tsx';
import { Data } from '../../state_managment/finance/financeStore.tsx';

export const getFinance = (month: string | null, year: number | null, setData: (data: Data[]) => void) => {
  axios.get(finance_list(month, year), config)
    .then(res => {
      setData(res.data.body);
    })
    .catch(err => console.log(err));
};