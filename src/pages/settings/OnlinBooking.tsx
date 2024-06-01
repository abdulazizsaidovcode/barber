  import React, { useEffect, useState } from 'react';
  import DefaultLayout from '../../layout/DefaultLayout';
  import Accordion from '../../components/accordion/accordion';
  import ServiceCategoriesCard from '../../components/settings/details/ServiceCategoriesCard';
  import { FaPlus } from 'react-icons/fa6';
  import { Toaster } from 'react-hot-toast';
  import onlineBookingStore from '../../helpers/state_managment/settings/online_booking.tsx';
  import { addPercent, deletePercent, editPercent, fetchData } from '../../helpers/api-function/percent/percent.tsx';
  import DelModal from '../../components/settings/modals/delModal.tsx';
  import EditModal from '../../components/settings/modals/editModal.tsx';

  const DirectoriesOnlineBooking: React.FC = () => {
    // STATE MANAGMENT
    const { data, setData, isInputOpen, setIsInputOpen, setEditModal, isEditModal, items } = onlineBookingStore();
    // STATES
    const [modalOpenId, setModalOpenId] = useState<number | null>(null);
    const [changedTitle, setChangedTitle] = useState('');
    const [newPercent, setNewPercent] = useState('');

    useEffect(() => {
      fetchData(setData);
    }, []);

    // MODALS OPEN AND CLOSE 
    const openEditModal = () => setEditModal(true);
    const closeEditModal = () => setEditModal(false);
    const openModalId = (id: number) => setModalOpenId(id);
    const closeModalId = () => setModalOpenId(null);

    // ADD INPUT SHOW FUNCTION
    const toggleInputOpen = () => setIsInputOpen(!isInputOpen);

    return (
      <>
        <DefaultLayout>
          <div>
            <p className="text-xl">Онлайн бронирование</p>
            <div className="w-1/2 mt-5">
              <Accordion title="Предоплата в процентах">
                <div className="flex justify-between">
                  <div className="w-[75%]">
                    {data.map(item => (
                      <div key={item.id}>
                        <ServiceCategoriesCard
                          title={`${item.percent}%`}
                          itemVal={item}
                          editOnClick={() => openEditModal()}
                          deleteOnClick={() => openModalId(item.id)}
                        />
                        <DelModal
                          onDelete={() => {
                            deletePercent(items && items.id, setData);
                            closeModalId();
                          }}
                          isOpen={modalOpenId === item.id} onClose={closeModalId}
                        />
                        <EditModal 
                          isOpen={isEditModal}
                          onClose={closeEditModal}
                          defaultValue={items && items.percent ? items.percent : ''}
                          onChange={(e) => setChangedTitle(e.target.value)}
                          onSave={() => editPercent(changedTitle, items && items.id, setData, closeEditModal)}
                        />
                      </div>
                    ))}
                  </div>
                  <div className="mt-5">
                    <button
                      className="bg-[#eaeaea] text-black dark:text-white dark:bg-[#9C0A35] rounded-lg py-2 px-10"
                      onClick={toggleInputOpen}
                    >
                      <FaPlus size={25} />
                    </button>
                  </div>
                </div>
                <div className="mt-5">
                  {isInputOpen && (
                    <div className="flex gap-2">
                      <input
                        type="number"
                        placeholder="Type something..."
                        className="dark:bg-[#60606d] w-[323px] border-black h-13 bg-[#f1f5f9] border-[1px] dark:border-white active:outline-none dark:bg-gray-800 dark:text-white rounded-md px-3"
                        value={newPercent}
                        onChange={(e) =>
                          setNewPercent(e.target.value)
                        }
                      />
                      <button
                        className="bg-[#eaeaea] dark:bg-danger py-3 dark:text-white rounded-lg px-5"
                        onClick={() => {
                          addPercent(newPercent, setData, toggleInputOpen);
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
          <Toaster position="top-center" reverseOrder={false} />
        </DefaultLayout>

      </>
    );
  };

  export default DirectoriesOnlineBooking;