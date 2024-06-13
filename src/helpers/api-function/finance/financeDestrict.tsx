// helpers/api-function/finance/financeDestrict.ts
import axios from 'axios';
import { config } from '../../token';
// import { finance_Destrictlist_Url } from '../../api';
import { Data } from '../../state_managment/finance/financeDestrictStore';
import { base_url } from '../../api';

export const getFinanceDestrict = (destrict: string, month: string | null, year: number | null, setData: (data: Data[]) => void) => {
  axios.get(finance_Destrictlist_Url(destrict, month, year), config)
    .then(res => {
      setData(res.data.body);
    })
    .catch(err => console.log(err));
};

export const finance_Destrictlist_Url = (destrict: string, month: string | null, year: number | null) => {
  let url = `${base_url}finance/web/${destrict}`;
  if (month && year) {
    url += `?month=${month}&year=${year}`;
  } else if (month) {
    url += `?month=${month}`;
  } else if (year) {
    url += `?year=${year}`;
  }

  return url;
};
