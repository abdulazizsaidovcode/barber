import axios from 'axios';
import { add_precent_list, precent_list } from '../../api.tsx';
import toast from 'react-hot-toast';
import { config } from '../../token.tsx';
import { clearFunction } from '../../../common/clear-function/clear-function.tsx';

interface Data {
  id: number;
  percent: string;
}

// Fetch data
export const fetchData = (setData: (data: Data[]) => void) => {
  axios.get(precent_list, config)
    .then((res) => setData(res.data.body))
    .catch(() => clearFunction());
};

// Add percent
export const addPercent = (percent: string, setData: (data: Data[]) => void, toggleInput: () => void) => {
  const percentValue = parseFloat(percent);

  if (percentValue <= 0 || percentValue >= 100) {
    toast('Percent value must be between 0 and 100', { icon: '⚠️' });
  } else if (percent.length === 0) {
    toast('Bosh ma\'lumot qo\'shyapsz', { icon: '⚠️' });
  } else {
    axios.post(add_precent_list, { percent }, config)
      .then((res) => {
        if (!res.data.success) {
          toast('This percent already exits', { icon: '⚠️' });
        } else {
          toast.success('Successfully added');
          fetchData(setData);
          toggleInput();
          clearFunction()
        }
      })
      .catch(() => clearFunction());
  }
};

// Edit percent
export const editPercent = (changedTitle: string, editItemId: number | null, setData: (data: Data[]) => void, closeEditModal: () => void) => {
  const data = { percent: changedTitle };

  if (editItemId !== null && data.percent) {
    axios.put(`${precent_list}/${editItemId}`, data, config)
      .then((res) => {
        if (res.data.success) {
          fetchData(setData);
          closeEditModal();
          toast.success('Successfully edited');
        } else {
          toast('This percent already exists', {
            icon: '⚠️'
          });
          clearFunction()
        }
      })
      .catch(() => {
        toast('Failed to edit percent', {
          icon: '⚠️'
        });
        clearFunction()
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
      .catch(() => clearFunction());
  }
};
