import { create } from 'zustand';

interface Data {
    id: string;
    name: string;
}

interface ServiceCategories {
    data: Data[];
    setData: (data: Data[]) => void;
    isEditModal: boolean;
    setEditModal: (isEdit: boolean) => void;
}

const useServiceCategoriesStore = create<ServiceCategories>((set) => ({
    data: [],
    setData: (data: Data[]) => set({ data }),
    isEditModal: false,
    setEditModal: (isEditModal: boolean) => set({ isEditModal }),
}));

export default useServiceCategoriesStore;
