import React, { useEffect, useState } from 'react';
import DefaultLayout from '../../layout/DefaultLayout';
import Accordion from '../../components/accordion/accordion';
import ServiceCategoriesCard from '../../components/settings/ServiceCategoriesCard';
import { FaPlus } from 'react-icons/fa6';
import axios from 'axios';
import { add_precent_list, precent_list } from '../../helpers/api';
import Modal from '../../components/modals/modal';
import toast, { Toaster } from 'react-hot-toast';
import { config } from '../../helpers/token';
interface Data {
  id: number;
  percent: string;
}

interface editData {
  percent: number;
}

const DirectoriesOnlineBooking: React.FC = () => {
  const [isInputOpen, setIsInputOpen] = useState(false);
  const [modalOpenId, setModalOpenId] = useState<number | null>(null);
  const [data, setData] = useState<Data[]>([]);
  const [newPercent, setNewPercent] = useState('');

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

  const toggleInput = () => {
    setIsInputOpen(!isInputOpen);
  };

  const editPercent = (id: any) => {
    let obj: editData = { "percent": 40 }
    axios.put(`${precent_list}/${id}`, obj, config)
      .then(res => console.log(res.data))
      .catch(err => console.error(err)
      )
  }

  const addPercent = (percent: string) => {
    axios.post(add_precent_list, { percent })
      .then((res) => {
        console.log(res.data.message);
        if (res.data.message === 'Already exists') {
          toast('This value already exists', {
            icon: '⚠️',
          });
        } else {
          toast.success('Successfully added')
        }
        getData()
      }).catch((err) => {
        console.error(err);
      });
  };

  const deletePercent = (id: number) => {
    axios.delete(`${precent_list}/${id}`)
      .then(() => {
        getData();
        toast.success('Successfully deleted!');
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
                        editOnClick={() => {
                          editPercent(item.id)
                          console.log(item.id);

                        }}
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
                      type='number'
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
        <Toaster
          position="top-center"
          reverseOrder={false}
        />
        <div role="status">
          <svg aria-hidden="true" className="inline w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-gray-600 dark:fill-gray-300" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
          </svg>
          <span className="sr-only">Loading...</span>
        </div>

      </DefaultLayout>
    </>
  );
}

export default DirectoriesOnlineBooking;