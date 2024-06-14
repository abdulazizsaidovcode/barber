import axios from 'axios';
import { config } from '../../token';
import { calendar_url, child_category_list } from '../../api';
import { CalendarData } from '../../state_managment/calendar/calendarStore';

interface Category {
  categoryFatherId: any;
  categoryFatherName: any;
  id: string;
  name: string;
  new: boolean;
}

interface ICalendar {
  localDate: string,
  endDate?: string,
  categoryId?: string,
  regionId?: number,
  districtId?: number,
  isMonth: boolean,
  setData: (val: CalendarData[]) => void
}

interface ResponseBody {
  success: boolean;
  body: Category[];
}

export const getCategoryId = (setCategory: (data: Category[]) => void) => {
  axios
    .get<ResponseBody>(child_category_list, config)
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

export const getCalendar = ({
 localDate,
 endDate,
 categoryId,
 regionId,
 districtId,
 isMonth,
 setData
}: ICalendar) => {
  let url = calendar_url;

  const params: { [key: string]: any } = {};

  if (localDate) params.localDate = localDate;
  if (endDate) params.endDate = endDate;
  if (categoryId) params.categoryId = categoryId;
  if (regionId !== 0) params.regionId = regionId;
  if (districtId !== 0) params.districtId = districtId;
  if (isMonth !== undefined) params.isMonth = isMonth;

  const queryString = new URLSearchParams(params).toString();

  if (queryString) {
    url = `${calendar_url}?${queryString}`;
  }
  axios
    .get(url, config)
    .then((res) => {
      if (res.data.success) {
        setData(res.data.body);
      } else {
        setData([])
      }
    })
    .catch(() => {
      setData([])
    });
  }