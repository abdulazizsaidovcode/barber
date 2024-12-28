import axios from 'axios';
import {
  child_category_list,
  district_url,
  master_url,
  region_url,
  update_master_status
} from '../../api.tsx';
import { config } from '../../token.tsx';
import {
  CategoryChild,
  Data,
  DistrictData,
  RegionData
} from '../../../types/master.ts';
import toast from 'react-hot-toast';
import { clearFunction } from '../../../common/clear-function/clear-function.tsx';

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
  setLoading?: (isLoading: boolean) => void;
}

export const getMasters = async (
  {
    fullName, regionId, districtId, startDate, endDate, categoryId,
    statusName, selfEmployed, workPlace, page, size, setData, setTotalPage,
    setLoading
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
    size ? `size=${size}` : ''
  ].filter(Boolean).join('&');

  setLoading && setLoading(true);

  try {
    const { data } = await axios.get(`${master_url}${master_get_url ? `?${master_get_url}` : ''}`, config);

    if (data.success === true) {
      setData(data.body.object);
      setTotalPage(data.body.totalElements);
    } else {
      setData([]);
      clearFunction();
    }
  } catch (err) {
    setData([]);
    clearFunction();
  } finally {
    setLoading && setLoading(false);
    clearFunction();
  }

  // axios.get(`${master_url}${master_get_url ? `?${master_get_url}` : ''}`, config).then((res) => {
  //   if (res.data.success === true) {
  //     setData(res.data.body.object);
  //     setTotalPage(res.data.body.totalElements);
  //   } else {
  //     setData([]);
  //     clearFunction();
  //   }
  // }).catch((err) => {
  //   setTotalPage(0);
  //   if (err.response) {
  //     if (err.response.status === 404) console.error('error');
  //     else
  //       console.error(
  //         `Error: ${err.response.status} - ${err.response.statusText}`
  //       );
  //   } else if (err.request) console.error('No response received');
  //   else console.error('Request setup error');
  //   setData([]);
  //   clearFunction();
  // });
};

export const getRegion = (setRegionData: (data: RegionData[]) => void) => {
  axios
    .get(region_url, config)
    .then((res) => {
      if (res.data.success === true) setRegionData(res.data.body);
      else {
        setRegionData([]);
        clearFunction();
      }
    })
    .catch(() => {
      setRegionData([]);
      clearFunction();
    });
};

export const getDistrict = (
  setDistrictData: (data: DistrictData[]) => void,
  districtId: number | string
) => {
  if (districtId) {
    axios
      .get(`${district_url}?regionId=${districtId}`, config)
      .then((res) => {
        if (res.data.success) setDistrictData(res.data.body);
        else {
          setDistrictData([]);
          clearFunction();
        }
      })
      .catch(() => {
        setDistrictData([]);
        clearFunction();
      });
  }
};

export const getCategory = (
  setCategoryChild: (data: CategoryChild[]) => void
) => {
  axios
    .get(child_category_list, config)
    .then((res) => {
      if (res.data.success) setCategoryChild(res.data.body);
      else {
        setCategoryChild([]);
        clearFunction();
      }
    })
    .catch(() => {
      setCategoryChild([]);
      clearFunction();
    });
};

export const updateStatusFunc = (
  masterId: string,
  status: string,
  setData: (val: Data[]) => void,
  setTotalPage: (val: number) => void,
  openIsModal: () => void,
  setIsLoading: (val: boolean) => void
) => {
  let data = { id: masterId, status };
  if (data.id && data.status) {
    setIsLoading(true);
    axios
      .put(update_master_status, data, config)
      .then((res) => {
        setIsLoading(false);
        if (res.data.success) {
          getMasters({ setData, setTotalPage });
          toast.success('Successfully update status');
          openIsModal();
        } else {
          toast.error('Serverda xatolik yuz berdi');
          openIsModal();
          clearFunction();
        }
      })
      .catch(() => {
        setIsLoading(false);
        toast.error('Error updating status!');
        openIsModal();
        clearFunction();
      });
  } else {
    toast.error('Error updating status');
    openIsModal();
    clearFunction();
  }
};
