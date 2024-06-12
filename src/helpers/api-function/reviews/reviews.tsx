// src/helpers/apiService.ts
import axios from 'axios';
import { reviews_list_data, reviews_main_data } from '../../api';
import { config } from '../../token';

export const fetchMainData = async () => {
    try {
        const res = await axios.get(`${reviews_main_data}`, config);
        if (res.data.success) {
            return res.data.body;
        }
    } catch { }
};

export const fetchReviewsData = async () => {
    try {
        const res = await axios.get(`${reviews_list_data}`, config);
        if (res.data.success) {
            return res.data.body.object;
        }
    } catch { }
};
