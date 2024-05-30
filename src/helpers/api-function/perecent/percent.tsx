import axios from 'axios';
import { add_precent_list, precent_list } from '../../api.tsx';
import toast from 'react-hot-toast';
import { config } from '../../token.tsx';

interface Data {
  id: number;
  percent: string;
}

// get
export const fetchData = (setData: (data: Data[]) => void) => {
  axios.get(precent_list, config)
    .then((res) => {
      setData(res.data.body);
    })
    .catch((err) => {
      console.error(err);
    });
};

// add
export const addPercent = (percent: string, setData: (data: Data[]) => void) => {
  axios.post(add_precent_list, { percent }, config)
    .then((res) => {
      if (res.data.success === false) {
        toast('This value already exists', {
          icon: '⚠️'
        });
      } else {
        toast.success('Successfully added');
        fetchData(setData);
      }
    })
    .catch((err) => {
      console.error(err);
    });
};

// edit
export const editPercent = (changedTitle: string, editItemId: number | null, setData: (data: Data[]) => void, closeEditModal: () => void) => {
  const data = { percent: changedTitle };

  if (editItemId !== null && data.percent) {
    axios.put(`${precent_list}/${editItemId}`, data, config)
      .then(() => {
        fetchData(setData);
        closeEditModal();
      })
      .catch(err => console.log(err));
  }
};

//delete
export const deletePercent = (id: number | null, setData: (data: Data[]) => void) => {
  if (id) {
    axios.delete(`${precent_list}/${id}`, config)
      .then(() => {
        toast.success('Successfully deleted!');
        fetchData(setData);
      })
      .catch((err) => console.error(err));
  }
};