// main help types
export interface HelpTypes {
  dataAll: HelpList[];
  setDataAll: (val: HelpList[]) => void;
  dataMaster: HelpList[];
  setDataMaster: (val: HelpList[]) => void;
  dataClient: HelpList[];
  setDataClient: (val: HelpList[]) => void;
  // oneHelp: HelpList | null
  // setOneHelp: (val: HelpList) => void;
  // switchStates: { [key: string]: boolean },
  // setSwitchStates: (val: { [key: string]: boolean }) => void
}

// help list types
export interface HelpList {
  id: number;
  helpStatus: string;
  text: null | string;
  attachmentList: null | string | number;
  attachments: null | string | number;
  active: boolean;
}