import axios from 'axios';
import { reviews_list_data, reviews_list_delete, reviews_main_data } from '../../api';
import { config } from '../../token';
import { ListData, MainData } from '../../../types/review';
import toast from 'react-hot-toast';


export const fetchMainData = async (setMainData: (data: MainData) => void) => {
    try {
        const res = await axios.get(`${reviews_main_data}`, config)
        if (res.data.success) {
            setMainData(res.data.body);
        }
    } catch { }
};

export const fetchDataList = async (setDataList: (data: ListData[]) => void, page: number, size: number, setTotalPage: (data: number) => void) => {
    try {
        const res = await axios.get(`${reviews_list_data}?page=${page}&size=${size}`, config);
        if (res.data.success) {
            setDataList(res.data.body.object);
            setTotalPage(res.data.body.totalElements);
        }
    } catch { }
}

export const deleteListData = async (id: string | null, setDataList: (data: ListData[]) => void, page: number, size: number, setTotalPage: (totalPages: number) => void) => {
    try {
        await axios.delete(`${reviews_list_delete}/${id}`, config);
        if (id !== null) {
            toast.success('Review successfully deleted');
            fetchDataList(setDataList, page, size, setTotalPage);
        }
    } catch { }
};