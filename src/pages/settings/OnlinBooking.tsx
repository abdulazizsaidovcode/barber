import React, { useState } from 'react'
import DefaultLayout from '../../layout/DefaultLayout';
import Accordion from '../../components/accordion/accordion';
import ServiceCategoriesCard from '../../components/settings/ServiceCategoriesCard';
import { FaPlus } from 'react-icons/fa6';

const DirectoriesOnlineBooking: React.FC = () => {
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
        <div>
          <p className='text-xl'>Онлайн бронирование</p>
          <div className='w-1/2 mt-5'>
            <Accordion title='Предоплата в процентах'>
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
                      className='dark:bg-[#60606d] w-[323px] border-black h-13 bg-[#f1f5f9] border-[1px] dark:border-white active:outline-none dark:bg-gray-800 dark:text-white rounded-md px-3 '
                    />
                  )}
                </div>
              </Accordion>
          </div>
        </div>
      </DefaultLayout>
    </>
  )
}

export default DirectoriesOnlineBooking;