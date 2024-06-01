import axios from 'axios';
import { master_url } from '../../api.tsx';
import { config } from '../../token.tsx';
import { Data, RegionData } from '../../state_managment/master/masterStore.tsx';

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
  setTotalPage: (val: number) => void;
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
                             setData,
                             setTotalPage
                           }: IMaster) => {
  axios.get(`${master_url}?${fullName ? `fullName=${fullName}&` : ''}${regionId ? `regionId=${regionId}&` : ''}${districtId ? `districtId=${districtId}&` : ''}${startDate ? `startDate=${startDate}&` : ''}${endDate ? `endDate=${endDate}&` : ''}${categoryId ? `categoryId=${categoryId}&` : ''}${statusName ? `statusName=${statusName}&` : ''}${selfEmployed ? `selfEmployed=${selfEmployed}&` : ''}${workPlace ? `workPlace=${workPlace}&` : ''}page=${page}&size=${size}`, config)
    .then(res => {
      if (res.data.success === true) {
        setData(res.data.body.object)
        setTotalPage(res.data.body.totalPage)
      }
    })
    .catch(() => 'error fetching master');
};

export const getRegion = (setRegionData: (data: RegionData[]) => void) => {
  axios.get(``, config)
    .then(res => setRegionData(res.data.body))
    .catch(() => 'Error fetching region data');
}
