import axios from 'axios';
import {
  child_category_list,
  district_url,
  master_url,
  region_url,
  update_master_status,
} from '../../api.tsx';
import { config } from '../../token.tsx';
import {
  CategoryChild,
  Data,
  DistrictData,
  RegionData,
} from '../../../types/master.ts';
import toast from 'react-hot-toast';

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
  page,
  size,
  setData,
  setTotalPage,
}: IMaster) => {
  const master_get_url = [
    fullName ? `fullName=${fullName}` : '',
    regionId ? `regionId=${regionId}` : '',
    districtId ? `districtId=${districtId}` : '',
    startDate ? `startDate=${startDate}` : '',
    endDate ? `endDate=${endDate}` : '',
    categoryId ? `categoryId=${categoryId}` : '',
    statusName ? `statusName=${statusName}` : '',
    selfEmployed ? `selfEmployed=${selfEmployed}` : '',
    workPlace ? `workPlace=${workPlace}` : '',
    page ? `page=${page}` : '',
    size ? `size=${size}` : '',
  ]
    .filter(Boolean)
    .join('&');

  axios
    .get(`${master_url}${master_get_url ? `?${master_get_url}` : ''}`, config)
    .then((res) => {
      if (res.data.success === true) {
        setData(res.data.body.object);
        setTotalPage(res.data.body.totalElements);
      } else setData([]);
    })
    .catch((err) => {
      if (err.response) {
        if (err.response.status === 404) console.error('error');
        else
          console.error(
            `Error: ${err.response.status} - ${err.response.statusText}`,
          );
      } else if (err.request) console.error('No response received');
      else console.error('Request setup error');
      setData([]);
    });
};

export const getRegion = (setRegionData: (data: RegionData[]) => void) => {
  axios
    .get(region_url, config)
    .then((res) => {
      if (res.data.success === true) setRegionData(res.data.body);
      else setRegionData([]);
    })
    .catch(() => setRegionData([]));
};

export const getDistrict = (
  setDistrictData: (data: DistrictData[]) => void,
  districtId: number | string,
) => {
  if (districtId) {
    axios
      .get(`${district_url}?regionId=${districtId}`, config)
      .then((res) => {
        if (res.data.success === true) setDistrictData(res.data.body);
        else setDistrictData([]);
      })
      .catch(() => setDistrictData([]));
  }
};

export const getCategory = (
  setCategoryChild: (data: CategoryChild[]) => void,
) => {
  axios
    .get(child_category_list, config)
    .then((res) => {
      if (res.data.success === true) setCategoryChild(res.data.body);
      else setCategoryChild([]);
    })
    .catch(() => setCategoryChild([]));
};

export const updateStatusFunc = (
  masterId: string,
  status: string,
  setData: (val: Data[]) => void,
  setTotalPage: (val: number) => void,
  openIsModal: () => void,
  setIsLoading: (val: boolean) => void,
) => {
  let data = { id: masterId, status };
  if (data.id && data.status) {
    setIsLoading(true);
    axios
      .put(update_master_status, data, config)
      .then((res) => {
        setIsLoading(false);
        if (res.data.success === true) {
          getMasters({ setData, setTotalPage });
          toast.success('Successfully update status');
          openIsModal();
        } else {
          toast.error('Serverda xatolik yuz berdi');
          openIsModal();
        }
      })
      .catch(() => {
        setIsLoading(false);
        toast.error('Error updating status!');
        openIsModal();
      });
  } else {
    toast.error('Error updating status');
    openIsModal();
  }
};
