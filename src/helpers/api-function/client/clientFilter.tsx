import axios from 'axios';
import { getClients } from './client';
import toast from 'react-hot-toast';
import { client_send_message, client_update_status } from '../../api';
import { config } from '../../token';
import { FilterData } from '../../state_managment/client/clientFilterStore';
import { clearFunction } from '../../../common/clear-function/clear-function.tsx';

export const updateClientStatus = (
  id: string,
  status: string,
  setData: (val: FilterData[]) => void,
  setTotalPage: (val: number) => void,
  openIsModal: () => void,
  setIsLoading: (val: boolean) => void,
) => {
  let data = { id: id, status };

  if (data.id && data.status) {
    setIsLoading(true);
    axios
      .put(`${client_update_status}`, data, config)
      .then((res) => {
        setIsLoading(false);
        if (res.data.success === true) {
          getClients({ setData: setData, setTotalPage: setTotalPage });
          toast.success('Successfully update status');
          openIsModal();
        } else {
          toast.error('Serverda xatolik yuz berdi');
          // openIsModal()
          clearFunction()
        }
      })
      .catch(() => {
        setIsLoading(false);
        toast.error('Error updating status!');
        //   openIsModal()
        clearFunction()
      });
  } else {
    toast.error('Error updating status');
    //   openIsModal()
    clearFunction()
  }
};

export const handleSendMessage = async (
  id: string,
  message: string,
  closeSendModal: () => void,
) => {
  if (
    message.trim() === '' ||
    message === '/' ||
    message === '&' ||
    message === `""`
  ) {
    toast.error('Message cannot be empty');
    return;
  }

  try {
    await axios.post(
      client_send_message,
      {
        clientId: id,
        masterId: null,
        adminId: null,
        message: message,
        messageStatus: 'ADMIN_CLIENT_MESSAGE_FOR_WRITE',
        read: true,
      },
      config,
    );

    toast.success('Message sent successfully');
    closeSendModal();
  } catch (error) {
    toast.error('Failed to send message');
    clearFunction()
  }
};
