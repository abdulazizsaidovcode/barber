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
import DelModal from '../../components/settings/modals/delModal';

interface FatherData {
  id: string;
  name: string;
}

interface ChildData {
  id: string;
  name: string;
  categoryFatherId: string;
}

const Specializations: React.FC = () => {
  const [isInputOpen, setIsInputOpen] = useState<{ [key: string]: boolean }>({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [fatherData, setFatherData] = useState<FatherData[]>([]);
  const [childData, setChildData] = useState<ChildData[]>([]);

  useEffect(() => {
    fetchFatherData();
  }, []);

  const fetchFatherData = async () => {
    try {
      const res = await axios.get(service_category_list, config);
      if (res.data && res.data.body) {
        setFatherData(res.data.body);
      } else {
        console.log('Failed to fetch categories.');
      }
    } catch (error) {
      console.error(error);
      toast.error('Error fetching data');
    }
  };

  const fetchChildData = async (categoryId: string) => {
    try {
      const res = await axios.get(`${service_category_list}/byCategory/${categoryId}`, config);
      if (res.data && res.data.body) {
        setChildData(res.data.body);
      } else {
        console.log('Failed to fetch child categories.');
      }
    } catch (error) {
      console.error(error);
      toast.error('Error fetching child data');
    }
  };

  const toggleInput = (id: string) => {
    setIsInputOpen(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <DefaultLayout>
      <div className='mb-5'>
        <p className='text-xl'>Специализации</p>
      </div>
      <div>
        {fatherData.map((fatherItem) => (
          <div className='mt-3' key={fatherItem.id}>
            <Accordion title={fatherItem.name} onClick={() => fetchChildData(fatherItem.id)}>
              <div className='flex justify-between'>
                <div className='w-[75%]'>
                  {childData
                    .filter(childItem => childItem.categoryFatherId === fatherItem.id)
                    .map(childItem => (
                      <div key={childItem.id}>
                        <ServiceCategoriesCard
                          title={childItem.name}
                          editOnClick={() => { }}
                          deleteOnClick={openModal}
                        />
                      </div>
                    ))}
                </div>
                <div className='mt-5 flex items-end'>
                  <button
                    className='bg-[#eaeaea] text-black dark:text-white dark:bg-[#9C0A35] rounded-lg py-2 px-10'
                    onClick={() => {
                      toggleInput(fatherItem.id);
                    }}
                    aria-label='Add new input'
                  >
                    <FaPlus size={25} />
                  </button>
                </div>
              </div>
              {isInputOpen[fatherItem.id] && (
                <div className='mt-5'>

                </div>
              )}
            </Accordion>
          </div>
        ))}
      </div>
      <DelModal isOpen={isModalOpen} onClose={closeModal}/>
    </DefaultLayout>
  );
};

export default Specializations;
