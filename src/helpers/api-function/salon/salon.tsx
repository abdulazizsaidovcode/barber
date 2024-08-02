import axios from "axios";
import { config } from "../../token";
import { SalonData } from "../../../types/salon";
import { salon_list } from "../../api";
import toast from "react-hot-toast";
import { clearFunction } from '../../../common/clear-function/clear-function.tsx';

export const fetchData = async (setData: (data: SalonData[]) => void) => {
    try {
        const res = await axios.get(salon_list, config);
        setData(res.data.body);
    } catch (error) {
        console.error(error);
        clearFunction()
    }
};

export const handleAddSalon = async (
    setData: (data: SalonData[]) => void,
    newSalonName: string,
    selectedLat: number | null,
    selectedLon: number | null,
    attachmentId: any,
    closeAddModal: () => void
) => {
    if (newSalonName && selectedLat !== null && selectedLon !== null) {
        const payload = { name: newSalonName, lat: selectedLat, lon: selectedLon, attachmentId };
        try {
            const res = await axios.post(salon_list, payload, config);
            if (res.data.success) {
                fetchData(setData);
                closeAddModal();
            } else {
                toast("Something went wrong while adding the salon", { icon: '⚠️' });
                clearFunction()
            }
        } catch (error) {
            console.error(error);
            clearFunction()
        }
    } else {
        toast("Please enter the salon name and select a location on the map.", {
            icon: '⚠️'
        });
        clearFunction()
    }
};

export const handleEditSalon = async (
    id: string | null,
    setData: (data: SalonData[]) => void,
    newSalonName: string,
    selectedLat: number | null,
    selectedLon: number | null,
    attachmentId: any,
    closeEditModal: () => void
) => {
    if (id && newSalonName && selectedLat !== null && selectedLon !== null) {
        const payload = { name: newSalonName, lat: selectedLat, lon: selectedLon, attachmentId };
        try {
            const res = await axios.put(`${salon_list}/${id}`, payload, config);
            if (res.data.success) {
                toast.success("Salon edited successfully");
                fetchData(setData);
                closeEditModal();
            } else {
                toast("Something went wrong while editing the salon");
                clearFunction()
            }
        } catch (error) {
            console.error(error);
            clearFunction()
        }
    } else {
        toast("Please enter the salon name and select a location on the map.", {
            icon: '⚠️'
        });
        clearFunction()
    }
};