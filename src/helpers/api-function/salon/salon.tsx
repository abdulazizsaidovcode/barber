import axios from "axios";
import { config } from "../../token";
import { SalonData } from "../../../types/salon";
import { salon_list } from "../../api";
import toast from "react-hot-toast";

export const fetchData = async (setData: (data: SalonData[]) => void) => {
    try {
        const res = await axios.get(salon_list, config);
        setData(res.data.body);
    } catch { }
}

export const addData = async (setData: (data: SalonData[]) => void, name: string, lat: number, lon: number, attachmentId: any) => {
    const payload = { name, lat, lon, attachmentId };
    try {
        await axios.post(salon_list, payload, config);
        fetchData(setData);
    } catch (error) {
        console.error(error);
    }
}

export const editData = async (id: string, setData: (data: SalonData[]) => void, name: string, lat: number, lon: number, attachmentId: any) => {
    const payload = { name, lat, lon, attachmentId };
    try {
        const res = await axios.put(`${salon_list}/${id}`, payload, config);
        if (res.data.success) {
            toast.success('Salon edited succesfuly')
            fetchData(setData);
        } else {
            toast('Something error to edit salon')
        }
    } catch (error) {
        console.error(error);
    }
}