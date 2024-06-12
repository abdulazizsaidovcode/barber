import { create } from 'zustand';
import { HelpList, HelpTypes } from '../../../types/help.ts';

const financeStore = create<HelpTypes>((set) => ({
  dataAll: [],
  setDataAll: (val: HelpList[]) => set({ dataAll: val }),
  dataMaster: [],
  setDataMaster: (val: HelpList[]) => set({ dataMaster: val }),
  dataClient: [],
  setDataClient: (val: HelpList[]) => set({ dataClient: val }),
  updateTextArea: null,
  setUpdateTextArea: (val: HelpList) => set({ updateTextArea: val }),
  deleteFileId: [],
  setDeleteFileId: (val: (string | number)[]) => set({ deleteFileId: val }),
  uploadFileID: '',
  setUploadFileID: (val: string | number) => set({ uploadFileID: val }),
  filesList: [],
  setFilesLest: (val: string[]) => set({ filesList: val }),
  selectedFilesDef: [],
  setSelectedFilesDef: (val: any[]) => set({ selectedFilesDef: val }),
}));

export default financeStore;