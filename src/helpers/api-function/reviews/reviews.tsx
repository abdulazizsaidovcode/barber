import axios from 'axios';
import { reviews_list_delete } from '../../api';
import { config } from '../../token';
import { ListData, ListMasterData, MainData } from '../../../types/review';
import toast from 'react-hot-toast';
import { useTranslation } from 'react-i18next';


export const fetchMainData = async (setMainData: (data: MainData) => void, url: string) => {
  try {
    const res = await axios.get(url, config);
    if (res.data.success) {
      setMainData(res.data.body);
    }
  } catch { }
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

export const fetchMasterDataList = async (setMasterDataList: (data: ListMasterData[]) => void, url: string, setTotalMasterPage: (data: number) => void) => {
  try {
    const res = await axios.get(url, config);
    if (res.data.success) {
      setMasterDataList(res.data.body.object);
      setTotalMasterPage(res.data.body.totalElements);
    } else {
      setMasterDataList([]);
    }
  } catch { }
};

export const deleteListData = async (id: string | null, setDataList: (data: ListData[]) => void, setTotalPage: (totalPages: number) => void, url: string) => {
  const { t } = useTranslation()
  try {
    if (id) {
      await axios.delete(`${reviews_list_delete}/${id}`, config);
      toast.success(t("Review_successfully_deleted"));
      await fetchDataList(setDataList, setTotalPage, url);
    }
  } catch { }
};

export const deleteMasterDataList = async (id: string, setMasterDataList: (data: ListMasterData[]) => void, url: string, setTotalMasterPage: (data: number) => void) => {
  const { t } = useTranslation()
  try {
    await axios.delete(`${reviews_list_delete}/${id}`, config);
    toast.success(t("Review_successfully_deleted"));
    await fetchMasterDataList(setMasterDataList, url, setTotalMasterPage);
  } catch { }
};