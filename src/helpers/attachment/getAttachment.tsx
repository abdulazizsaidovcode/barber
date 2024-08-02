import axios from "axios";
import { getFileId } from "../api";
import { config } from "../token";
import { clearFunction } from '../../common/clear-function/clear-function.tsx';

interface Data {
    id: string;
    setData: (val: string) => void;
}

export const getAttachment = async ({ id, setData }: Data) => {
    try {
        const response = await axios.get(`${getFileId}${id}`, config);
        setData(response.data.url); // `response.data.url` ni qaytardi
    } catch (error) {
        console.error("Error fetching attachment:", error);
        // Xatolikni qayta ishlash mumkin
        clearFunction()
    }
};
