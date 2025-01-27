// main help types

export interface HelpTypes {
  dataAll: HelpList[];
  setDataAll: (val: HelpList[]) => void;
  dataMaster: HelpList[];
  setDataMaster: (val: HelpList[]) => void;
  dataClient: HelpList[];
  setDataClient: (val: HelpList[]) => void;
  dataWeb: HelpList[];
  setDataWeb: (val: HelpList[]) => void;
  updateTextArea: HelpList | null;
  setUpdateTextArea: (val: HelpList) => void;
  deleteFileId: (string | number)[];
  setDeleteFileId: (val: (string | number)[]) => void;
  uploadFileID: string | number;
  setUploadFileID: (val: string | number) => void;
  filesList: string[];
  setFilesLest: (val: string[]) => void;
  selectedFilesDef: any[];
  setSelectedFilesDef: (selectedFiles: any[]) => void;
  helpRole: string;
  setHelpRole: (val: string) => void;
}

// help list types
export interface HelpList {
  id: number;
  helpStatus: string;
  text: string;
  attachmentList: null | string | number;
  attachments: null | string | number | Attachments[];
  active: boolean;
}

export interface Attachments {
  id: string;
  name: string;
  size: number;
}