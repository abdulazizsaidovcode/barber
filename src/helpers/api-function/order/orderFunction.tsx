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
    axios.get(`${get_orders_list}?status=${status}&${fullName ? `fullName=${fullName}&` : ''}${regionId ? `regionId=${regionId}&` : ''}${districtId ? `districtId=${districtId}&` : ''}${orderDate ? `orderDate=${orderDate}&` : ''}${categoryName ? `categoryName=${categoryName}&` : ''}${orderStatus ? `orderStatus=${orderStatus}&` : ''}${paymentType ? `paymentType=${paymentType}&` : ''}page=${page}&size=${size}`, config)
        .then(res => {
            if (res.data.success === true) {
                setData(res.data.body.object)
                setTotalPage(res.data.body.totalPage)
            } else setData([])
        })
        .catch(() => setData([]));
}

export function getChildCategory(setData: (val: CategoryChild[]) => void) {
    axios.get(`${Category_Child}`, config)
        .then(res => {
            if (res.data.success === true) {
                setData(res.data.body)
            } else setData([])
        })
        .catch(() => setData([]));
}

