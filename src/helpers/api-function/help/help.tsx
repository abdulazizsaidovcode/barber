import axios from 'axios';
import { config } from '../../token.tsx';
import { HelpList } from '../../../types/help.ts';
import { help_url } from '../../api.tsx';

// get help lists all
export const getHelp = async (setData: (val: HelpList[]) => void, status: string) => {
  await axios.get(`${help_url}?HELP_STATUS=${status}`, config)
    .then(res => {
      if (res.data.success === true) setData(res.data.body);
      else setData([])
    })
    .catch(() => setData([]));
};