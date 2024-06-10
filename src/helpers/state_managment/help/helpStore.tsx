import { create } from 'zustand';
import { HelpList, HelpTypes } from '../../../types/help.ts';

const financeStore = create<HelpTypes>((set) => ({
  dataAll: [],
  setDataAll: (val: HelpList[]) => set({ dataAll: val }),
  dataMaster: [],
  setDataMaster: (val: HelpList[]) => set({ dataMaster: val }),
  dataClient: [],
  setDataClient: (val: HelpList[]) => set({ dataClient: val }),
  // oneHelp: null,
  // setOneHelp: (val: HelpList) => set({ oneHelp: val }),
  // switchStates: {},
  // setSwitchStates: (val: { [key: string]: boolean }) => set({ switchStates: val })
}));

export default financeStore;