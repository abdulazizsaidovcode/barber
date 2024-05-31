import axios from 'axios';
import { config } from '../../token';
import { service_category_list } from '../../api';

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
