import { create } from 'zustand';
import { SalonData } from '../../../types/salon';

interface Salon {
  data: SalonData[],
  isEditModal: boolean;
  isAddModal: boolean;
  newSalonName: string;
  selectedLat: number | null;
  selectedLon: number | null;
  attachmentId: any;
  editSalonId: string | null;
  setData: (data: SalonData[]) => void;
  setEditModal: (isEdit: boolean) => void;
  setAddModal: (isEdit: boolean) => void;
  setNewSalonName: (newSalonName: string) => void;
  setSelectedLat: (lat: number | null) => void;
  setSelectedLon: (lon: number | null) => void;
  setAttachmentId: (attachmentId: any) => void;
  setEditSalonId: (id: string | null) => void;
}

const useSalonStore = create<Salon>((set) => ({
  data: [],
  isEditModal: false,
  isAddModal: false,
  newSalonName: '',
  selectedLat: null,
  selectedLon: null,
  attachmentId: null,
  editSalonId: null,
  setData: (val: SalonData[]) => set({ data: val }),
  setEditModal: (val: boolean) => set({ isEditModal: val }),
  setAddModal: (val: boolean) => set({ isAddModal: val }),
  setNewSalonName: (val: string) => set({ newSalonName: val }),
  setSelectedLat: (val: number | null) => set({ selectedLat: val }),
  setSelectedLon: (val: number | null) => set({ selectedLon: val }),
  setAttachmentId: (val: any) => set({ attachmentId: val }),
  setEditSalonId: (val: string | null) => set({ editSalonId: val }),
}));

export default useSalonStore;