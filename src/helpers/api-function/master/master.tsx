import axios from 'axios';
import { district_url, master_url, region_url } from '../../api.tsx';
import { config } from '../../token.tsx';
import { Data, DistrictData, RegionData } from '../../state_managment/master/masterStore.tsx';

interface IMaster {
  fullName?: string;
  regionId?: string;
  districtId?: string;
  startDate?: string;
  endDate?: string;
  categoryId?: string;
  statusName?: string;
  selfEmployed?: boolean | string;
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
        setData(res.data.body.object);
        setTotalPage(res.data.body.totalPage);
      }
    })
    .catch(() => console.log('error fetching master'));
};

export const getRegion = (setRegionData: (data: RegionData[]) => void) => {
  axios.get(region_url, config)
    .then(res => {
      // console.log(res);
      setRegionData(res.data.body);
    })
    .catch(() => console.log('Error fetching region'));
};

export const getDistrict = (setDistrictData: (data: DistrictData[]) => void, districtId: number) => {
  if (districtId) {
    axios.get(`${district_url}/${districtId}`, config)
      .then(res => {
        console.log(res);
        setDistrictData(res.data.body);
      })
      .catch(() => console.log('error fetching district'));
  }
};

export const getCategory = (setCategory: (data: string) => void) => {
  axios.get(``, config)
    .then(res => {
      console.log(res);
      if (res.data.success === true) setCategory(res.data.body);
      else console.log('then and error fetching category');
    })
    .catch(() => console.log('catch and error fetching category'));
};
