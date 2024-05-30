import axios from 'axios';
import { add_precent_list, precent_list } from '../../api.tsx';
import toast from 'react-hot-toast';
import { config } from '../../token.tsx';

interface Data {
  id: number;
  percent: string;
}

// Fetch data
export const fetchData = (setData: (data: Data[]) => void) => {
  axios.get(precent_list, config)
    .then((res) => {
      setData(res.data.body);
    })
    .catch((err) => {
      console.error(err);
      toast.error('Error fetching data');
    });
};

// Add percent
export const addPercent = (percent: string, setData: (data: Data[]) => void, closeToggleInput: () => void) => {
  axios.post(add_precent_list, { percent }, config)
    .then((res) => {
      if (!res.data.success) {
        toast('Something went wrong', { icon: '⚠️' });
      } else {
        toast.success('Successfully added');
        fetchData(setData);
        closeToggleInput();
      }
    })
    .catch((err) => {
      console.error(err);
      toast.error('Error adding percent');
    });
};

// Edit percent
export const editPercent = (changedTitle: string, editItemId: number | null, setData: (data: Data[]) => void, closeEditModal: () => void) => {
  const data = { percent: changedTitle };

  if (editItemId !== null && data.percent) {
    axios.put(`${precent_list}/${editItemId}`, data, config)
      .then(() => {
        fetchData(setData);
        closeEditModal();
        toast.success('Successfully edited');
      })
      .catch(err => {
        console.error(err);
        toast.error('Error editing percent');
      });
  }
};

// Delete percent
export const deletePercent = (id: number | null, setData: (data: Data[]) => void) => {
  if (id !== null) {
    axios.delete(`${precent_list}/${id}`, config)
      .then(() => {
        toast.success('Successfully deleted!');
        fetchData(setData);
      })
      .catch((err) => {
        console.error(err);
        toast.error('Error deleting percent');
      });
  }
};
