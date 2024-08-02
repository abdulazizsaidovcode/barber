import React, { useEffect, useState } from 'react';
import DefaultLayout from '../../layout/DefaultLayout';
import Accordion from '../../components/accordion/accordion';
import { FaPlus } from 'react-icons/fa';
import { FaMinus } from "react-icons/fa6";
import axios from 'axios';
import { add_service_category, service_category_list, del_service_category, edit_service_category } from '../../helpers/api';
import { config } from '../../helpers/token';
import toast, { Toaster } from 'react-hot-toast';
import ServiceCategoriesCard from '../../components/settings/details/ServiceCategoriesCard';
import DelModal from '../../components/settings/modals/delModal';
import EditModal from '../../components/settings/modals/editModal';
import { Skeleton } from 'antd';
import { useTranslation } from 'react-i18next';
import { clearFunction } from '../../common/clear-function/clear-function.tsx';

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
  const { t } = useTranslation();
  const [isInputOpen, setIsInputOpen] = useState<{ [key: string]: boolean }>({});
  const [isDelModalOpen, setIsDelModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [fatherData, setFatherData] = useState<FatherData[]>([]);
  const [childDataMap, setChildDataMap] = useState<ChildDataMap>({});
  const [newCategoryNameMap, setNewCategoryNameMap] = useState<{ [key: string]: string }>({});
  const [selectedFatherId, setSelectedFatherId] = useState<string | null>(null);
  const [categoryToDelete, setCategoryToDelete] = useState<string | null>(null);
  const [editedCategoryName, setEditedCategoryName] = useState<string>('');
  const [categoryToEdit, setCategoryToEdit] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [childLoading, setChildLoading] = useState<{ [key: string]: boolean }>({});
  const [addLoading, setAddLoading] = useState<{ [key: string]: boolean }>({});
  const [editLoading, setEditLoading] = useState(false);

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
        clearFunction()
      }
      setLoading(false);
    } catch {
      setLoading(false);
      clearFunction()
    }
  };

  // GET CHILD DATA
  const fetchChildData = async (categoryId: string) => {
    setChildLoading((prev) => ({ ...prev, [categoryId]: true }));
    try {
      const res = await axios.get(`${service_category_list}/byCategory/${categoryId}`, config);
      if (res.data && res.data.body) {
        setChildDataMap((prev) => ({
          ...prev,
          [categoryId]: res.data.body,
        }));
      }
      setChildLoading((prev) => ({ ...prev, [categoryId]: false }));
    } catch {
      setChildLoading((prev) => ({ ...prev, [categoryId]: false }));
      clearFunction()
    }
  };

  // ADD CHILD DATA
  const addChildData = async (fatherId: string) => {
    const newCategoryName = newCategoryNameMap[fatherId];

    if (!newCategoryName.trim() || /^[^a-zA-Zа-яА-Я0-9]/.test(newCategoryName)) {
      toast(t("Please_enter_valid_category"), { icon: '⚠️' });
      return;
    }



    setAddLoading((prev) => ({ ...prev, [fatherId]: true }));

    const payload = {
      name: newCategoryName,
      categoryFatherId: fatherId,
    };

    try {
      const res = await axios.post(add_service_category, payload, config);
      if (res.data.success) {
        toast.success(t("Category_added_successfully"));
        fetchChildData(fatherId);
        setNewCategoryNameMap((prev) => ({ ...prev, [fatherId]: '' }));
        toggleInput(fatherId);
      } else {
        toast(t("This_category_already_exists"), { icon: '⚠️' });
        clearFunction()
      }
    } catch {
      clearFunction()
    }
    finally {
      setAddLoading((prev) => ({ ...prev, [fatherId]: false }));
      clearFunction()
    }
  };

  // DELETE CHILD DATA
  const deleteChildData = async (id: string, fatherId: string) => {
    try {
      await axios.delete(`${del_service_category}/${id}`, config);
      toast.success(t("Category_deleted_successfully"));
      setChildDataMap({});
      setTimeout(() => {
        fetchChildData(fatherId);
      }, 150);
    } catch {
      clearFunction()
    }
  };

  // UPDATE CHILD DATA
  const updateData = async (name: string, categoryFatherId: string, id: string) => {
    if (!name.trim() || /^[^a-zA-Zа-яА-Я0-9]/.test(name)) {
      toast(t("Please_enter_valid_category"), { icon: '⚠️' });
      return;
    }

    const payload = { name: name, categoryFatherId: categoryFatherId };

    setEditLoading(true);

    try {
      const res = await axios.put(`${edit_service_category}/${id}`, payload, config);
      if (res.data.success) {
        toast.success(t("Category_updated_successfully"));
        fetchChildData(categoryFatherId);
        setIsEditModalOpen(false);
      } else {
        toast(t("This_category_already_exists"), { icon: '⚠️' });
        clearFunction()
      }
    } catch {
      clearFunction()
    }
    finally {
      setEditLoading(false);
      clearFunction()
    }
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
        <p className="text-xl">{t("Specializations")}</p>
      </div>
      <div>
        {loading ? (
          <Skeleton active paragraph={{ rows: 4 }} />
        ) : fatherData.length === 0 ? (
          <p className="text-xl mt-4">{t("No_father_categories_found")}</p>
        ) : (
          fatherData.map((fatherItem) => (
            <div className="mt-3" key={fatherItem.id}>
              <Accordion
                title={fatherItem.name}
                onClick={() => fetchChildData(fatherItem.id)}
              >
                <div className="flex sm:flex-row flex-col justify-between">
                  <div className="sm:w-[75%]">
                    {childLoading[fatherItem.id] ? (
                      <Skeleton active paragraph={{ rows: 4 }} />
                    ) : (
                      childDataMap[fatherItem.id] && childDataMap[fatherItem.id].length > 0 ? (
                        childDataMap[fatherItem.id]?.map((childItem, index) => (
                          <div key={index}>
                            <ServiceCategoriesCard
                              title={childItem.name}
                              editOnClick={() => openEditModal(childItem.name, childItem.id, fatherItem.id)}
                              deleteOnClick={() => openDelModal(childItem.id, fatherItem.id)}
                            />
                          </div>
                        ))
                      ) : (
                        <p className='text-xl mt-4'>{t("Child_categories_not_found")}</p>
                      )
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
                      disabled={addLoading[fatherItem.id]}
                    >
                      {addLoading[fatherItem.id] ? t("Loading") : isInputOpen[fatherItem.id] ? <FaMinus size={25} /> : <FaPlus size={25} />}
                    </button>
                  </div>
                </div>
                {isInputOpen[fatherItem.id] && (
                  <div className="flex gap-2 mt-3">
                    <input
                      type="text"
                      placeholder={t("Type_something")}
                      className="dark:bg-[#60606d] w-[323px] border-black h-13 bg-[#f1f5f9] border-[1px] dark:border-white active:outline-none dark:bg-gray-800 dark:text-white rounded-md px-3"
                      value={newCategoryNameMap[fatherItem.id] || ''}
                      onChange={(e) =>
                        setNewCategoryNameMap((prev) => ({
                          ...prev,
                          [fatherItem.id]: e.target.value,
                        }))
                      }
                    />
                    <button
                      className="bg-[#eaeaea] dark:bg-danger py-3 dark:text-white rounded-lg px-5"
                      onClick={() => addChildData(fatherItem.id)}
                      disabled={editLoading || addLoading[fatherItem.id]}
                    >
                      {addLoading[fatherItem.id] ? t("Loading") : t("Add")}
                    </button>
                  </div>
                )}
              </Accordion>
            </div>
          ))
        )}
      </div>
      <DelModal isOpen={isDelModalOpen} onClose={closeDelModal} onDelete={handleDelete} />
      <EditModal
        isOpen={isEditModalOpen}
        onClose={closeEditModal}
        value={editedCategoryName}
        onChange={(e) => setEditedCategoryName(e.target.value)}
        onSave={() => categoryToEdit && selectedFatherId && updateData(editedCategoryName, selectedFatherId, categoryToEdit)}
        disabled={editLoading}
      />
      <Toaster position="top-center" reverseOrder={false} />
    </DefaultLayout>
  );
};

export default Specializations;