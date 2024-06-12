import { useEffect, useState } from "react";
import ServiceCategoriesCard from "../../components/settings/details/ServiceCategoriesCard";
import DefaultLayout from "../../layout/DefaultLayout";
import Modal from "../../components/modals/modal";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { add_service_category, del_service_category, edit_service_category, service_category_list } from "../../helpers/api";
import { config } from "../../helpers/token";
import DelModal from "../../components/settings/modals/delModal";
import EditModal from "../../components/settings/modals/editModal";
import { Skeleton } from 'antd';
import { useTranslation } from "react-i18next";

interface Data {
    id: string;
    name: string;
}

const ServiceCategories = () => {
    const [data, setData] = useState<Data[]>([]);
    const [addIsOpen, setAddIsOpen] = useState(false);
    const [delIsOpen, setDelIsOpen] = useState(false);
    const [editIsOpen, setEditIsOpen] = useState(false);
    const [newCategoryName, setNewCategoryName] = useState('');
    const [categoryToDelete, setCategoryToDelete] = useState<string | null>(null);
    const [editingCategory, setEditingCategory] = useState<string | null>(null);
    const [editedCategoryName, setEditedCategoryName] = useState('');
    const [loading, setLoading] = useState(true);
    const { t } = useTranslation();

    useEffect(() => {
        fetchData();
    }, []);

    // FETCH DATA
    const fetchData = () => {
        axios.get(service_category_list, config)
            .then(res => {
                setData(res.data.body);
                setLoading(false);
            })
            .catch(() => {
                setLoading(false);
            });
    };

    // ADD DATA
    const addData = () => {
        const newCategory = {
            name: newCategoryName,
            categoryFatherId: null,
            new: true
        };
        if (newCategoryName.length === 0) {
            toast(t("Please_fill_in_the_line"), {
                icon: '⚠️'
            });
        } else if (!newCategoryName.trim() || /[^a-zA-Z0-9]/.test(newCategoryName)) {
            toast('Please enter a valid category name without spaces or special characters', { icon: '⚠️' });
        } else {
            axios.post(add_service_category, newCategory, config)
                .then((res) => {
                    if (res.data.success) {
                        toast.success(t("Category_added_successfully"));
                        fetchData();
                        addCloseModal();
                    } else {
                        toast(t('This_category_already_exists'), {
                            icon: '⚠️'
                        });
                    }
                })
                .catch(() => {
                    setLoading(false);
                });

        }
    };

    // DELETE DATA
    const deleteData = () => {
        if (categoryToDelete) {
            axios.delete(`${del_service_category}/${categoryToDelete}`, config)
                .then(() => {
                    toast.success(t("Category_deleted_successfully"));
                    setData(data.filter(item => item.id !== categoryToDelete));
                    delCloseModal();
                })
                .catch(() => {
                    setLoading(false);
                });

        }
    };

    // UPDATE DATA
    const updateData = () => {
        if (editingCategory) {
            if (editedCategoryName.trim() === "") {
                toast(t("Please_fill_in_the_line"), {
                    icon: '⚠️'
                });
                return;
            }

            const updatedCategory = {
                name: editedCategoryName
            };

            if (data.some(item => item.name === editedCategoryName)) {
                toast(t("This_category_already_exists"), {
                    icon: '⚠️'
                });
                return;
            }

            if (data.find(item => item.id === editingCategory)?.name === editedCategoryName) {
                toast(t("Please_change_something"), {
                    icon: '⚠️'
                });
                return;
            }

            axios.put(`${edit_service_category}/${editingCategory}`, updatedCategory, config)
                .then((res) => {
                    if (res.data.success) {
                        toast.success(t("Category_updated_successfully"));
                        fetchData();
                        editCloseModal();
                    } else {
                        toast(t("This_category_already_exists"), {
                            icon: '⚠️'
                        });
                    }
                })
                .catch(() => {
                    setLoading(false);
                });
        }
    };

    const delOpenModal = (id: string) => {
        setCategoryToDelete(id);
        setDelIsOpen(true);
    };

    const delCloseModal = () => {
        setCategoryToDelete(null);
        setDelIsOpen(false);
    };

    const addOpenModal = () => setAddIsOpen(true);
    const addCloseModal = () => setAddIsOpen(false);

    const editOpenModal = (id: string, name: string) => {
        setEditingCategory(id);
        setEditedCategoryName(name);
        setEditIsOpen(true);
    };

    const editCloseModal = () => {
        setEditingCategory(null);
        setEditedCategoryName('');
        setEditIsOpen(false);
    };

    return (
        <DefaultLayout>
            <div className="flex justify-between">
                <p className="font-bold text-xl text-black">{t("Service_Categories")}</p>
                <button onClick={addOpenModal} className="dark:bg-danger bg-[#c2c2c2] text-black dark:text-white py-2 px-4 rounded-lg">
                    {t("Add_Category")}
                </button>
            </div>
            <div className="mt-4 md:w-[75%] w-full">
                <div className="mt-4 md:w-[75%] w-full">
                    {loading ? (
                        <Skeleton active paragraph={{ rows: 4 }} />
                    ) : (data.length === 0 ? <div><p className="text-xl dark:text-white">Categories not found</p></div> :
                        data.map(item => (
                            <div key={item.id}>
                                <ServiceCategoriesCard
                                    title={item.name}
                                    editOnClick={() => editOpenModal(item.id, item.name)}
                                    deleteOnClick={() => delOpenModal(item.id)}
                                />
                            </div>
                        ))
                    )}
                </div>
            </div>
            <Modal isOpen={addIsOpen} onClose={addCloseModal}>
                <div className="w-[500px] h-[160px]">
                    <p className="text-xl text-black dark:text-white">{t("Category_Name")}</p>
                    <input
                        className="w-full dark:text-[#000] border-[1px] border-black p-2 rounded-lg mt-3"
                        type="text"
                        placeholder={t("Health_Procedures")}
                        onChange={(e) => setNewCategoryName(e.target.value)}
                    />
                    <div className="flex mt-10 justify-center">
                        <button onClick={addData} className="py-2 rounded-lg dark:bg-danger px-10 bg-slate-800 text-white">{t("Add")}</button>
                    </div>
                    <Toaster
                        position="top-center"
                        reverseOrder={false}
                    />
                </div>
            </Modal>
            <DelModal isOpen={delIsOpen} onClose={delCloseModal} onDelete={deleteData} />
            <EditModal
                isOpen={editIsOpen}
                onClose={editCloseModal}
                value={editedCategoryName}
                onChange={(e) => setEditedCategoryName(e.target.value)}
                onSave={updateData}
            />
            <Toaster
                position="top-center"
                reverseOrder={false}
            />
        </DefaultLayout>
    );
};

export default ServiceCategories;
