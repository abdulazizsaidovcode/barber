import React, { useEffect, useState } from 'react';
import DefaultLayout from '../../layout/DefaultLayout';
import Accordion from '../../components/accordion/accordion';
import { FaPlus } from 'react-icons/fa';
import axios from 'axios';
import { add_service_category, service_category_list, del_service_category, edit_service_category } from '../../helpers/api';
import { config } from '../../helpers/token';
import toast, { Toaster } from 'react-hot-toast';
import ServiceCategoriesCard from '../../components/settings/details/ServiceCategoriesCard';
import DelModal from '../../components/settings/modals/delModal';
import EditModal from '../../components/settings/modals/editModal';

interface FatherData {
  id: string;
  name: string;
}

interface ChildData {
  id: string;
  name: string;
  categoryFatherId: string;
}

interface ChildDataMap {
  [key: string]: ChildData[];
}

const Specializations: React.FC = () => {
  const [isInputOpen, setIsInputOpen] = useState<{ [key: string]: boolean }>({});
  const [isDelModalOpen, setIsDelModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [fatherData, setFatherData] = useState<FatherData[]>([]);
  const [childDataMap, setChildDataMap] = useState<ChildDataMap>({});
  const [newCategoryName, setNewCategoryName] = useState<string>('');
  const [selectedFatherId, setSelectedFatherId] = useState<string | null>(null);
  const [categoryToDelete, setCategoryToDelete] = useState<string | null>(null);
  const [editedCategoryName, setEditedCategoryName] = useState<string>('');
  const [categoryToEdit, setCategoryToEdit] = useState<string | null>(null);

  useEffect(() => {
    fetchFatherData();
  }, []);

  // GET FATHER DATA
  const fetchFatherData = async () => {
    try {
      const res = await axios.get(service_category_list, config);
      if (res.data && res.data.body) {
        setFatherData(res.data.body);
      } else {
        console.log('Failed to fetch categories.');
      }
    } catch { }
  };

  // GET CHILD DATA
  const fetchChildData = async (categoryId: string) => {
    try {
      const res = await axios.get(`${service_category_list}/byCategory/${categoryId}`, config);
      if (res.data && res.data.body) {
        setChildDataMap((prev) => ({
          ...prev,
          [categoryId]: res.data.body,
        }));
      } else {
        toast.error('Error fetching child data');
      }
    } catch { }
  };

  // ADD CHILD DATA
  const addChildData = async () => {
    if (!newCategoryName || !selectedFatherId) {
      toast.error('Please enter a category name');
      return;
    }

    const payload = {
      name: newCategoryName,
      categoryFatherId: selectedFatherId,
    };

    try {
      await axios.post(add_service_category, payload, config);
      toast.success('Category added successfully');
      fetchChildData(selectedFatherId);
      setNewCategoryName('');
      toggleInput(selectedFatherId);
    } catch { }
  };

  // DELETE CHILD DATA
  const deleteChildData = async (id: string, fatherId: string) => {
    try {
      await axios.delete(`${del_service_category}/${id}`, config);
      toast.success('Category deleted successfully');
      setChildDataMap({})
      setTimeout(() => {
        fetchChildData(fatherId);
      }, 150)
    } catch { }
  };

  // UPDATE CHILD DATA
  const updateData = async (name: string, categoryFatherId: string, id: string) => {
    const payload = { name: name, categoryFatherId: categoryFatherId };

    try {
      await axios.put(`${edit_service_category}/${id}`, payload, config);
      toast.success('Category updated successfully');
      fetchChildData(categoryFatherId);
      setIsEditModalOpen(false);
    } catch { }
  };

  const toggleInput = (id: string) => {
    setIsInputOpen((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const openEditModal = (name: string, id: string, fatherId: string) => {
    setEditedCategoryName(name);
    setCategoryToEdit(id);
    setSelectedFatherId(fatherId);
    setIsEditModalOpen(true);
  };

  const closeEditModal = () => {
    setEditedCategoryName('');
    setCategoryToEdit(null);
    setIsEditModalOpen(false);
  };

  const openDelModal = (id: string, fatherId: string) => {
    setCategoryToDelete(id);
    setSelectedFatherId(fatherId);
    setIsDelModalOpen(true);
  };

  const closeDelModal = () => {
    setCategoryToDelete(null);
    setIsDelModalOpen(false);
  };

  const handleDelete = () => {
    if (categoryToDelete && selectedFatherId) {
      deleteChildData(categoryToDelete, selectedFatherId);
      closeDelModal();
    } else {
      console.log('No category selected for deletion');
    }
  };

  return (
    <DefaultLayout>
      <div className="mb-5">
        <p className="text-xl">Специализации</p>
      </div>
      <div>
        {fatherData.map((fatherItem) => (
          <div className="mt-3" key={fatherItem.id}>
            <Accordion
              title={fatherItem.name}
              onClick={() => fetchChildData(fatherItem.id)}
            >
              <div className="flex sm:flex-row flex-col justify-between">
                <div className="sm:w-[75%]">
                  {childDataMap[fatherItem.id] && childDataMap[fatherItem.id].length > 0 ? (
                    childDataMap[fatherItem.id]?.map((childItem) => (
                      <div key={childItem.id}>
                        <ServiceCategoriesCard
                          title={childItem.name}
                          editOnClick={() => openEditModal(childItem.name, childItem.id, fatherItem.id)}
                          deleteOnClick={() => openDelModal(childItem.id, fatherItem.id)}
                        />
                      </div>
                    ))
                  ) : (
                    <p className='text-xl mt-4'>Child categories not found</p>
                  )}
                </div>
                <div className="mt-5 flex items-end">
                  <button
                    className="bg-[#eaeaea] text-black dark:text-white dark:bg-[#9C0A35] rounded-lg py-2 px-10"
                    onClick={() => {
                      toggleInput(fatherItem.id);
                      setSelectedFatherId(fatherItem.id);
                    }}
                    aria-label="Add new child category"
                  >
                    <FaPlus size={25} />
                  </button>
                </div>
              </div>
              {isInputOpen[fatherItem.id] && (
                <div className="flex gap-2 mt-3">
                  <input
                    type="text"
                    placeholder="Type something..."
                    className="dark:bg-[#60606d] w-[323px] border-black h-13 bg-[#f1f5f9] border-[1px] dark:border-white active:outline-none dark:bg-gray-800 dark:text-white rounded-md px-3"
                    value={newCategoryName}
                    onChange={(e) => setNewCategoryName(e.target.value)}
                  />
                  <button
                    className="bg-[#eaeaea] dark:bg-danger py-3 dark:text-white rounded-lg px-5"
                    onClick={addChildData}
                  >
                    Добавить
                  </button>
                </div>
              )}
            </Accordion>
          </div>
        ))}
      </div>
      <DelModal isOpen={isDelModalOpen} onClose={closeDelModal} onDelete={handleDelete} />
      <EditModal
        isOpen={isEditModalOpen}
        onClose={closeEditModal}
        value={editedCategoryName}
        onChange={(e) => setEditedCategoryName(e.target.value)}
        onSave={() => categoryToEdit && selectedFatherId && updateData(editedCategoryName, selectedFatherId, categoryToEdit)}
      />
      <Toaster position="top-center" reverseOrder={false} />
    </DefaultLayout>
  );
};

export default Specializations;
