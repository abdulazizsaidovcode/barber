import { useEffect, useState } from "react";
import ServiceCategoriesCard from "../../components/settings/details/ServiceCategoriesCard";
import DefaultLayout from "../../layout/DefaultLayout";
import Modal from "../../components/modals/modal";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { add_service_category, del_service_category, edit_service_category, service_category_list } from "../../helpers/api";
import { config } from "../../helpers/token";

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

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = () => {
        axios.get(service_category_list, config)
            .then(res => {
                setData(res.data.body);
            })
            .catch(err => {
                console.error('Error fetching data:', err);
                toast.error('Error fetching data');
            });
    };

    const addData = () => {
        const newCategory = {
            name: newCategoryName,
            categoryFatherId: null,
            new: true
        };
        if (newCategoryName.length === 0) {
            toast('Please fill in the line', {
                icon: '⚠️'
            })
        } else {
            axios.post(add_service_category, newCategory, config)
                .then(() => {
                    toast.success('Category added successfully');
                    fetchData();
                    addCloseModal();
                })
                .catch(err => {
                    console.error('Error adding category:', err);
                    toast.error('Error adding category');
                });
        }

    };

    const deleteData = () => {
        if (categoryToDelete) {
            axios.delete(`${del_service_category}/${categoryToDelete}`, config)
                .then(() => {
                    toast.success('Category deleted successfully');
                    fetchData();
                    delCloseModal();
                })
                .catch(err => {
                    console.error('Error deleting category:', err);
                    toast.error('Error deleting category');
                });
        }
    };

    const updateData = () => {
        if (editingCategory) {
            const updatedCategory = {
                name: editedCategoryName
            };
            axios.put(`${edit_service_category}/${editingCategory}`, updatedCategory, config)
                .then((res) => {
                    toast.success('Category updated successfully');
                    fetchData();
                    console.log(res.data);
                    editCloseModal();
                })
                .catch(err => {
                    console.error('Error updating category:', err);
                    toast.error('Error updating category');
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
                <p className="font-bold text-xl text-black">Service Categories</p>
                <button onClick={addOpenModal} className="dark:bg-danger bg-[#c2c2c2] text-black dark:text-white py-2 px-4 rounded-lg">
                    Add Category
                </button>
            </div>
            <div className="mt-4 w-[75%]">
                <div className="mt-4 w-[75%]">
                    {data.map(item => (
                        <div key={item.id}>
                            <ServiceCategoriesCard
                                title={item.name}
                                editOnClick={() => editOpenModal(item.id, item.name)}
                                deleteOnClick={() => delOpenModal(item.id)}
                            />
                        </div>
                    ))}
                </div>

            </div>
            <Modal isOpen={addIsOpen} onClose={addCloseModal}>
                <div className="w-[500px] h-[180px]">
                    <p className="text-xl text-black">Category Name:</p>
                    <input
                        className="w-full border-[1px] border-black p-2 rounded-lg mt-3"
                        type="text"
                        placeholder="Health Procedures"
                        value={newCategoryName}
                        onChange={(e) => setNewCategoryName(e.target.value)}
                    />
                    <div className="flex mt-15 justify-center">
                        <button onClick={addData} className="py-2 px-10 bg-slate-800 text-white">Add</button>
                    </div>
                    <Toaster
                        position="top-center"
                        reverseOrder={false}
                    />
                </div>
            </Modal>
            <Modal isOpen={delIsOpen} onClose={delCloseModal}>
                <div className="w-[500px] h-[130px]">
                    <div className="flex justify-center">
                        <p className="text-xl text-black">Are you sure you want to delete this category?</p>
                    </div>
                    <div className="flex justify-around mt-10">
                        <button onClick={deleteData} className="text-white bg-[#000] py-2 px-10">Delete</button>
                        <button onClick={delCloseModal} className="text-white bg-gray py-2 px-14">No</button>
                    </div>
                </div>
            </Modal>
            <Modal isOpen={editIsOpen} onClose={editCloseModal}>
                <div className="w-[500px] h-max">
                    <div className="flex justify-center">
                        <p className="text-xl text-black">Are you sure you want to edit the title?</p>
                    </div>
                    <div className="flex justify-center mt-10">
                        <input
                            placeholder="Health Procedures"
                            value={editedCategoryName}
                            onChange={(e) => setEditedCategoryName(e.target.value)}
                            className="dark:border-slate-700 w-[323px] border-black h-13 bg-[#f1f5f9] border-[1px]  active:outline-none dark:bg-slate-100 dark:text-dark rounded-md px-3"
                        />
                    </div>
                    <div className="flex justify-around mt-10">
                        <button onClick={editCloseModal} className="text-white bg-[#000] py-2 px-10">
                            Close
                        </button>
                        <button
                            className="text-white bg-gray py-2 px-14"
                            onClick={updateData}
                        >
                            Save
                        </button>
                    </div>
                </div>
            </Modal>
            <Toaster
                position="top-center"
                reverseOrder={false}
            />
        </DefaultLayout>
    );
};

export default ServiceCategories;