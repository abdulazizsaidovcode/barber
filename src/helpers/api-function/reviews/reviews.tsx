import axios from 'axios';
import { reviews_list_delete } from '../../api';
import { config } from '../../token';
import { ListData, ListMasterData, MainData } from '../../../types/review';
import toast from 'react-hot-toast';

export const fetchMainData = async (setMainData: (data: MainData) => void, url: string) => {
  try {
    const res = await axios.get(url, config);
    if (res.data.success) {
      setMainData(res.data.body);
    }
  } catch {
    // Handle error
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
  } catch {
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
  } catch {
    setMasterDataList([]);
  }
};

export const deleteListData = async (id: string | null, setDataList: (data: ListData[]) => void, setTotalPage: (totalPages: number) => void, url: string) => {
  try {
    await axios.delete(`${reviews_list_delete}/${id}`, config);
    if (id !== null) {
      toast.success('Review successfully deleted');
      fetchDataList(setDataList, setTotalPage, url);
    }
  } catch {
    // Handle error
  }
};

export const deleteMasterDataList = async (id: string, setMasterDataList: (data: ListMasterData[]) => void, url: string) => {
  try {
    await axios.delete(`${reviews_list_delete}/${id}`, config);
    toast.success('Review successfully deleted');
    fetchMasterDataList(setMasterDataList, url);
  } catch {
    // Handle error
  }
};