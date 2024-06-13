import axios from "axios";
import { CategoryChild, Filter } from "../../../types/order";
import { Category_Child, get_orders_list } from "../../api";
import { config } from "../../token";

export async function getOrder({
    status,
    page = 0,
    size = 10,
    fullName,
    regionId,
    districtId,
    orderDate,
    categoryName,
    orderStatus,
    paymentType,
    setData,
    setTotalPage
}: Filter) {
    try {
        const res = await axios.get(`${get_orders_list}?status=${status}&${fullName ? `fullName=${fullName}&` : ''}${regionId ? `regionId=${regionId}&` : ''}${districtId ? `districtId=${districtId}&` : ''}${orderDate ? `orderDate=${orderDate}&` : ''}${categoryName ? `categoryName=${categoryName}&` : ''}${orderStatus ? `orderStatus=${orderStatus}&` : ''}${paymentType ? `paymentType=${paymentType}&` : ''}page=${page}&size=${size}`, config);
        
        if (res.data.success === true) {
            setData(res.data.body.object);
            setTotalPage(res.data.body.totalPage);
        } else {
            setData([]);
        }
    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.error(`Error fetching orders: ${error}, Status: ${error.response?.status}`);
        } else {
            console.error('Unexpected error:', error);
        }
        setData([]);
    }
}

export async function getChildCategory(setData: (val: CategoryChild[]) => void) {
    try {
        const res = await axios.get(`${Category_Child}`, config);
        
        if (res.data.success === true) {
            setData(res.data.body);
        } else {
            setData([]);
        }
    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.error(`Error fetching child categories: ${error}, Status: ${error.response?.status}`);
        } else {
            console.error('Unexpected error:', error);
        }
        setData([]);
    }
}
