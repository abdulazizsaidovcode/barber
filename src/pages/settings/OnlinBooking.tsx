import React, { useEffect, useState } from 'react';
import DefaultLayout from '../../layout/DefaultLayout';
import Accordion from '../../components/accordion/accordion';
import ServiceCategoriesCard from '../../components/settings/ServiceCategoriesCard';
import { FaPlus } from 'react-icons/fa6';
import axios from 'axios';
import { add_precent_list, precent_list } from '../../helpers/api';
import Modal from '../../components/modals/modal';
import toast from 'react-hot-toast';

interface Data {
  id: number;
  percent: string;
}

const DirectoriesOnlineBooking: React.FC = () => {
  const [isInputOpen, setIsInputOpen] = useState(false);
  const [modalOpenId, setModalOpenId] = useState<number | null>(null);
  const [data, setData] = useState<Data[]>([]);
  const [newPercent, setNewPercent] = useState('');

  const toggleInput = () => {
    setIsInputOpen(!isInputOpen);
  };

  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    axios.get(precent_list)
      .then((res) => {
        setData(res.data.body);
      }).catch((err) => {
        console.error(err);
      });
  };

  const addPercent = (percent: string) => {
    axios.post(add_precent_list, { percent })
      .then((res) => {
        console.log(res.data.message);
        toast.success('Successfully added!');
        getData();
      }).catch((err) => {
        console.error(err);
      });
  };

  const deletePercent = (id: number) => {
    axios.delete(`${precent_list}/${id}`)
      .then(() => {
        getData();
        alert('Successfully deleted!');
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const openModal = (id: number) => setModalOpenId(id);
  const closeModal = () => setModalOpenId(null);

  return (
    <>
      <DefaultLayout>
        <div>
          <p className='text-xl'>Онлайн бронирование</p>
          <div className='w-1/2 mt-5'>
            <Accordion title='Предоплата в процентах'>
              <div className='flex justify-between'>
                <div className='w-[75%]'>
                  {data.map(item => (
                    <div key={item.id}>
                      <ServiceCategoriesCard
                        title={`${item.percent}%`}
                        editOnClick={() => 'w'}
                        deleteOnClick={() => openModal(item.id)}
                      />
                      <Modal isOpen={modalOpenId === item.id} onClose={closeModal}>
                        <div className="w-[500px] h-[130px]">
                          <div className="flex justify-center">
                            <p className="text-xl text-black">Вы уверены что хоите удалить процедуру?</p>
                          </div>
                          <div className="flex justify-around mt-10">
                            <button onClick={() => {
                              deletePercent(item.id);
                              closeModal();
                            }} className="text-white bg-[#000] py-2 px-10">Удалить</button>
                            <button onClick={closeModal} className="text-white bg-gray py-2 px-14">Hет</button>
                          </div>
                        </div>
                      </Modal>
                    </div>
                  ))}
                </div>
                <div className='mt-5'>
                  <button
                    className='bg-[#eaeaea] text-black dark:text-white dark:bg-[#9C0A35] rounded-lg py-2 px-10'
                    onClick={toggleInput}
                  >
                    <FaPlus size={25} />
                  </button>
                </div>
              </div>
              <div className='mt-5'>
                {isInputOpen && (
                  <div className='flex gap-2'>
                    <input
                      type='text'
                      placeholder='Type something...'
                      className='dark:bg-[#60606d] w-[323px] border-black h-13 bg-[#f1f5f9] border-[1px] dark:border-white active:outline-none dark:bg-gray-800 dark:text-white rounded-md px-3'
                      onChange={(e) => setNewPercent(e.target.value)}
                    />
                    <button
                      className='bg-[#eaeaea] dark:bg-danger py-3 dark:text-white rounded-lg px-5'
                      onClick={() => {
                        addPercent(newPercent);
                        setNewPercent('');
                        setIsInputOpen(false);
                      }}
                    >
                      Добавить
                    </button>
                  </div>
                )}
              </div>
            </Accordion>
          </div>
        </div>
      </DefaultLayout>
    </>
  );
}

export default DirectoriesOnlineBooking;