// main help types
export interface HelpTypes {
  dataAll: HelpList[];
  setDataAll: (val: HelpList[]) => void;
  dataMaster: HelpList[];
  setDataMaster: (val: HelpList[]) => void;
  dataClient: HelpList[];
  setDataClient: (val: HelpList[]) => void;
  updateTextArea: HelpList | null
  setUpdateTextArea: (val: HelpList) => void;
  deleteFileId: string;
  setDeleteFileId: (val: string) => void;
}

// help list types
export interface HelpList {
  id: number;
  helpStatus: string;
  text: null | string;
  attachmentList: null | string | number;
  attachments: null | string | number | Attachments[];
  active: boolean;
}

export interface Attachments {
  id: string
  name: string
  size: number
}