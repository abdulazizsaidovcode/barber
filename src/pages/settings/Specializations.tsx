import React, { useEffect, useState } from 'react';
import DefaultLayout from '../../layout/DefaultLayout';
import Accordion from '../../components/accordion/accordion';
import { FaPlus } from 'react-icons/fa';
import Modal from '../../components/modals/modal';
import axios from 'axios';
import { service_category_list } from '../../helpers/api';
import { config } from '../../helpers/token';
import toast from 'react-hot-toast';
import ServiceCategoriesCard from '../../components/settings/details/ServiceCategoriesCard';

interface Data {
  id: string;
  name: string;
}

const Specializations: React.FC = () => {
  const [isInputOpen, setIsInputOpen] = useState<{ [key: string]: boolean }>({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [data, setData] = useState<Data[]>([]);

  useEffect(() => {
    fetchFatherData();
  }, []); 

  const fetchFatherData = () => {
    axios.get(service_category_list, config)
      .then((res) => {
        if (res.data && res.data.body) {
          setData(res.data.body);
        } else {
          console.log('Failed to fetch categories.');
        }
      }).catch((error) => {
        console.error(error);
        toast.error('Error fetching data');
      });
  };

  const fetchChildData = () => {
    axios.get(`${service_category_list}/category/byCategory/e6f4db29-4067-425e-b02e-0ce21ea73b46`, config)
      .then((res) => {
          console.log(res.data.body);
      }).catch((error) => {
        console.error(error);
        toast.error('Error fetching data');
      });
  };

  fetchChildData()

  const toggleInput = (id: string) => {
    setIsInputOpen((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <>
      <DefaultLayout>
        <div className='mb-5'>
          <p className='text-xl'>Специализации</p>
        </div>
        <div>
          {data.map((item) => (
            <div className='mt-3' key={item.id}>
              <Accordion title={item.name}>
                <div className='flex justify-between'>
                  <div className='w-[75%]'>
                    <ServiceCategoriesCard
                      title={item.name}
                      editOnClick={() => { }}
                      deleteOnClick={openModal}
                    />
                  </div>
                  <div className='mt-5 flex items-end'>
                    <button
                      className='bg-[#eaeaea] text-black dark:text-white dark:bg-[#9C0A35] rounded-lg py-2 px-10'
                      onClick={() => toggleInput(item.id)}
                      aria-label='Add new input'
                    >
                      <FaPlus size={25} />
                    </button>
                  </div>
                </div>
                {isInputOpen[item.id] && (
                  <div className='mt-5'>
                    <input
                      type='text'
                      placeholder='Type something...'
                      className='dark:bg-[#60606d] w-[66.6%] border-black h-13 bg-[#f1f5f9] border-[1px] dark:border-white active:outline-none dark:bg-gray-800 dark:text-white rounded-md px-3'
                    />
                  </div>
                )}
              </Accordion>
            </div>
          ))}
        </div>
      </DefaultLayout>
      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <div className="w-[500px] h-[130px]">
          <div className="flex justify-center">
            <p className="text-xl text-black">Вы уверены что хотите удалить процедуру?</p>
          </div>
          <div className="flex justify-around mt-10">
            <button className="text-white bg-[#000] py-2 px-10">Удалить</button>
            <button onClick={closeModal} className="text-white bg-gray py-2 px-14">Нет</button>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default Specializations;
