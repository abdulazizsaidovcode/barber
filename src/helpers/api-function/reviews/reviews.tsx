import axios from 'axios';
import { reviews_list_delete } from '../../api';
import { config } from '../../token';
import { ListData, ListMasterData, MainData } from '../../../types/review';
import toast from 'react-hot-toast';

const handleApiError = (error: any) => {
  console.error(error);
};

export const fetchMainData = async (setMainData: (data: MainData) => void, url: string) => {
  try {
    const res = await axios.get(url, config);
    if (res.data.success) {
      setMainData(res.data.body);
    }
  } catch (error) {
    handleApiError(error);
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
    handleApiError(error);
    setDataList([]);
  }
};

export const fetchMasterDataList = async (setMasterDataList: (data: ListMasterData[]) => void, url: string) => {
  try {
    const res = await axios.get(url, config);
    if (res.data.success) {
      setMasterDataList(res.data.body.object);
    } else {
      setMasterDataList([]);
    }
  } catch (error) {
    handleApiError(error);
    setMasterDataList([]);
  }
};

export const deleteListData = async (id: string | null, setDataList: (data: ListData[]) => void, setTotalPage: (totalPages: number) => void, url: string) => {
  try {
    if (id) {
      await axios.delete(`${reviews_list_delete}/${id}`, config);
      toast.success('Review successfully deleted');
      await fetchDataList(setDataList, setTotalPage, url);
    }
  } catch (error) {
    handleApiError(error);
  }
};

export const deleteMasterDataList = async (id: string, setMasterDataList: (data: ListMasterData[]) => void, url: string) => {
  try {
    await axios.delete(`${reviews_list_delete}/${id}`, config);
    toast.success('Review successfully deleted');
    await fetchMasterDataList(setMasterDataList, url);
  } catch (error) {
    handleApiError(error);
  }
};