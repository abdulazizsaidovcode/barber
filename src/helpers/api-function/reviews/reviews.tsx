import axios from 'axios';
import { reviews_Confirm, reviews_list_delete } from '../../api';
import { config } from '../../token';
import { ListData, ListMasterData, MainData } from '../../../types/review';
import toast from 'react-hot-toast';
import { useTranslation } from 'react-i18next';
import { clearFunction } from '../../../common/clear-function/clear-function.tsx';

export const fetchMainData = async (setMainData: (data: MainData) => void, uri: string) => {
  try {
    const res = await axios.get(uri, config);
    if (res.data.success) {
      setMainData(res.data.body);
    }
  } catch {
    clearFunction();
  }
};
export const fetchDataList = async (setDataList: (data: ListData[]) => void, setTotalPage: (data: number) => void, url: string, setLoading: (val: boolean) => void) => {
  setLoading(true);
  try {
    const res = await axios.get(url, config);
    if (res.data.success) {
      setDataList(res.data.body.object);
      setTotalPage(res.data.body.totalElements);
      setLoading(false);
    } else {
      setDataList([]);
      clearFunction();
    }
  } catch {
    setDataList([]);
    setLoading(false);
    clearFunction();
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
      clearFunction();
    }
  } catch {
    clearFunction();
  }
};

export const deleteListData = async (id: string | null, setDataList: (data: ListData[]) => void, setTotalPage: (totalPages: number) => void, url: string, setLoading: (val: boolean) => void, closeDelModal: () => void) => {
  // const { t } = useTranslation()
  try {
    if (id) {
      const { data } = await axios.delete(`${reviews_list_delete}/${id}`, config);
      if (data.success) {
        // toast.success(t("Review_successfully_deleted"));
        toast.success('Review_successfully_deleted');
        fetchDataList(setDataList, setTotalPage, url, setLoading);
        closeDelModal();
      }
    }
  } catch {
    clearFunction();
  }
};

export const deleteMasterDataList = async (id: string, setMasterDataList: (data: ListMasterData[]) => void, url: string, setTotalMasterPage: (data: number) => void) => {
  const { t } = useTranslation();
  try {
    await axios.delete(`${reviews_list_delete}/${id}`, config);
    toast.success(t('Review_successfully_deleted'));
    await fetchMasterDataList(setMasterDataList, url, setTotalMasterPage);
  } catch {
    clearFunction();
  }
};