import axios from "axios";
import { service_category_list } from "../../api";
import { config } from "@fullcalendar/core/internal";
import toast from "react-hot-toast";

interface Data {
    id: string;
    name: string;
}

// Fetch data
export const fetchData = (setData: (data: Data[]) => void) => {
    axios.get(service_category_list, config)
        .then((res) => {
            setData(res.data.body);
        })
        .catch((err) => {
            console.error(err);
            toast.error('Error fetching data');
        });
};