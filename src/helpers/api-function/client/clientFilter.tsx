import axios from "axios";
import { getClients } from "./client";
import toast from "react-hot-toast";
import { client_update_status } from "../../api";
import { config } from "../../token";
import { FilterData } from "../../state_managment/client/clientFilterStore";

export const updateClientStatus = (clientId: string, status: string, setData: (val: FilterData[]) => void, setTotalPage: (val: number) => void, openIsModal: () => void, setIsLoading: (val: boolean) => void) => {
    let data = { clientId, status };
    if (data.clientId && data.status) {
      setIsLoading(true)
      axios.put(client_update_status, data, config)
        .then(res => {
          setIsLoading(false)
          if (res.data.success === true) {
            getClients({ setData: setData, setTotalPage: setTotalPage });
            toast.success('Successfully update status');
            openIsModal()
          } else {
            toast.error('Serverda xatolik yuz berdi')
            openIsModal()
          }
        })
        .catch(() => {
          setIsLoading(false)
          toast.error('Error updating status!')
          openIsModal()
        });
    } else {
      toast.error('Error updating status');
      openIsModal()
    }
  };