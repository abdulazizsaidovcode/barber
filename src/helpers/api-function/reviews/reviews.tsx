// src/helpers/apiService.ts
import axios from 'axios';
import { reviews_list_data, reviews_main_data } from '../../api';
import { config } from '../../token';
import { ListData, MainData } from '../../../types/review';


export const fetchMainData = async (setMainData: (data: MainData) => void) => {
    try {
        const res = await axios.get(`${reviews_main_data}`, config)
        if (res.data.success) {
            setMainData(res.data.body);
        }
    } catch (error) {
        console.log(error);
    }
};

export const fetchDataList = async (setDataList: (data: ListData[]) => void, page: number, size: number,  setTotalPage: (data: number) => void) => {
    try {
        const res = await axios.get(`${reviews_list_data}?page=${page}&size=${size}`, config);
        if (res.data.success) {
            setDataList(res.data.body.object);
            setTotalPage(res.data.body.totalElements);
        }
    } catch (error) {
        console.log(error);
    }
}