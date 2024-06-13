import axios from 'axios';
import { reviews_list_delete } from '../../api';
import { config } from '../../token';
import { ListData, MainData } from '../../../types/review';
import toast from 'react-hot-toast';

export const fetchMainData = async (setMainData: (data: MainData) => void, url: string) => {
  try {
    const res = await axios.get(url, config);
    if (res.data.success) {
      setMainData(res.data.body);
    }
  } catch (error) {
    console.error('Error fetching main data:', error);
  }
};

export const fetchDataList = async (setDataList: (data: ListData[]) => void, setTotalPage: (data: number) => void, url: string) => {
  try {
    const res = await axios.get(url, config);
    if (res.data.success) {
      setDataList(res.data.body.object);
      setTotalPage(res.data.body.totalElements);
    } else {
      setDataList([]);
    }
  } catch (error) {
    setDataList([]);
    console.error('Error fetching data list:', error);
  }
};

export const deleteListData = async (id: string | null, setDataList: (data: ListData[]) => void, setTotalPage: (totalPages: number) => void, url: string) => {
  try {
    await axios.delete(`${reviews_list_delete}/${id}`, config);
    if (id !== null) {
      toast.success('Review successfully deleted');
      fetchDataList(setDataList, setTotalPage, url);
    }
  } catch (error) {
    console.error('Error deleting review:', error);
  }
};
