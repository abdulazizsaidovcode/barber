import { create } from 'zustand';

interface Data {
    id: string;
    name: string;
    isEditModal: boolean;
    setEditModal: (isEdit: boolean) => void;

}

interface ServiceCategories {
    data: Data[];
    setData: (data: Data[]) => void;

}

const useServiceCategoriesStore = create<ServiceCategories>((set) => ({
    data: [],
    setData: (data: Data[]) => set({ data }),
    isEditModal: false,
    setEditModal: (val: boolean) => set({ isEditModal: val }),

}));

export default useServiceCategoriesStore;
