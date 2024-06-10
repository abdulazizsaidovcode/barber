import axios from "axios";
import { Filter } from "../../../types/order";
import { get_orders_list } from "../../api";
import { config } from "../../token";

export async function getOrder({
    status,
    page = 0,
    size = 10,
    fullName,
    regionName,
    cityName,
    orderDate,
    categoryName,
    orderStatus,
    paymentType,
    setData,
    setTotalPage
}: Filter) {
    axios.get(`${get_orders_list}?status=${status}&${fullName ? `fullName=${fullName}&` : ''}${regionName ? `regionName=${regionName}&` : ''}${cityName ? `cityName=${cityName}&` : ''}${orderDate ? `orderDate=${orderDate}&` : ''}${categoryName ? `categoryName=${categoryName}&` : ''}${orderStatus ? `orderStatus=${orderStatus}&` : ''}${paymentType ? `paymentType=${paymentType}&` : ''}page=${page}&size=${size}`, config)
        .then(res => {
            if (res.data.success === true) {
                setData(res.data.body.object)
                setTotalPage(res.data.body.totalPage)
            } else setData([])
        })
        .catch(() => setData([]));
}