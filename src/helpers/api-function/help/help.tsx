import axios from 'axios';
import { config } from '../../token.tsx';
import { Attachments, HelpList } from '../../../types/help.ts';
import { deleteFile, help_url } from '../../api.tsx';
import toast from 'react-hot-toast';

// get help lists all
export const getHelp = async (setData: (val: HelpList[]) => void, status: string) => {
  await axios.get(`${help_url}/type?HELP_TYPE=${status}`, config)
    .then(res => {
      if (res.data.success === true) setData(res.data.body);
      else setData([]);
    })
    .catch((err) => {
      if (err?.response?.data?.success === false) console.log(err.response.data.message);
      setData([]);
    });
};

const isActive = (data: boolean) => {
  if (data) return false;
  else return true;
};

// update help isActive
export const updateIsActive = (data: HelpList, setDataAll: (val: HelpList[]) => void, statusHelp: string) => {
  function listsAttach(params: Attachments[]): string[] {
    return params.map(i => i.id);
  }

  let updateData = {
    helpStatus: 'string',
    text: data.text,
    attachmentList: data.attachments ? listsAttach(data.attachments) : [],
    active: isActive(data.active)
  };

  if (data.id) {
    axios.put(`${help_url}?id=${data.id}`, updateData, config)
      .then(() => {
        toast.success('Status updated is successfully!');
        getHelp(setDataAll, statusHelp);
      })
      .catch(() => toast.error('Error updating help status!'));
  } else console.log('error updating help status');
};

// update help
export const updateHelp = (data: HelpList, setDataAll: (val: HelpList[]) => void, statusHelp: string, modalVal: {
  text: string,
  active: boolean
}, setIsLoading: (val: boolean) => void, openIsModal: () => void) => {
  let updateData = {
    helpStatus: 'string',
    text: modalVal.text,
    attachmentList: data.attachmentList ? data.attachmentList : [],
    active: modalVal.active
  };

  if (data.id) {
    setIsLoading(true);
    axios.put(`${help_url}?id=${data.id}`, updateData, config)
      .then(() => {
        toast.success('Help updated is successfully!');
        getHelp(setDataAll, statusHelp);
        openIsModal();
        setIsLoading(false);
      })
      .catch(() => {
        toast.error('Error updating help!');
        setIsLoading(false);
        openIsModal();
      });
  } else {
    toast.error('Xatolik yuz berdi...');
    openIsModal();
  }
};

// update save button
export const updateSaveButtons = (filesList: string[], uploadFileID: number | string, setData: (val: HelpList[]) => void, status: string, setSelectedFilesDef: (val: any[]) => void) => {
  const data = {
    helpStatus: 'string',
    text: '',
    attachmentList: filesList,
    active: true
  };
  if (filesList && uploadFileID) {
    axios.put(`${help_url}?id=${uploadFileID}`, data, config)
      .then(res => {
        if (res.data.success) {
          getHelp(setData, status);
          setSelectedFilesDef([]);
          toast.success('Saved saved help files!');
        } else toast.error('Error updating help files!');
      })
      .catch(() => toast.error('Error updating help files!'));
  } else toast.error('Biron bir uzgarish qilinmagan!');
};

// delete file help
export const deleteHelpFile = (id: (string | number)[], setIsLoading: (val: boolean) => void, setData: (val: HelpList[]) => void, status: string, openModal: () => void) => {
  if (id.length > 0) {
    setIsLoading(true);
    axios.delete(`${deleteFile}${id[1]}/${id[0]}`, config)
      .then(res => {
        if (res.data.success) {
          setIsLoading(false);
          openModal();
          getHelp(setData, status);
          toast.success('File deleted successfully!');
        } else toast.error('Error deleting help status!');
      })
      .catch(() => {
        openModal();
        setIsLoading(false);
        toast.error('Error deleting the help file!');
      });
  } else toast.error('Error deleting the help file!');
};
