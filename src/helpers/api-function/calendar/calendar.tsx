import axios from 'axios';
import { config } from '../../token';
import { calendar_url, service_category_list } from '../../api';

interface Category {
  categoryFatherId: any;
  categoryFatherName: any;
  id: string;
  name: string;
  new: boolean;
}

interface ResponseBody {
  success: boolean;
  body: Category[];
}

export const getCategoryId = (setCategory: (data: Category[]) => void) => {
  axios
    .get<ResponseBody>(service_category_list, config)
    .then((res) => {
      if (res.data.success) {
        setCategory(res.data.body);
      } else {
        console.log('Failed to fetch categories.');
      }
    })
    .catch((err) => {
      console.error('Error fetching categories:', err);
    });
};

export const getCalendar = (
  localDate?: string,
  endDate?: string,
  categoryId?: string,
  regionId?: number,
  districtId?: number,
  isMonth?: boolean
) => {
  let url = calendar_url;

  const params: { [key: string]: any } = {};

  if (localDate) params.localDate = localDate;
  if (endDate) params.endDate = endDate;
  if (categoryId) params.categoryId = categoryId;
  if (regionId !== undefined) params.regionId = regionId;
  if (districtId !== undefined) params.districtId = districtId;
  if (isMonth !== undefined) params.isMonth = isMonth;

  const queryString = new URLSearchParams(params).toString();

  if (queryString) {
    url = `${calendar_url}?${queryString}`;
  }
  console.log(url);
  

  // axios
  //   .get<ResponseBody>(url, config)
  //   .then((res) => {
  //     if (res.data.success) {
  //       console.log(res.data.body);
  //     } else {
  //       console.log('Failed to fetch categories.');
  //     }
  //   })
  //   .catch((err) => {
  //     console.error('Error fetching categories:', err);
  //   });
  }