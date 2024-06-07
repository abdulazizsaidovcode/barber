import axios from 'axios';
import { child_category_list, district_url, master_url, region_url } from '../../api.tsx';
import { config } from '../../token.tsx';
import { CategoryChild, Data, DistrictData, RegionData } from '../../../types/master.ts';

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
      } else setData([])
    })
    .catch(() => setData([]));
};

export const getRegion = (setRegionData: (data: RegionData[]) => void) => {
  axios.get(region_url, config)
    .then(res => {
      if (res.data.success === true) setRegionData(res.data.body);
      else setRegionData([])
    })
    .catch(() => setRegionData([]));
};

export const getDistrict = (setDistrictData: (data: DistrictData[]) => void, districtId: number) => {
  if (districtId) {
    axios.get(`${district_url}?regionId=${districtId}`, config)
      .then(res => {
        if (res.data.success === true) setDistrictData(res.data.body)
        else setDistrictData([])
      })
      .catch(() => setDistrictData([]));
  }
};

export const getCategory = (setCategoryChild: (data: CategoryChild[]) => void) => {
  axios.get(child_category_list, config)
    .then(res => {
      if (res.data.success === true) setCategoryChild(res.data.body);
      else setCategoryChild([])
    })
    .catch(() => setCategoryChild([]));
};
