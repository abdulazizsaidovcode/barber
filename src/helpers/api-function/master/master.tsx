import axios from 'axios';
import { master_url } from '../../api.tsx';
import { config } from '../../token.tsx';
import { Data } from '../../state_managment/master/masterStore.tsx';

interface IMaster {
  fullName?: string;
  regionId?: string;
  districtId?: string;
  startDate?: string;
  endDate?: string;
  categoryId?: string;
  statusName?: string;
  selfEmployed?: boolean;
  workPlace?: string;
  page?: number;
  size?: number;
  setData: (val: Data[]) => void;
}

export const getMasters = ({
                             fullName,
                             regionId,
                             districtId,
                             startDate,
                             endDate,
                             categoryId,
                             statusName,
                             selfEmployed,
                             workPlace,
                             page = 0,
                             size = 10,
                             // setData
                           }: IMaster) => {
  axios.get(`${master_url}?${fullName ? `fullName=${fullName}&` : ''}${regionId ? `regionId=${regionId}&` : ''}${districtId ? `districtId=${districtId}&` : ''}${startDate ? `startDate=${startDate}&` : ''}${endDate ? `endDate=${endDate}&` : ''}${categoryId ? `categoryId=${categoryId}&` : ''}${statusName ? `statusName=${statusName}&` : ''}${selfEmployed ? `selfEmployed=${selfEmployed}&` : ''}${workPlace ? `workPlace=${workPlace}&` : ''}page=${page}&size=${size}`, config)
    .then(res => {
      console.log(res.data);
      // setData(res.data)
    })
    .catch(err => console.log(err));
};