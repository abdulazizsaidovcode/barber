import React, { useState } from 'react';
import DefaultLayout from '../../layout/DefaultLayout';
import Accordion from '../../components/accordion/accordion';
import ServiceCategoriesCard from '../../components/settings/ServiceCategoriesCard';
import { FaPlus } from 'react-icons/fa';
import Modal from '../../components/modals/modal';

const Specializations: React.FC = () => {
  const [isInputOpen, setIsInputOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const toggleInput = () => {
    setIsInputOpen(!isInputOpen);
  };

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  return (
    <>
      <DefaultLayout>
        <div className='mb-5'>
          <p className='text-xl'>Специализации</p>
        </div>
        <div>
          <Accordion title='Красота волос'>
            <div className='flex justify-between'>
              <div className='w-[75%]'>
                <ServiceCategoriesCard title='Красота волос' editOnClick={() => 'w'} deleteOnClick={() => openModal()} />
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
                <input
                  type='text'
                  placeholder='Type something...'
                  className='dark:bg-[#60606d]  w-[66.6%] border-black h-13 bg-[#f1f5f9] border-[1px] dark:border-white active:outline-none dark:bg-gray-800 dark:text-white rounded-md px-3 '
                />
              )}
            </div>
          </Accordion>
        </div>
      </DefaultLayout>
      <Modal isOpen={isOpen} onClose={closeModal}>
        <div className="w-[500px] h-[130px]">
          <div className="flex justify-center">
            <p className="text-xl text-black">Вы уверены что хоите удалить процедуру?</p>
          </div>
          <div className="flex justify-around mt-10">
            <button className="text-white bg-[#000] py-2 px-10">Удалить</button>
            <button onClick={closeModal} className="text-white bg-gray py-2 px-14">Hет</button>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default Specializations;
